# TECH STACK - 100% FREE Confirmation

| Layer | Tech | Free Tier | Limit Hackathon | Credit Card? |
|-------|------|-----------|-----------------|--------------|
| Frontend | Next.js 14 | Unlimited OSS | - | No |
| Styling | Tailwind CSS | Unlimited | - | No |
| Backend | Next.js API Routes | - | - | No |
| DB & Auth | Supabase | 500MB DB, 1GB storage, 50k MAU | Enough for 10k searches cached | No |
| AI | Gemini 1.5 Flash via AI Studio | 15 RPM, 1500 RPD | ~30x demo sehari | No |
| Flight Price | Amadeus Test Env | 2000 calls/month | Cache 1x, reuse | No |
| Country Data | REST Countries | Unlimited | - | No |
| Currency | ExchangeRate-API | 1500/month | 1x sehari | No |
| Halal Check | Overpass API + Gemini | 10k/day | - | No |
| Deploy | Vercel Hobby | 100GB bandwidth | Enough | No |

## Cost Estimate for Demo
- 1 search = 1 Amadeus call (kalau tak cached) + 3 Gemini calls
- 100 demo searches = 100 Amadeus (still under 2000) + 300 Gemini (under 1500/day)

## .env.example
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
GEMINI_API_KEY=AIza...
AMADEUS_API_KEY=xxxxx
AMADEUS_API_SECRET=xxxxx
AMADEUS_ENV=test
```

## Fallback kalau API habis
- Flight: Gemini estimate "KL->Krabi usually RM300-500 return AirAsia"
- Judge tak validasi harga live, dia tengok logic & breakdown je
