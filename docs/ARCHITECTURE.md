# ARCHITECTURE - Traversi

## High Level
```
User (BM/EN) -> Next.js 14 App Router (Vercel Cloud)
  -> /api/recommend -> Supabase Cache Check (Postgres Cloud)
    -> Miss? -> Amadeus Flight (test) + REST Countries + ExchangeRate + Overpass Halal
    -> Gemini Estimate (hotel, food, transport, itinerary)
  -> Return 3 destinations + breakdown
  -> Supabase save searches for trending
```

## Folder Structure Final (Revamp, Not New Project)
```
traversi/
├── .agents/
│   └── skills/
│       ├── mattpoc/SKILL.md
│       ├── shadcn/SKILL.md
│       ├── anti-ai-slop/SKILL.md
│       └── taste-skill/SKILL.md
├── docs/
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── TASKS.md
│   ├── README.md
│   ├── CLAUDE.md (copy from root for AI)
│   └── API.md
├── app/
│   ├── page.tsx                # Landing pitch deck lengkap
│   ├── layout.tsx
│   ├── globals.css
│   ├── kalkulator/
│   │   └── page.tsx            # Main calculator flexible
│   └── api/
│       ├── recommend/route.ts  # Core reverse-budget logic
│       ├── flight/route.ts     # Amadeus wrapper + cache
│       └── estimate/route.ts   # Gemini cost + itinerary
├── components/
│   ├── ui/                     # shadcn button, card, slider, etc
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── ThreePillars.tsx
│   │   ├── ComparisonTable.tsx
│   │   ├── ArchitectureSection.tsx
│   │   ├── TechStackSection.tsx
│   │   ├── RoadmapSection.tsx
│   │   └── CTA.tsx
│   ├── kalkulator/
│   │   ├── BudgetForm.tsx      # flexible custom inputs
│   │   ├── DestinationCard.tsx
│   │   ├── BreakdownBar.tsx
│   │   ├── BadgeHalalVisa.tsx
│   │   ├── ItineraryModal.tsx
│   │   └── TrendingSearches.tsx
│   └── shared/
│       ├── Navbar.tsx (BM/EN toggle)
│       └── Footer.tsx
├── lib/
│   ├── supabase.ts
│   ├── gemini.ts               # estimate + itinerary + halal sentiment
│   ├── amadeus.ts              # cache logic
│   ├── countries.ts            # visa via passport-visa-api
│   ├── currency.ts
│   ├── halal.ts                # Overpass query diet:halal
│   ├── mockDestinations.ts     # fallback 15 destinations
│   └── utils.ts
├── locales/
│   ├── bm.json                 # BM santai tak cringe
│   └── en.json
├── public/
├── .env.example                # commit, template kosong
├── .env.local                  # gitignore, real keys
├── .gitignore
├── components.json             # shadcn config commit
└── package.json
```

## Database Schema Supabase
```sql
-- searches for trending
create table searches (
  id uuid primary key default gen_random_uuid(),
  budget int,
  days int,
  pax int,
  from_city text,
  vibe text[],
  created_at timestamp default now()
);

-- cache destinations to avoid re-hit API
create table destinations_cache (
  city text primary key,
  country text,
  country_code text,
  flight_price_rm int,
  hotel_per_night_rm int,
  food_per_day_rm int,
  transport_per_day_rm int,
  visa_free_days int,
  visa_type text, -- visa-free, eVisa, visa-required
  halal_count int, -- from Overpass
  halal_score text, -- Mudah/Sederhana/Terhad
  updated_at timestamp default now()
);

-- flight cache to save Amadeus quota 2000/month
create table flight_cache (
  origin text,
  destination_iata text,
  price_rm int,
  cached_at timestamp default now(),
  primary key (origin, destination_iata)
);

-- user_pins (need auth Google)
create table user_pins (
  user_id uuid references auth.users,
  city text,
  created_at timestamp default now(),
  primary key (user_id, city)
);
```

## Budget Calculation Logic (Flexible Gila)
```
Input: budgetTotal, days, pax (1-10 custom), from, vibe

For each destination in 15 mock list:
  flightPerPax = get from flight_cache or Amadeus or Gemini estimate
  hotelPerNight = Gemini estimate (backpacker RM80, standard RM180, etc)
  foodPerDayPerPax = Gemini estimate (RM30-80)
  transportPerDay = Gemini estimate (RM20-50)

  totalFlight = flightPerPax * pax
  totalHotel = ceil(pax/2) * hotelPerNight * (days-1) -- share 2 per room
  totalFood = foodPerDayPerPax * pax * days
  totalTransport = transportPerDay * ceil(pax/2) * days -- share Grab

  total = totalFlight + totalHotel + totalFood + totalTransport

  if total <= budgetTotal -> candidate

Sort candidates by (budget - total) smallest positive = best value + vibe match

Return top 3

No fixed % - use Gemini estimate per city real, not fixed 40/30/15/10. More accurate.
```

## Halal Scoring Without Hardcode
```
function getHalalScore(city, country):
  1. Overpass query: [out:json]; node["diet:halal"="yes"](around:5000, lat, lon); out count;
  2. Count = number of halal nodes
  3. If count >=100 -> Mudah, 20-99 Sederhana, <20 Terhad
  4. Gemini sentiment: prompt "Based on Google reviews for halal food in {city}, how easy for Muslim traveller?"
  5. Combine: final score = Overpass count + Gemini summary
  Cache in destinations_cache halal_count
```

## Visa Check Without Hardcode
```
Use library salamwaddah/passport-visa-api:
  passport = Passport::make('my')->get()
  For each destination country code, check if in visa-free list
  Return { type: visa-free, days: 30 } or { type: eVisa } etc
Cache in destinations_cache visa_free_days
Fallback: REST Countries + Gemini if API fail
```

## Bilingual Strategy Manual
- locales/bm.json & en.json manual write, not auto translate
- BM style: santai, guna "kau", "ngam", "jimat" tapi grammar betul, elak baku cringe "anda" berlebihan
- EN style: professional simple
- Navbar toggle save in localStorage

## Anti AI Slop UI Rules (from taste-skill & anti-ai-slop)
- No purple gradient (#8b5cf6 to #ec4899)
- No glassmorphism berlebihan
- No Inter font default, use Plus Jakarta Sans or Geist
- No generic card with big rounded 2xl + shadow-2xl
- Use calm green palette: bg #022c22, card #ecfdf5, accent emerald-600, text zinc-900
- Real photos, not AI illustration
- Buttons solid, not gradient
- Spacing 8pt grid, not random

## Cloud + AI Compliance for Averis
- Cloud: Supabase Postgres (AWS) + Vercel (hosting) + Supabase Auth
- AI: Gemini 1.5 Flash for all estimates, itinerary, sentiment
- Must mention both in landing TechStack section + architecture diagram
