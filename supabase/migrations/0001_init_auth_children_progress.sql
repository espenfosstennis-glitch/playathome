-- Fase 3: foreldrekonto, barn, fremgang, gamifisering. (Applisert mot databasen.)
-- Personlige data. Hver tabell har RLS og eier-scopede policyer i samme migrasjon.
-- Eierskapskjede: auth.users (forelder) -> children -> progress/unlocks.

-- 1) Foreldreprofil (1:1 med auth-brukeren)
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

-- 2) Barn (tilhører én forelder)
create table public.children (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  birth_year int,                       -- dataminimering: kun fødselsår, ikke full dato
  buddy text default 'Bamse',           -- Tennis Town-figur (kanonisk sett i components/TennisTown.tsx)
  gear text default '',
  balls int not null default 0,
  level text not null default 'Nybegynner'
    check (level in ('Nybegynner', 'På vei opp', 'Racketmester', 'Tennisstjerne')),
  created_at timestamptz not null default now()
);
create index children_parent_id_idx on public.children (parent_id);

-- 3) Fremgang (én rad per fullført øvelse). exercise_slug refererer Sanity-innhold.
create table public.progress (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.children (id) on delete cascade,
  exercise_slug text not null,
  completed_at timestamptz not null default now()
);
create index progress_child_id_idx on public.progress (child_id);

-- 4) Opplåsninger (gamifisering)
create table public.unlocks (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.children (id) on delete cascade,
  item text not null,
  created_at timestamptz not null default now()
);
create index unlocks_child_id_idx on public.unlocks (child_id);

-- RLS på alle tabeller
alter table public.profiles enable row level security;
alter table public.children enable row level security;
alter table public.progress enable row level security;
alter table public.unlocks  enable row level security;

-- profiles: kun egen rad
create policy profiles_select on public.profiles for select using (id = auth.uid());
create policy profiles_insert on public.profiles for insert with check (id = auth.uid());
create policy profiles_update on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

-- children: kun egne barn
create policy children_select on public.children for select using (parent_id = auth.uid());
create policy children_insert on public.children for insert with check (parent_id = auth.uid());
create policy children_update on public.children for update using (parent_id = auth.uid()) with check (parent_id = auth.uid());
create policy children_delete on public.children for delete using (parent_id = auth.uid());

-- progress + unlocks er append-only (ingen UPDATE-policy med vilje: en rad = en hendelse).
-- profiles har ingen DELETE-policy med vilje: slettes via cascade når auth.users slettes.

-- progress: kun for barn som tilhører innlogget forelder
create policy progress_select on public.progress for select
  using (exists (select 1 from public.children c where c.id = progress.child_id and c.parent_id = auth.uid()));
create policy progress_insert on public.progress for insert
  with check (exists (select 1 from public.children c where c.id = progress.child_id and c.parent_id = auth.uid()));
create policy progress_delete on public.progress for delete
  using (exists (select 1 from public.children c where c.id = progress.child_id and c.parent_id = auth.uid()));

-- unlocks: samme eierskapssjekk via children
create policy unlocks_select on public.unlocks for select
  using (exists (select 1 from public.children c where c.id = unlocks.child_id and c.parent_id = auth.uid()));
create policy unlocks_insert on public.unlocks for insert
  with check (exists (select 1 from public.children c where c.id = unlocks.child_id and c.parent_id = auth.uid()));
create policy unlocks_delete on public.unlocks for delete
  using (exists (select 1 from public.children c where c.id = unlocks.child_id and c.parent_id = auth.uid()));