-- ============================================================
-- Schema: Finanças Pessoais App
-- Execute este SQL no Supabase SQL Editor
-- ============================================================

-- Tabela de transações
create table if not exists public.transactions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  description text not null,
  amount      numeric(12, 2) not null check (amount > 0),
  date        date not null,
  type        text not null check (type in ('receita', 'despesa')),
  category    text not null check (
    category in (
      'Alimentação', 'Transporte', 'Moradia', 'Lazer',
      'Saúde', 'Educação', 'Salário', 'Freelance', 'Outros'
    )
  ),
  created_at  timestamptz default now()
);

-- Índices para performance
create index if not exists idx_transactions_user_id on public.transactions(user_id);
create index if not exists idx_transactions_date    on public.transactions(date);
create index if not exists idx_transactions_type    on public.transactions(type);
create index if not exists idx_transactions_category on public.transactions(category);

-- Row Level Security
alter table public.transactions enable row level security;

-- Cada usuário só vê suas próprias transações
create policy "Users can view own transactions"
  on public.transactions for select
  using (auth.uid() = user_id);

create policy "Users can insert own transactions"
  on public.transactions for insert
  with check (auth.uid() = user_id);

create policy "Users can update own transactions"
  on public.transactions for update
  using (auth.uid() = user_id);

create policy "Users can delete own transactions"
  on public.transactions for delete
  using (auth.uid() = user_id);
