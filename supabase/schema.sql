-- Pawcelona MVP booking-request schema
-- Run in the Supabase SQL editor for the project that will receive bookings.

create extension if not exists pgcrypto;

create table if not exists public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  service text not null,
  date date not null,
  time text not null,
  duration text,
  pet_type text not null,
  number_of_pets int not null default 1 check (number_of_pets between 1 and 10),
  pet_name text not null,
  breed text,
  age text,
  special_needs text,
  medication text,
  emergency_contact text,
  vet_information text,
  address text not null,
  owner_name text not null,
  phone text not null,
  email text not null,
  notes text,
  consent boolean not null default false,
  language text not null default 'en' check (language in ('en','es','ca','ru')),
  status text not null default 'requested' check (status in ('requested','reviewing','confirmed','completed','cancelled'))
);

alter table public.booking_requests enable row level security;

-- Public users may submit a request, but cannot read, update or delete requests.
-- The anon key is intentionally safe for browser use only while RLS remains enabled.
drop policy if exists "anon can create booking request" on public.booking_requests;
create policy "anon can create booking request"
on public.booking_requests
for insert
to anon
with check (
  consent = true
  and char_length(owner_name) between 2 and 120
  and char_length(email) between 3 and 254
  and char_length(phone) between 5 and 40
  and number_of_pets between 1 and 10
);

-- No anonymous SELECT/UPDATE/DELETE policy is created.
-- For a higher-volume launch, route submissions through a Supabase Edge Function
-- with server-side validation and bot/rate-limit protection.
