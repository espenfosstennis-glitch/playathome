-- Foreldre godtar en bestemt vilkårsversjon før de bruker kontofunksjonene.
-- RLS begrenser lesing og opprettelse til innlogget eier.
create table public.terms_acceptances (
  user_id uuid not null references auth.users (id) on delete cascade,
  terms_version text not null,
  accepted_at timestamptz not null default now(),
  primary key (user_id, terms_version)
);

alter table public.terms_acceptances enable row level security;

create policy terms_acceptances_select on public.terms_acceptances
  for select using (user_id = auth.uid());

create policy terms_acceptances_insert on public.terms_acceptances
  for insert with check (
    user_id = auth.uid()
    and terms_version = '2026-11-19'
  );
