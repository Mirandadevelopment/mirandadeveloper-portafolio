-- Métricas públicas, votos e autorização do painel.
-- Execute no SQL Editor do Supabase depois de portfolio_comments.sql.

create table if not exists public.portfolio_metrics (
  project_id text primary key check (project_id ~ '^proj-[1-9][0-9]*$'),
  views bigint not null default 0 check (views >= 0),
  project_clicks bigint not null default 0 check (project_clicks >= 0),
  downloads bigint not null default 0 check (downloads >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_site_metrics (
  id boolean primary key default true check (id),
  views bigint not null default 0 check (views >= 0),
  cv_downloads bigint not null default 0 check (cv_downloads >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_votes (
  id text primary key check (id ~ '^proj-[1-9][0-9]*$'),
  likes bigint not null default 0 check (likes >= 0),
  dislikes bigint not null default 0 check (dislikes >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_visitor_votes (
  visitor_key text not null,
  project_id text not null references public.portfolio_votes(id) on delete cascade,
  vote text check (vote in ('like', 'dislike')),
  updated_at timestamptz not null default now(),
  primary key (visitor_key, project_id)
);

create table if not exists public.portfolio_event_dedup (
  visitor_key text not null,
  event text not null check (event in ('view', 'cv_download', 'project_click')),
  project_id text not null default '',
  event_day date not null default current_date,
  created_at timestamptz not null default now(),
  primary key (visitor_key, event, project_id, event_day)
);

insert into public.portfolio_site_metrics (id)
values (true)
on conflict (id) do nothing;

insert into public.portfolio_votes (id)
select 'proj-' || n from generate_series(1, 6) n
on conflict (id) do nothing;

alter table public.portfolio_metrics enable row level security;
alter table public.portfolio_site_metrics enable row level security;
alter table public.portfolio_votes enable row level security;
alter table public.portfolio_visitor_votes enable row level security;
alter table public.portfolio_event_dedup enable row level security;

drop policy if exists "Métricas públicas somente leitura" on public.portfolio_metrics;
create policy "Métricas públicas somente leitura"
  on public.portfolio_metrics for select to anon, authenticated using (true);

drop policy if exists "Métrica do site somente leitura" on public.portfolio_site_metrics;
create policy "Métrica do site somente leitura"
  on public.portfolio_site_metrics for select to anon, authenticated using (true);

drop policy if exists "Votos públicos somente leitura" on public.portfolio_votes;
create policy "Votos públicos somente leitura"
  on public.portfolio_votes for select to anon, authenticated using (true);

revoke all on public.portfolio_metrics from anon, authenticated;
revoke all on public.portfolio_site_metrics from anon, authenticated;
revoke all on public.portfolio_votes from anon, authenticated;
revoke all on public.portfolio_visitor_votes from anon, authenticated;
revoke all on public.portfolio_event_dedup from anon, authenticated;
grant select on public.portfolio_metrics to anon, authenticated;
grant select on public.portfolio_site_metrics to anon, authenticated;
grant select on public.portfolio_votes to anon, authenticated;

create or replace function public.record_portfolio_event(
  p_event text,
  p_project_id text default null,
  p_visitor_key text default null
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  result json;
begin
  if p_event not in ('view', 'cv_download', 'project_click') then
    raise exception 'Evento inválido';
  end if;
  if p_visitor_key is null or length(p_visitor_key) < 16 or length(p_visitor_key) > 128 then
    raise exception 'Identificador inválido';
  end if;
  if p_event = 'project_click' and p_project_id !~ '^proj-[1-9][0-9]*$' then
    raise exception 'Projeto inválido';
  end if;

  insert into public.portfolio_event_dedup (visitor_key, event, project_id)
    values (p_visitor_key, p_event, coalesce(p_project_id, ''))
    on conflict (visitor_key, event, project_id, event_day) do nothing;
  if not found then
    select json_build_object(
      'site', (select row_to_json(s) from public.portfolio_site_metrics s where s.id = true),
      'project', case when p_project_id is null then null
        else (select row_to_json(m) from public.portfolio_metrics m where m.project_id = p_project_id)
      end
    ) into result;
    return result;
  end if;

  if p_event = 'view' then
    update public.portfolio_site_metrics
      set views = views + 1, updated_at = now()
      where id = true;
  elsif p_event = 'cv_download' then
    update public.portfolio_site_metrics
      set cv_downloads = cv_downloads + 1, updated_at = now()
      where id = true;
  else
    insert into public.portfolio_metrics (project_id, project_clicks)
      values (p_project_id, 1)
      on conflict (project_id) do update
      set project_clicks = portfolio_metrics.project_clicks + 1,
          updated_at = now();
  end if;

  select json_build_object(
    'site', (select row_to_json(s) from public.portfolio_site_metrics s where s.id = true),
    'project', case when p_project_id is null then null
      else (select row_to_json(m) from public.portfolio_metrics m where m.project_id = p_project_id)
    end
  ) into result;
  return result;
end;
$$;

create or replace function public.get_public_portfolio_stats()
returns json
language sql
security definer
set search_path = public
as $$
  select json_build_object(
    'site', (select row_to_json(s) from public.portfolio_site_metrics s where s.id = true),
    'projects', coalesce((
      select json_agg(row_to_json(project_stats) order by (project_stats.likes + project_stats.views + project_stats.project_clicks) desc)
      from (
        select v.id as project_id,
          coalesce(v.likes, 0) as likes,
          coalesce(v.dislikes, 0) as dislikes,
          coalesce(m.views, 0) as views,
          coalesce(m.project_clicks, 0) as project_clicks,
          coalesce(m.downloads, 0) as downloads
        from public.portfolio_votes v
        left join public.portfolio_metrics m on m.project_id = v.id
      ) project_stats
    ), '[]'::json)
  );
$$;

create or replace function public.change_portfolio_vote(
  p_vote_id text,
  p_previous_vote text,
  p_next_vote text,
  p_visitor_key text
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  current_vote text;
  result json;
begin
  if p_vote_id !~ '^proj-[1-9][0-9]*$'
    or p_visitor_key is null
    or length(p_visitor_key) < 16
    or length(p_visitor_key) > 128
    or p_next_vote not in ('like', 'dislike') and p_next_vote is not null then
    raise exception 'Voto inválido';
  end if;

  select vote into current_vote
    from public.portfolio_visitor_votes
    where visitor_key = p_visitor_key and project_id = p_vote_id
    for update;

  if current_vote is distinct from p_previous_vote then
    raise exception 'Estado do voto desatualizado';
  end if;

  if current_vote is not null then
    update public.portfolio_votes
      set likes = likes - case when current_vote = 'like' then 1 else 0 end,
          dislikes = dislikes - case when current_vote = 'dislike' then 1 else 0 end,
          updated_at = now()
      where id = p_vote_id;
  end if;

  if p_next_vote is null then
    delete from public.portfolio_visitor_votes
      where visitor_key = p_visitor_key and project_id = p_vote_id;
  else
    insert into public.portfolio_visitor_votes (visitor_key, project_id, vote)
      values (p_visitor_key, p_vote_id, p_next_vote)
      on conflict (visitor_key, project_id) do update
      set vote = excluded.vote, updated_at = now();
    update public.portfolio_votes
      set likes = likes + case when p_next_vote = 'like' then 1 else 0 end,
          dislikes = dislikes + case when p_next_vote = 'dislike' then 1 else 0 end,
          updated_at = now()
      where id = p_vote_id;
  end if;

  select row_to_json(v) into result from public.portfolio_votes v where v.id = p_vote_id;
  return result;
end;
$$;

create or replace function public.is_admin_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) in (
    'zeusmiranda63@gmail.com',
    'allan.miranda.dev@protonmail.com'
  );
$$;

revoke all on function public.record_portfolio_event(text, text, text) from public;
revoke all on function public.get_public_portfolio_stats() from public;
revoke all on function public.change_portfolio_vote(text, text, text, text) from public;
revoke all on function public.is_admin_user() from public;
grant execute on function public.record_portfolio_event(text, text, text) to anon, authenticated;
grant execute on function public.get_public_portfolio_stats() to anon, authenticated;
grant execute on function public.change_portfolio_vote(text, text, text, text) to anon, authenticated;
grant execute on function public.is_admin_user() to authenticated;

drop policy if exists "Admin lê todos os comentários" on public.portfolio_comments;
create policy "Admin lê todos os comentários"
  on public.portfolio_comments for select to authenticated
  using (public.is_admin_user());

drop policy if exists "Admin atualiza comentários" on public.portfolio_comments;
create policy "Admin atualiza comentários"
  on public.portfolio_comments for update to authenticated
  using (public.is_admin_user())
  with check (public.is_admin_user());

drop policy if exists "Admin exclui comentários" on public.portfolio_comments;
create policy "Admin exclui comentários"
  on public.portfolio_comments for delete to authenticated
  using (public.is_admin_user());
