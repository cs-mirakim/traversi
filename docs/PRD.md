# PRD - Traversi (Travel DIY RM) - Detailed for Dev & AI

## 1. Problem Statement (Real Malaysian Youth)
> 70% belia Malaysia terlebih belanja sebab maklumat pecah-belah. Skyscanner tunjuk flight RM280 je, tapi sampai destinasi hotel + makan + Grab cecah RM2,000 tanpa sedar. Kena buka 4 app: satu cari tiket, satu hotel, satu Google visa MY, satu lagi cari kedai halal. Takde satu tempat bagi total kos dalam RM + status visa + halal.

Target: Belia 18-35, bajet RM800-RM10,000, passport Malaysia, concern halal & visa free. Termasuk domestic (Langkawi, Penang, KK) sebab student pun travel dalam negara.

## 2. Solution - Reverse-Budgeting Engine
User masuk: Bajet total (RM), Tempoh (1-14 hari custom), Dari (KUL/KLIA2/PEN/KCH/KK/BKI), Pax (1-10 custom input bukan button je), Vibe (Beach, City, Nature, Halal Food, etc)

System: Filter destinasi dalam 3 tier:
- Tier 1 Domestic RM800-1500: Langkawi, Penang, Kota Kinabalu, Kuching, Redang
- Tier 2 ASEAN RM1500-3000: Bali, Bangkok, Krabi, Dalat, HCMC, Phuket, Lombok
- Tier 3 Global RM3000+: Istanbul, Tokyo, Seoul, Taipei, Dubai

Output: 3 cards destinasi yang total <= bajet. Setiap card ada pecahan 4 dimensi kos wajib (Flight, Hotel, Makan, Transport) + badge Visa Free + Skor Halal + 1 ayat kenapa ngam bajet.

NOT booking system. Just recommendation + itinerary AI. Ada button redirect ke AirAsia/Skyscanner/Booking.com untuk check harga sebenar (external link, free tier boleh).

## 3. User Flow
1. Landing pitch deck (/) - user baca masalah, 3 tonggak, perbandingan, architecture, roadmap, terus CTA ke kalkulator
2. Klik "Buka Kalkulator" -> /kalkulator
3. Isi form flexible: Budget custom number + slider, Days custom 1-14, From dropdown, Pax custom 1-10, Vibe multi-select
4. Submit -> POST /api/recommend
5. API check Supabase flight_cache & destinations_cache dulu. Kalau takde, hit Amadeus test + Gemini estimate + REST Countries + ExchangeRate + Overpass halal count
6. Return 3 cards sorted by best value (saving paling banyak tapi experience best)
7. Klik card -> Modal itinerary 4 hari real dari sentiment Google/Social (Gemini generate based on top rated places >4.5)
8. Optional: Pin/star destinasi (need login Google). History search simpan kalau login.

## 4. Features MVP vs Future

### MVP (Hackathon 18-22 Sept)
- Input flexible gila (custom pax 1-10, days 1-14, budget 500-10000)
- 3 cards dengan breakdown 4 dimensi
- Halal score dynamic via Overpass count + Gemini sentiment (Mudah/Sederhana/Terhad)
- Visa check via passport-visa-api (MY passport 180 countries visa-free)
- Itinerari harian 4 hari real (Gemini generate dari top places)
- Popular searches dari table searches count
- Bilingual BM/EN manual JSON (BM santai tak cringe)
- Dummy Google login button (flow: register -> login page -> kalkulator) - Moi akan integrate Supabase Auth Google nanti
- Landing = pitch deck lengkap: Problem, Solution, 3 Tonggak, Comparison Table, Architecture Diagram, Tech Stack (Supabase cloud + Gemini AI), Implementation, Challenges, Future Roadmap, Team

### Future (Post Hackathon)
- User submit kos sebenar untuk human validation
- Affiliate link booking
- Share ke WhatsApp
- PWA offline

## 5. Tech Stack Justification (Cloud + AI Requirement Averis)
- AI: Gemini 1.5 Flash (free tier) untuk estimate kos, generate ayat kenapa ngam, generate itinerari real, halal sentiment
- Cloud: Supabase Postgres (DB cache) + Supabase Auth + Vercel hosting = cloud infra, meet requirement Averis
- Flight: Amadeus Test 2000 calls/month, cache dalam flight_cache untuk jimat
- Country: REST Countries free, no key
- Currency: ExchangeRate-API 1500/month
- Halal: Overpass API diet:halal=yes
- Visa: passport-visa-api (salamwaddah/passport-visa-api) atau passportindex.org scrape

## 6. Acceptance Criteria
- User boleh masuk RM2500, 4 hari, 1 pax, dari KUL -> dapat 3 cards dalam <5 saat
- Setiap card ada breakdown RM betul, bukan mock sama semua
- Halal badge show count kedai halal dari Overpass, bukan hardcode
- Visa badge show days (contoh Visa Free 30 hari) dari API, bukan hardcode
- Kalkulator boleh custom pax 7, days 10, budget RM7234 (bukan limit 4 pax je)
- Landing page ada semua section yang Averis minta (Architecture, Implementation, Challenges, Roadmap)
- BM santai tapi grammar betul, EN professional
- Theme hijau tenang #022c22 + #ecfdf5, no purple gradient, no AI slop

## 7. Non-Goals
- Bukan booking engine, no payment
- No map besar, cards je
- No hardcode list negara, semua dynamic

## 8. Open Questions Resolved
- Domestic transport assume flight untuk MVP (user tak pernah naik bas, simplify)
- Bilingual manual JSON, BM santai
- Human validation via crowd submit kos sebenar later
