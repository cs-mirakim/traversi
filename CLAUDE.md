# CLAUDE.md - Traversi | Travel Versi Anda

## Project Overview
Traversi = Sistem kalkulator bajet terbalik (Reverse-Budgeting) untuk belia Malaysia. User masuk bajet RM, system bagi 3 destinasi yang muat bajet siap pecahan 4 dimensi kos + semak visa passport MY + skor halal.

Tagline: Travel Versi Anda / Your Trip, Your Version

## Tech Stack - 100% FREE
- Next.js 14 App Router, TypeScript, Tailwind CSS
- Supabase (Postgres, Auth Google, Cache) - cloud
- Gemini 1.5 Flash via AI Studio (free 15 RPM / 1500 RPD) - AI
- Amadeus Test API (2000 calls/month) + REST Countries + ExchangeRate-API + Overpass API
- Vercel deploy - cloud
- shadcn/ui + taste-skill + anti-ai-slop for UI

## Commands
- `npm run dev` -> localhost:3000
- `npm run build` -> production build
- `npm run lint` -> check

## Folder Structure Rules
- `app/page.tsx` = landing pitch deck lengkap ikut rules Averis (jangan buat folder landing)
- `app/kalkulator/page.tsx` = page fungsi utama (bukan kira)
- `app/api/` = recommend, flight, estimate
- `docs/` = PRD, ARCHITECTURE, TASKS, README, API - untuk dev, detail gila
- `.agents/skills/` = 1 folder 1 skill, gitignore
- `locales/bm.json` & `en.json` = bilingual manual, BM santai tak baku cringe

## Critical Rules (Anti Halusinasi)
1. JANGAN buat projek baru. Revamp projek sedia ada je.
2. JANGAN guna .claude atau agent folder. Guna .agents/skills/ sahaja.
3. JANGAN buat map besar. Cards sahaja.
4. Budget logic: Flight per pax, Hotel = ceil(pax/2) * nights, Makan per pax, Transport share. Tier: RM800-1500 domestic, RM1500-3000 ASEAN, RM3000+ global.
5. Halal: Overpass diet:halal + Gemini sentiment, bukan hardcode list.
6. Visa: passport-visa-api untuk MY passport, bukan hardcode manual.
7. Domestic: assume flight untuk MVP, jangan pening pasal bas.
8. Bilingual manual JSON, BM santai tapi grammar betul.
9. .env.example commit, .env.local gitignore. Dua file wajib ada.
10. Theme hijau tenang: bg #022c22, card #ecfdf5, accent emerald-600, no purple gradient, no glassmorphism.

## Judging Criteria Averis
Prelim 100 marks: System Design 15, Prototype 25, Tech Integration 15, Feasibility 15, Problem Understanding 10, Innovation 10, Practical Value 10
Final 100 marks: E2E Functionality 25, Architecture 15, Tech Integration 15, Engineering 15, Solution Effectiveness 10, UX 10, Impact 10

## Current Status
UI demo ada tapi folder berterabur. Need revamp structure + polish anti AI slop.
