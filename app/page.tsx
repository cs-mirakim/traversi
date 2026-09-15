"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ComparisonTable from "@/components/ComparisonTable";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Calculator, 
  ShieldCheck, 
  UtensilsCrossed, 
  Check, 
  ArrowRight, 
  AlertTriangle,
  Database,
  Cpu,
  Cloud,
  Layers,
  Calendar,
  Compass,
  CheckCircle2,
  Code2,
  Target
} from "lucide-react";

export default function HomePage() {
  const { locale, t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-[#0f172a] font-sans flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      <main className="flex-1">
        {/* =========================================================
            1. HERO SECTION: CLEAN WHITE WITH CALM EMERALD HIGHLIGHTS
        ========================================================= */}
        <section className="relative pt-16 pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-stone-950 mb-6 max-w-4xl mx-auto leading-tight">
            {locale === "bm" ? (
              <>
                Kau Masuk Bajet RM, <br className="hidden sm:inline" />
                <span className="text-emerald-800 underline decoration-emerald-300 decoration-wavy decoration-2">
                  Traversi Carikan Destinasi Ngam.
                </span>
              </>
            ) : (
              <>
                You Enter Your Budget, <br className="hidden sm:inline" />
                <span className="text-emerald-800 underline decoration-emerald-300 decoration-wavy decoration-2">
                  Traversi Finds the Fit.
                </span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-stone-600 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            {locale === "bm"
              ? "Sistem kalkulator terbalik (Reverse-Budgeting) pertama untuk belia Malaysia: masukkan had wang poket anda, enjin pintar menentukan destinasi mana yang muat bajet siap pecahan tiket, hotel kongsi, makan harian, dan status halal."
              : "Malaysia's first reverse-budgeting travel recommendation engine: enter your actual spending limit, and the system computes destinations that genuinely fit return flights, twin-sharing hotels, daily meals, and visa/halal requirements."}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link
              href="/kalkulator"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-900/15 transition-all cursor-pointer"
            >
              <Calculator className="w-5 h-5" />
              <span>{locale === "bm" ? "Mula Kira Bajet Sekarang" : "Calculate My Budget Now"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#architecture"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-stone-50 text-stone-700 font-bold text-base flex items-center justify-center gap-2 border border-stone-200 shadow-2xs transition-colors"
            >
              <Layers className="w-4 h-4 text-emerald-800" />
              <span>{locale === "bm" ? "Seni Bina Supabase & AI" : "Supabase & AI Architecture"}</span>
            </a>
          </div>

          {/* Three Feature Pillars Highlight */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto pt-2 text-left">
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
              <div className="flex items-center gap-2 font-bold text-stone-900 text-base mb-1">
                <Check className="w-4 h-4 text-emerald-700 shrink-0 stroke-[2.5]" />
                <span>{locale === "bm" ? "100% Kos Telus" : "100% Transparent Costs"}</span>
              </div>
              <p className="text-xs text-stone-600 font-medium">
                {locale === "bm" 
                  ? "Pecahan 4 dimensi: penerbangan, bilik hotel kongsi, makan harian, dan Grab."
                  : "4-dimensional split: flights, twin-sharing rooms, daily meals, and ground transport."}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
              <div className="flex items-center gap-2 font-bold text-stone-900 text-base mb-1">
                <UtensilsCrossed className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{locale === "bm" ? "Overpass Halal OSM" : "Overpass Halal OSM"}</span>
              </div>
              <p className="text-xs text-stone-600 font-medium">
                {locale === "bm"
                  ? "Kueri geospatial premis makanan diet:halal OpenStreetMap sebenar di destinasi."
                  : "Live geospatial query of OpenStreetMap diet:halal food nodes around the city."}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
              <div className="flex items-center gap-2 font-bold text-stone-900 text-base mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{locale === "bm" ? "Pasport Malaysia (MY)" : "Malaysian Passport (MY)"}</span>
              </div>
              <p className="text-xs text-stone-600 font-medium">
                {locale === "bm"
                  ? "Semakan automatik akses bebas visa dan tempoh hari tanpa perlu carian berulang."
                  : "Automated visa exemption checking and permitted duration for Malaysian citizens."}
              </p>
            </div>
          </div>
        </section>


        {/* =========================================================
            2. REAL PROBLEM: KENAPA BELIA MALAYSIA SELALU OVERBUDGET
        ========================================================= */}
        <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-stone-200/80">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {locale === "bm" ? "Kajian Masalah Nyata" : "The Core Problem"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-3">
              {locale === "bm" ? "Mengapa Ramai Belia Malaysia Terlebih Belanja?" : "Why Do Malaysian Youth Constantly Overspend?"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 font-medium">
              {locale === "bm" 
                ? "Lebih 70% pengembara belia terlebih belanja kerana maklumat industri semasa berpecah-belah."
                : "Over 70% of young travelers exceed their planned budget due to fragmented booking tools."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-stone-950">
                {locale === "bm" ? "Tiket Flight Cuma Separuh Cerita" : "Flights Are Only Half the Picture"}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {locale === "bm"
                  ? "Skyscanner tunjuk tiket RM280, tapi sampai destinasi kos hotel, makan minum, dan Grab melonjak cecah RM2,000 tanpa sedar."
                  : "Platforms advertise flights for RM280, but ground expenses easily exceed RM2,000 once you arrive."}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-stone-950">
                {locale === "bm" ? "Kena Buka 4 Aplikasi Berbeza" : "Juggling 4 Separate Apps"}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {locale === "bm"
                  ? "Satu laman untuk tiket, satu aplikasi untuk hotel, satu tab Google syarat visa pasport MY, dan satu lagi cari restoran halal."
                  : "One site for airfare, another for hotels, a Google tab for visa regulations, and another searching for halal eateries."}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-stone-950">
                {locale === "bm" ? "Tiada Enjin Dari Sudut Poket Anda" : "Zero Wallet-First Engines"}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {locale === "bm"
                  ? "Sistem komersial sedia ada dibina untuk menjual tiket komisen, bukan untuk memastikan pengembara tidak terlebih belanja."
                  : "Existing travel platforms push commission inventory rather than safeguarding your bottom line."}
              </p>
            </div>
          </div>
        </section>


        {/* =========================================================
            3. THREE PILLARS (TIGA TONGGAK)
        ========================================================= */}
        <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-stone-200/80">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {locale === "bm" ? "Tiga Tonggak Traversi" : "Three Pillars"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-3">
              {locale === "bm" ? "Dicipta Khas Untuk Pengembara Malaysia" : "Engineered Specifically for Malaysian Travelers"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-950">
                {locale === "bm" ? "1. Kos Penuh 4 Dimensi" : "1. Realistic 4D Cost Breakdown"}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {locale === "bm"
                  ? "Formula mengira tiket pergi-balik per pax, hotel bilik kongsi ceil(pax/2), makan harian, dan Grab perkongsian kumpulan."
                  : "Computes return flights, shared twin rooms ceil(pax/2), daily halal dining, and rideshare transport."}
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-950">
                {locale === "bm" ? "2. Halal OSM & Pasport MY" : "2. Live Halal & Visa Checks"}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {locale === "bm"
                  ? "Data Overpass API OpenStreetMap untuk premis makanan halal dan semakan peraturan pasport Malaysia 180+ negara."
                  : "Live OpenStreetMap Overpass API halal queries paired with Malaysian passport visa datasets."}
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-950">
                {locale === "bm" ? "3. Jadual 4 Hari Realistik" : "3. Realistic 4-Day Itinerary"}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {locale === "bm"
                  ? "Itinerari harian yang praktikal bersama port makan halal berkadar tinggi yang sepadan dengan baki poket sebenar."
                  : "Curated itineraries featuring high-rated halal spots matched against remaining pocket budget."}
              </p>
            </div>
          </div>
        </section>


        {/* =========================================================
            4. COMPARISON TABLE
        ========================================================= */}
        <section id="perbandingan" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto border-t border-stone-200/80">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {locale === "bm" ? "Penanda Aras Ekosistem" : "Market Benchmark"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-3">
              {locale === "bm" ? "Perbandingan Traversi Berbanding Sistem Komersial Global" : "Traversi vs Global Commercial Travel Platforms"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 font-medium">
              {locale === "bm" 
                ? "Lihat bagaimana Traversi mengisi jurang yang ditinggalkan oleh enjin carian tiket biasa."
                : "Discover how Traversi resolves the blindspots of standard flight booking engines."}
            </p>
          </div>

          <ComparisonTable />
        </section>


        {/* =========================================================
            5. ARCHITECTURE SECTION (SUPABASE CLOUD + GEMINI AI)
        ========================================================= */}
        <section id="architecture" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-stone-200/80">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {locale === "bm" ? "Seni Bina Sistem (Averis Cloud + AI)" : "System Architecture (Cloud + AI)"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-3">
              {locale === "bm" ? "Integrasi Cloud Supabase & Google Gemini 1.5" : "Supabase Cloud & Google Gemini 1.5 Integration"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 font-medium">
              {locale === "bm"
                ? "Seni bina awan berprestasi tinggi yang menggabungkan pengkomputeran pelayan awan dengan kecerdasan buatan dan data geospatial terbuka."
                : "High-performance architecture merging cloud Postgres caching, LLM reasoning, and open geospatial queries."}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
            {/* Diagram */}
            <div className="text-xs font-mono text-stone-800 bg-stone-50 p-4 rounded-2xl border border-stone-200 overflow-x-auto leading-relaxed">
              <span className="text-emerald-800 font-bold block mb-1"># Aliran Data Seni Bina Traversi (E2E Workflow)</span>
              1. Pengguna (Pelayar Web BM/EN) &rarr; Next.js 14 App Router (Hos Vercel Cloud Serverless)<br />
              2. Kueri /api/recommend &rarr; Semak Lapisan Cache Supabase Cloud Postgres (destinations_cache &amp; flight_cache)<br />
              3. Cache Miss? &rarr; Hantar Kueri Selari: Amadeus Flight API + Overpass OSM API (diet:halal=yes) + Passport-Visa-API<br />
              4. Enjin AI &rarr; Google Gemini 1.5 Flash menjana analisis justifikasi bajet, itinerari realistik, dan sentimen halal<br />
              5. Output &rarr; 3 Destinasi Optimum muat bajet dipaparkan bersama pecahan 4 dimensi kos &amp; semakan pasport
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 text-stone-950 font-bold text-sm">
                  <Database className="w-4 h-4 text-emerald-800" />
                  <span>Supabase Cloud Postgres</span>
                </div>
                <p className="text-xs text-stone-600 font-medium leading-relaxed">
                  Pangkalan data awan terurus untuk jadual <code className="text-emerald-800 font-semibold">searches</code>, <code className="text-emerald-800 font-semibold">flight_cache</code> (jimat kuota API), dan <code className="text-emerald-800 font-semibold">user_pins</code>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 text-stone-950 font-bold text-sm">
                  <Cpu className="w-4 h-4 text-emerald-800" />
                  <span>Google Gemini 1.5 Flash</span>
                </div>
                <p className="text-xs text-stone-600 font-medium leading-relaxed">
                  Enjin LLM untuk anggaran kos hotel/makanan, sentimen ulasan kedai halal pelancong Muslim, dan penjanaan itinerari 4 hari.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 text-stone-950 font-bold text-sm">
                  <Cloud className="w-4 h-4 text-emerald-800" />
                  <span>Overpass OSM &amp; Passport</span>
                </div>
                <p className="text-xs text-stone-600 font-medium leading-relaxed">
                  Kueri terus data OpenStreetMap nod diet:halal tanpa senarai statik, bersama peraturan pasport Malaysia 180+ negara.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* =========================================================
            6. IMPLEMENTATION & MATH FORMULA
        ========================================================= */}
        <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-stone-200/80">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {locale === "bm" ? "Pelaksanaan Kejuruteraan" : "Engineering Implementation"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-3">
              {locale === "bm" ? "Formula Matematik & Logik Terbalik" : "Reverse Budgeting Mathematical Logic"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-bold text-lg text-stone-950 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-800" />
                <span>{locale === "bm" ? "Formula Matematik 4 Dimensi" : "4D Cost Calculation"}</span>
              </h3>
              <div className="p-4 rounded-xl bg-stone-50 font-mono text-xs text-stone-800 border border-stone-200 space-y-1.5">
                <p className="text-emerald-800 font-bold">// Pengiraan Kos Total Kumpulan</p>
                <p>rooms = ceil(pax / 2);</p>
                <p>nights = max(0, days - 1);</p>
                <p className="text-stone-950 font-bold pt-1">
                  total = (flight * pax) + (hotel * rooms * nights) + (food * pax * days) + (transport * rooms * days);
                </p>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Mencerminkan tingkah laku sebenar belia: berkongsi bilik hotel berdua (twin-sharing) dan berkongsi tambang kenderaan/Grab secara kumpulan untuk penjimatan maksimum.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-bold text-lg text-stone-950 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-800" />
                <span>{locale === "bm" ? "Skor Penilaian Destinasi" : "Value Score Metric"}</span>
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Destinasi dinilai menggunakan algoritma <code className="text-emerald-800 font-semibold">valueScore</code> untuk memilih cadangan terbaik:
              </p>
              <ul className="text-xs text-stone-700 space-y-2 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                  <span><strong>Penggunaan Bajet Optimum:</strong> Destinasi menggunakan 70% hingga 95% had belanja diberi keutamaan tertinggi.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                  <span><strong>Bonus Halal Overpass:</strong> Tambahan markah jika premis halal bertaraf &quot;Mudah&quot; (&ge;100 nod OSM).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                  <span><strong>Kemudahan Pasport:</strong> Destinasi bebas visa 30-90 hari atau domestik MyKad diberi skor nilai tinggi.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>


        {/* =========================================================
            7. CHALLENGES & SOLUTIONS
        ========================================================= */}
        <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-stone-200/80">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {locale === "bm" ? "Cabaran & Keputusan Kejuruteraan" : "Challenges & Solutions"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-3">
              {locale === "bm" ? "Halangan Teknikal & Penyelesaian" : "Technical Challenges & Engineering Decisions"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <h3 className="text-base font-bold text-stone-950">1. Had Kuota API Luaran</h3>
              <p className="text-xs text-rose-700 font-bold">Cabaran:</p>
              <p className="text-xs text-stone-600 font-medium">
                Amadeus Test API menghadkan 2,000 panggilan sebulan, manakala kueri Overpass awam boleh mengalami latensi tinggi.
              </p>
              <p className="text-xs text-emerald-800 font-bold pt-1">Penyelesaian Kejuruteraan:</p>
              <p className="text-xs text-stone-600 font-medium">
                Membina lapisan cache multi-tier dalam Supabase Postgres (<code className="text-emerald-800 font-semibold">destinations_cache</code> &amp; <code className="text-emerald-800 font-semibold">flight_cache</code>) dengan jangka hayat TTL 24 jam.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <h3 className="text-base font-bold text-stone-950">2. Ketepatan Data Halal</h3>
              <p className="text-xs text-rose-700 font-bold">Cabaran:</p>
              <p className="text-xs text-stone-600 font-medium">
                Banyak platform pelancongan hanya menggunakan senarai statik yang tidak dikemas kini atau berat sebelah.
              </p>
              <p className="text-xs text-emerald-800 font-bold pt-1">Penyelesaian Kejuruteraan:</p>
              <p className="text-xs text-stone-600 font-medium">
                Menghantar kueri nod spatial <code className="text-emerald-800 font-semibold">node[&quot;diet:halal&quot;=&quot;yes&quot;]</code> terus ke OpenStreetMap dan menyemak silang dengan sentimen ulasan Google via Gemini 1.5 Flash.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <h3 className="text-base font-bold text-stone-950">3. Kekeliruan Visa Belia</h3>
              <p className="text-xs text-rose-700 font-bold">Cabaran:</p>
              <p className="text-xs text-stone-600 font-medium">
                Belia sering keliru antara visa on arrival, permohonan eVisa awal (K-ETA Korea), dan negara bebas visa sepenuhnya.
              </p>
              <p className="text-xs text-emerald-800 font-bold pt-1">Penyelesaian Kejuruteraan:</p>
              <p className="text-xs text-stone-600 font-medium">
                Penyepaduan modul semakan pasport automatik yang memaparkan label jelas (contoh: Visa Free 30 Hari, K-ETA, atau MyKad bagi penerbangan domestik).
              </p>
            </div>
          </div>
        </section>


        {/* =========================================================
            8. ROADMAP
        ========================================================= */}
        <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-stone-200/80">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {locale === "bm" ? "Pelan Hala Tuju Produk" : "Product Roadmap"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-3">
              {locale === "bm" ? "Dari Prototaip Hackathon Ke Ekosistem Sebenar" : "From Hackathon Prototype to Real Ecosystem"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-emerald-50/70 border-2 border-emerald-600 space-y-3">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-800 text-white text-xs font-bold">
                FASA 1: MVP
              </div>
              <h3 className="font-bold text-base text-stone-950">Averis Hackathon 2026</h3>
              <ul className="text-xs text-stone-700 space-y-1.5 font-medium">
                <li>&bull; Enjin Reverse-Budgeting fleksibel (RM500-RM10,000)</li>
                <li>&bull; Pecahan 4 dimensi kos per pax &amp; perkongsian bilik</li>
                <li>&bull; Semakan Halal Overpass OSM &amp; Pasport Malaysia</li>
                <li>&bull; Penjanaan jadual 4 hari realistik dengan Gemini AI</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <div className="inline-block px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-bold">
                FASA 2: Komuniti
              </div>
              <h3 className="font-bold text-base text-stone-950">Suku Keempat 2026</h3>
              <ul className="text-xs text-stone-700 space-y-1.5 font-medium">
                <li>&bull; Modul submit kos sebenar oleh belia (Crowdsourced validation)</li>
                <li>&bull; Log masuk Supabase Auth (Google) untuk simpan carian</li>
                <li>&bull; Eksport jadual harian dan kos terus ke WhatsApp</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <div className="inline-block px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-bold">
                FASA 3: Ekosistem
              </div>
              <h3 className="font-bold text-base text-stone-950">Tahun 2027</h3>
              <ul className="text-xs text-stone-700 space-y-1.5 font-medium">
                <li>&bull; Pautan affiliate rasmi AirAsia/Skyscanner/Agoda</li>
                <li>&bull; Aplikasi Web Progresif (PWA) mod luar talian</li>
                <li>&bull; Integrasi e-dompet belia tempatan (Touch &apos;n Go)</li>
              </ul>
            </div>
          </div>
        </section>


        {/* =========================================================
            9. TEAM (4 ORANG)
        ========================================================= */}
        <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-stone-200/80">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {locale === "bm" ? "Pasukan Pembangun" : "Development Team"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-3">
              {locale === "bm" ? "Pasukan 4 Orang Traversi" : "Traversi 4-Member Team"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs text-center space-y-2">
              <div className="w-11 h-11 rounded-full bg-emerald-800 text-white font-black text-base flex items-center justify-center mx-auto">
                AH
              </div>
              <h3 className="font-bold text-stone-950 text-sm">Amir Hakim</h3>
              <p className="text-xs font-bold text-emerald-800">Team Lead &amp; Full-Stack</p>
              <p className="text-[11px] text-stone-600">Seni bina Next.js 14, reverse-budgeting, rekaan UI anti-slop.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs text-center space-y-2">
              <div className="w-11 h-11 rounded-full bg-stone-100 text-stone-800 font-black text-base flex items-center justify-center mx-auto border border-stone-200">
                M
              </div>
              <h3 className="font-bold text-stone-950 text-sm">Moi</h3>
              <p className="text-xs font-bold text-emerald-800">Cloud &amp; Database</p>
              <p className="text-[11px] text-stone-600">Skema Supabase Postgres, lapisan cache &amp; Google Auth.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs text-center space-y-2">
              <div className="w-11 h-11 rounded-full bg-stone-100 text-stone-800 font-black text-base flex items-center justify-center mx-auto border border-stone-200">
                E
              </div>
              <h3 className="font-bold text-stone-950 text-sm">Eqhlas</h3>
              <p className="text-xs font-bold text-emerald-800">AI Engineer</p>
              <p className="text-[11px] text-stone-600">Prompt engineering Gemini 1.5 Flash, itinerari, &amp; sentimen halal.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs text-center space-y-2">
              <div className="w-11 h-11 rounded-full bg-stone-100 text-stone-800 font-black text-base flex items-center justify-center mx-auto border border-stone-200">
                P
              </div>
              <h3 className="font-bold text-stone-950 text-sm">Paan</h3>
              <p className="text-xs font-bold text-emerald-800">External APIs</p>
              <p className="text-[11px] text-stone-600">Integrasi Amadeus Test, REST Countries, ExchangeRate &amp; Overpass.</p>
            </div>
          </div>
        </section>


        {/* =========================================================
            10. FINAL CTA SECTION
        ========================================================= */}
        <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center border-t border-stone-200/80">
          <div className="p-8 sm:p-12 rounded-3xl bg-emerald-50/80 border border-emerald-200 shadow-sm space-y-6">
            <h2 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight">
              {locale === "bm" ? "Bersedia Merancang Trip Mengikut Bajet Anda?" : "Ready to Plan a Trip Within Your Budget?"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto font-medium leading-relaxed">
              {locale === "bm"
                ? "Masukkan had bajet anda sekarang dan lihat destinasi yang benar-benar muat dengan wang poket anda tanpa sebarang teka-teki."
                : "Enter your budget limit now and discover destinations that genuinely fit your wallet with zero guesswork."}
            </p>
            <div className="pt-2">
              <Link
                href="/kalkulator"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-base shadow-lg shadow-emerald-900/15 transition-all cursor-pointer"
              >
                <Calculator className="w-5 h-5" />
                <span>{locale === "bm" ? "Buka Kalkulator Bajet Sekarang" : "Open Budget Calculator Now"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-stone-200 bg-white py-8 px-4 sm:px-6 text-center text-xs text-stone-500">
        <div className="max-w-5xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 font-bold text-stone-900">
            <Compass className="w-4 h-4 text-emerald-800" />
            <span>Traversi &bull; {locale === "bm" ? "Travel Versi Anda" : "Your Trip, Your Version"}</span>
          </div>
          <p className="text-stone-500 max-w-md mx-auto">
            Averis Hackathon 2026
          </p>
          <div className="pt-2 text-[11px] text-stone-400 border-t border-stone-100">
            Pasukan 4 Orang: <strong>Amir Hakim</strong> &bull; <strong>Moi</strong> &bull; <strong>Eqhlas</strong> &bull; <strong>Paan</strong>
          </div>
        </div>
      </footer>
    </div>
  );
}
