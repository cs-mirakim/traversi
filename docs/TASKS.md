# TASKS - Traversi - 4 Orang - Revamp Edition

## Phase 0 - Revamp Folder (Hari ni) - Amir Hakim
- [ ] Delete folder duplicate .claude & agent, keep .agents/skills/ sahaja
- [ ] Buat folder .agents/skills/mattpoc, shadcn, anti-ai-slop, taste-skill dengan SKILL.md placeholder
- [ ] Rename context/ -> docs/ dan ganti content dengan docs baru detailed (PRD, ARCHITECTURE, etc)
- [ ] Buat .env.example (template kosong) & .env.local (real, gitignore) + update .gitignore
- [ ] Rename app/kira -> app/kalkulator, keep app/page.tsx as landing pitch deck
- [ ] Buat locales/bm.json & en.json manual bilingual
- [ ] Install skills: npx skills add mattpoc, npx skills add shadcn, npx skills add miqdadbadjuber/anti-slop, npx skills add https://github.com/Leonxlnx/taste-skill --skill design-taste-frontend-v1
- [ ] Update components.json shadcn config commit

## Phase 1 - Core Logic Flexible (Moi & Eqhlas)
- [ ] lib/amadeus.ts dengan cache logic Supabase flight_cache (jimat 2000 quota)
- [ ] lib/halal.ts Overpass query diet:halal=yes + count
- [ ] lib/countries.ts guna passport-visa-api untuk MY visa-free 180 countries
- [ ] lib/gemini.ts 3 function: estimateCost(city), generateItinerary(city, days, pax), halalSentiment(city)
- [ ] app/api/recommend/route.ts reverse-budget logic flexible pax 1-10, days 1-14, budget 500-10000, tier domestic/ASEAN/global
- [ ] Supabase migrations untuk 4 tables (searches, destinations_cache, flight_cache, user_pins)

## Phase 2 - UI Kalkulator Flexible (Paan & Hakim)
- [ ] components/kalkulator/BudgetForm.tsx: custom number input + slider, pax custom 1-10 input, days custom 1-14, from dropdown KUL/PEN/KCH/KK/BKI, vibe multi-select
- [ ] components/kalkulator/DestinationCard.tsx: show total RM, breakdown bar 4 dimensi, badge visa + halal count, 1 ayat kenapa ngam
- [ ] components/kalkulator/ItineraryModal.tsx: real itinerary dari Gemini + halal food suggestion + button redirect AirAsia/Skyscanner/Booking.com (external link free)
- [ ] components/kalkulator/TrendingSearches.tsx: fetch dari searches table count

## Phase 3 - Landing Pitch Deck Lengkap (Semua)
- [ ] app/page.tsx jadi pitch deck: Hero (Bajet Berapa Boleh Pergi Mana?), Problem (Mengapa Tersangkut), 3 Tonggak (4 Dimensi, Visa MY, Halal Score), Comparison Table vs Skyscanner/Google Flights/Traveloka/Klook, Architecture Diagram (Supabase + Vercel + Gemini), TechStack (Cloud + AI), Implementation Details, Challenges Faced, Future Roadmap (human validation), Team 4 orang, CTA ke kalkulator
- [ ] components/landing/* pecah sections
- [ ] Theme hijau tenang #022c22 bg, #ecfdf5 card, emerald-600 accent, no AI slop (pakai taste-skill)
- [ ] Bilingual toggle BM/EN di Navbar

## Phase 4 - Auth Dummy & Polish (Moi)
- [ ] Navbar ada Login dengan Google button dummy (flow: Register -> redirect /login -> /kalkulator) - nanti Moi integrate Supabase Auth Google real
- [ ] Dummy pin/star feature kalau login
- [ ] Loading skeleton, error handling
- [ ] Deploy Vercel, test live prototype link untuk submission Averis

## Submission Checklist Averis (22 Sept 12pm)
- [ ] Project Description di Google Form
- [ ] Demo Video 5 min max (Intro team + problem + tech stack Supabase+Gemini + live demo + impact) YouTube unlisted
- [ ] GitHub repo link dengan README setup instructions clear
- [ ] Live prototype Vercel link functional
- [ ] Slide deck / Documentation link - guna landing page link sebagai docs (https://traversi.vercel.app) + docs/ folder

## Antigravity Prompt Flow
1. Prompt revamp folder structure
2. Prompt docs detailed
3. Prompt UI anti slop hijau tenang
4. Prompt logic flexible
