-- ============================================================
-- Rode no SQL Editor do Supabase (projeto do portfólio)
-- ============================================================

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

-- Leitura pública: só aprovados
drop policy if exists "Leitura de comentários aprovados" on public.portfolio_comments;
create policy "Leitura de comentários aprovados"
  on public.portfolio_comments
  for select
  to anon, authenticated
  using (approved = true);

-- Inserção: usuário logado (sempre pendente)
drop policy if exists "Inserir comentário autenticado" on public.portfolio_comments;
create policy "Inserir comentário autenticado"
  on public.portfolio_comments
  for insert
  to authenticated
  with check (
    auth.uid() is not null
    and approved = false
  );

-- Admin: e-mails autorizados (ajuste se mudar de e-mail)
-- Leitura de TODOS os comentários
drop policy if exists "Admin lê todos os comentários" on public.portfolio_comments;
create policy "Admin lê todos os comentários"
  on public.portfolio_comments
  for select
  to authenticated
  using (
    lower(coalesce(auth.jwt() ->> 'email', '')) in (
      'zeusmiranda63@gmail.com',
      'allan.miranda.dev@protonmail.com'
    )
  );

-- Admin: aprovar / despublicar
drop policy if exists "Admin atualiza comentários" on public.portfolio_comments;
create policy "Admin atualiza comentários"
  on public.portfolio_comments
  for update
  to authenticated
  using (
    lower(coalesce(auth.jwt() ->> 'email', '')) in (
      'zeusmiranda63@gmail.com',
      'allan.miranda.dev@protonmail.com'
    )
  )
  with check (
    lower(coalesce(auth.jwt() ->> 'email', '')) in (
      'zeusmiranda63@gmail.com',
      'allan.miranda.dev@protonmail.com'
    )
  );

-- Admin: excluir
drop policy if exists "Admin exclui comentários" on public.portfolio_comments;
create policy "Admin exclui comentários"
  on public.portfolio_comments
  for delete
  to authenticated
  using (
    lower(coalesce(auth.jwt() ->> 'email', '')) in (
      'zeusmiranda63@gmail.com',
      'allan.miranda.dev@protonmail.com'
    )
  );

-- Auth: Confirm email LIGADO
-- Redirect URL: https://mirandadevelopment.github.io/mirandadeveloper-portafolio/
