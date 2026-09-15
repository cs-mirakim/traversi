# DEV GUIDE - Free Stack Setup

## 1. Supabase Setup (Free)
1. Buat project baru di supabase.com (500MB free)
2. SQL Editor run ini:

```sql
create table searches (
  id uuid primary key default gen_random_uuid(),
  budget int,
  days int,
  vibe text,
  created_at timestamp default now()
);

create table destinations_cache (
  id uuid primary key default gen_random_uuid(),
  city text,
  country text,
  flight_price_rm int,
  hotel_per_night_rm int,
  food_per_day_rm int,
  visa_free_for_my boolean,
  halal_score text, -- mudah/sederhana/susah
  updated_at timestamp default now()
);

create table flight_cache (
  origin text,
  destination_iata text,
  price_rm int,
  cached_at timestamp default now(),
  primary key (origin, destination_iata)
);
```

## 2. Gemini API (Free)
- Pergi aistudio.google.com/app/apikey
- Create key, no billing
- Limit 15 RPM / 1500 RPD - cukup

## 3. Amadeus API (Free Test)
- Daftar di developers.amadeus.com
- Create app -> dapat API_KEY & SECRET
- Test env 2000 calls/bulan free
- Code lib/amadeus.ts must cache ke Supabase flight_cache untuk jimat

## 4. Other Free APIs (No key)
- REST Countries: https://restcountries.com/v3.1/all
- ExchangeRate: https://api.exchangerate-api.com/v4/latest/MYR

## 5. Run
```
npm install @supabase/supabase-js @google/generative-ai amadeus
npm run dev
```

## Antigravity Skill Flow
1. /grill-me - tanya 3 soalan pasal idea travel
2. /task-breakdown - pecah task untuk 4 orang
3. Build UI dummy dulu (no map, just cards)
