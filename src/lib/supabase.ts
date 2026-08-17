import { createClient } from "@supabase/supabase-js"
import { projectId, publicAnonKey } from "../../utils/supabase/info"

export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey,
)

export type AnnouncementRow = {
  id: string
  title: string
  body: string
  category: string
  is_active: boolean
  scheduled_at: string | null
  created_at: string
}

export type PrayerRow = {
  id: string
  name: string
  email: string
  request_text: string
  is_public: boolean
  is_anonymous: boolean
  status: "pending" | "praying" | "answered"
  admin_reply: string | null
  pray_count: number
  created_at: string
}

export type ContactRow = {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  form_type: "general" | "prayer" | "counseling" | "event_reg"
  created_at: string
}

export type EventRow = {
  id: string
  title: string
  description: string
  event_date: string
  event_time: string
  location: string
  category: string
  image_url: string | null
  created_at: string
}

/* SQL to create tables — run once in Supabase SQL editor:

create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  category text not null default 'General',
  is_active boolean not null default true,
  scheduled_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists prayer_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  request_text text not null,
  is_public boolean not null default true,
  is_anonymous boolean not null default false,
  status text not null default 'pending',
  admin_reply text,
  pray_count integer not null default 0,
  created_at timestamptz default now()
);

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  form_type text not null default 'general',
  created_at timestamptz default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date date not null,
  event_time text,
  location text,
  category text not null default 'General',
  image_url text,
  created_at timestamptz default now()
);

-- Enable Row Level Security and allow anon reads on public tables:
alter table announcements enable row level security;
alter table prayer_requests enable row level security;
alter table contact_submissions enable row level security;
alter table events enable row level security;

create policy "Public read active announcements" on announcements for select using (is_active = true);
create policy "Public insert announcements" on announcements for insert with check (true);
create policy "Public read public prayers" on prayer_requests for select using (is_public = true);
create policy "Anyone can insert prayer" on prayer_requests for insert with check (true);
create policy "Anyone can update pray_count" on prayer_requests for update using (true);
create policy "Anyone can insert contact" on contact_submissions for insert with check (true);
create policy "Public read events" on events for select using (true);
create policy "Public insert events" on events for insert with check (true);
*/
