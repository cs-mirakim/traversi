# Folder Structure

travel-diy-rm/
├── app/
│   ├── page.tsx                 # Landing + Input form
│   ├── layout.tsx
│   ├── api/
│   │   ├── recommend/route.ts   # Core logic budget filter
│   │   ├── flight/route.ts      # Amadeus wrapper + cache
│   │   └── estimate/route.ts    # Gemini cost estimate
│   └── result/[id]/page.tsx    # Detail itinerary
├── components/
│   ├── BudgetForm.tsx
│   ├── DestinationCard.tsx
│   ├── BreakdownBar.tsx
│   └── BadgeHalalVisa.tsx
├── lib/
│   ├── supabase.ts              # client + server
│   ├── amadeus.ts               # free tier wrapper with cache
│   ├── gemini.ts                # estimate + itinerary
│   ├── countries.ts              # REST Countries + visa logic
│   └── currency.ts              # ExchangeRate API
├── supabase/
│   └── migrations/
│       └── 001_init.sql
├── docs/
│   ├── PRD.md
│   ├── TASKS.md
│   ├── FOLDER_STRUCTURE.md
│   ├── DEV_GUIDE.md
│   └── TECH_STACK.md
├── .env.example
└── README.md
