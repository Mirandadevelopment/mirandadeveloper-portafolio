-- Execute no SQL Editor do Supabase (projeto do portfólio)
-- Comentários com moderação: só approved = true fica público.

create table if not exists public.portfolio_comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  author_name text not null,
  username text not null,
  content text not null check (char_length(content) >= 5 and char_length(content) <= 2000),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists portfolio_comments_approved_idx
  on public.portfolio_comments (approved, created_at desc);

alter table public.portfolio_comments enable row level security;

-- Leitura pública só de aprovados
drop policy if exists "Leitura de comentários aprovados" on public.portfolio_comments;
create policy "Leitura de comentários aprovados"
  on public.portfolio_comments
  for select
  to anon, authenticated
  using (approved = true);

-- Usuário logado pode inserir o próprio comentário (sempre pending)
drop policy if exists "Inserir comentário autenticado" on public.portfolio_comments;
create policy "Inserir comentário autenticado"
  on public.portfolio_comments
  for insert
  to authenticated
  with check (
    auth.uid() is not null
    and approved = false
  );

-- Ninguém atualiza/apaga pelo front (você aprova no painel do Supabase)
-- No Table Editor: mude approved para true nos comentários bons.

-- Auth: desative "Confirm email" em Authentication > Providers > Email
-- se quiser login imediato após criar conta (e-mail sintético @mirandadeveloper.local).
