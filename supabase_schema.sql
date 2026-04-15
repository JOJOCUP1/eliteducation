-- ============================================================
--  Elite Education Academy — Supabase SQL Schema
--  Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ── PROFILES ─────────────────────────────────────────────────
create table if not exists profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  full_name     text,
  email         text,
  role          text not null default 'student' check (role in ('student','teacher','admin')),
  subject       text check (subject in ('math','french')),
  teacher_id    uuid references profiles(id),   -- student's assigned teacher
  avatar_url    text,
  created_at    timestamptz not null default now()
);

alter table profiles enable row level security;

-- Users can read any profile (for name display)
create policy "profiles: read all"
  on profiles for select using (true);

-- Users can update only their own profile
create policy "profiles: update own"
  on profiles for update using (auth.uid() = id);

-- Insert on sign-up (called from client)
create policy "profiles: insert own"
  on profiles for insert with check (auth.uid() = id);

-- ── TEACHER SELECTIONS ───────────────────────────────────────
create table if not exists teacher_selections (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references profiles(id) on delete cascade,
  teacher_id          text not null,            -- teacher slug e.g. 'luka'
  teacher_profile_id  uuid references profiles(id), -- if teacher has an account
  subject             text,
  compatibility_pct   int,
  created_at          timestamptz not null default now()
);

alter table teacher_selections enable row level security;

create policy "teacher_selections: own"
  on teacher_selections for all using (auth.uid() = user_id);

-- ── SESSIONS (BOOKED LESSONS) ─────────────────────────────────
create table if not exists sessions (
  id             uuid primary key default gen_random_uuid(),
  student_id     uuid not null references profiles(id) on delete cascade,
  teacher_id     uuid not null references profiles(id) on delete cascade,
  scheduled_at   timestamptz not null,
  topic          text,
  status         text not null default 'pending'
                   check (status in ('pending','confirmed','in_progress','done','cancelled')),
  recording_url  text,
  whiteboard_url text,
  notes          text,
  created_at     timestamptz not null default now()
);

alter table sessions enable row level security;

-- Student sees their own sessions; teacher sees sessions where they teach
create policy "sessions: student sees own"
  on sessions for select
  using (auth.uid() = student_id or auth.uid() = teacher_id);

create policy "sessions: student can book"
  on sessions for insert
  with check (auth.uid() = student_id);

create policy "sessions: teacher can update"
  on sessions for update
  using (auth.uid() = teacher_id or auth.uid() = student_id);

-- ── MESSAGES (REALTIME CHAT) ──────────────────────────────────
create table if not exists messages (
  id          uuid primary key default gen_random_uuid(),
  sender_id   uuid not null references profiles(id) on delete cascade,
  receiver_id uuid not null references profiles(id) on delete cascade,
  content     text not null,
  read        boolean not null default false,
  created_at  timestamptz not null default now()
);

alter table messages enable row level security;

-- Each user sees only their own messages (sent or received)
create policy "messages: own"
  on messages for all
  using (auth.uid() = sender_id or auth.uid() = receiver_id);

-- Enable realtime on messages table
alter publication supabase_realtime add table messages;

-- ── HOMEWORK ──────────────────────────────────────────────────
create table if not exists homework (
  id          uuid primary key default gen_random_uuid(),
  session_id  uuid references sessions(id) on delete cascade,
  teacher_id  uuid not null references profiles(id),
  student_id  uuid not null references profiles(id),
  problems    jsonb not null default '[]',    -- [{q, difficulty, hint}]
  due_at      timestamptz,
  status      text not null default 'pending'
                check (status in ('pending','submitted','reviewed')),
  created_at  timestamptz not null default now()
);

alter table homework enable row level security;

create policy "homework: own"
  on homework for all
  using (auth.uid() = teacher_id or auth.uid() = student_id);

-- ── SUBSCRIPTIONS (LESSON PACKAGES) ───────────────────────────
create table if not exists subscriptions (
  id              uuid primary key default gen_random_uuid(),
  student_id      uuid not null references profiles(id) on delete cascade,
  teacher_id      uuid not null references profiles(id),
  total_lessons   int not null default 8,
  used_lessons    int not null default 0,
  status          text not null default 'active'
                    check (status in ('active','expired','cancelled')),
  renews_at       timestamptz,
  parent_email    text,
  created_at      timestamptz not null default now()
);

alter table subscriptions enable row level security;

create policy "subscriptions: own"
  on subscriptions for all
  using (auth.uid() = student_id or auth.uid() = teacher_id);

-- ── HELPER FUNCTION: auto-create profile on sign-up ───────────
-- Run this so every new auth user gets a profile row automatically
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.email,
    'student'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Attach the trigger to auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── INDEXES ───────────────────────────────────────────────────
create index if not exists messages_sender_idx   on messages(sender_id);
create index if not exists messages_receiver_idx on messages(receiver_id);
create index if not exists messages_created_idx  on messages(created_at);
create index if not exists sessions_student_idx  on sessions(student_id);
create index if not exists sessions_teacher_idx  on sessions(teacher_id);
create index if not exists sessions_status_idx   on sessions(status);
create index if not exists homework_student_idx  on homework(student_id);
create index if not exists subs_student_idx      on subscriptions(student_id);
