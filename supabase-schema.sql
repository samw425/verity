-- Database Schema for Verity

-- Users table (linked to auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  stripe_customer_id text,
  subscription_tier text default 'free',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using ( auth.uid() = id );

create policy "Users can update their own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- Scans table
create table public.scans (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  url text not null,
  city text not null,
  keyword text not null,
  score integer not null,
  ai_summary text,
  missing_data jsonb,
  raw_ai_output text,
  status text check (status in ('pending', 'completed', 'failed')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for scans
alter table public.scans enable row level security;

create policy "Users can view their own scans"
  on public.scans for select
  using ( auth.uid() = user_id );

create policy "Users can create their own scans"
  on public.scans for insert
  with check ( auth.uid() = user_id );

-- Assets table (Generated llms.txt and JSON-LD)
create table public.assets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  scan_id uuid references public.scans(id) on delete set null,
  llms_txt text,
  json_ld jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for assets
alter table public.assets enable row level security;

create policy "Users can view their own assets"
  on public.assets for select
  using ( auth.uid() = user_id );

create policy "Users can create their own assets"
  on public.assets for insert
  with check ( auth.uid() = user_id );

-- Function to handle new user signup
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for handle_new_user
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
