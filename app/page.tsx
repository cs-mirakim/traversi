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
  Target,
  Globe,
  ExternalLink,
  Milestone,
  Users,
  Sparkles,
  Server,
  Zap,
  Radio
} from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

export default function HomePage() {
  const { locale } = useLanguage();

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-[#0f172a] font-sans flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      <main className="flex-1 md:pl-72">
        {/* =========================================================
            HERO SECTION: CLEAN WHITE WITH CALM EMERALD HIGHLIGHTS
        ========================================================= */}
        <section className="relative pt-16 pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-stone-950 mb-6 max-w-4xl mx-auto leading-tight">
            {locale === "bm" ? (
              <>
                Kau Masuk Bajet, <br className="hidden sm:inline" />
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

          {/* Three Quick Pillars Highlight */}
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
            1. REAL PROBLEM: KENAPA BELIA MALAYSIA SELALU OVERBUDGET
        ========================================================= */}
        <section id="masalah" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-stone-200/80 scroll-mt-20">
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
            2. THREE PILLARS (TIGA TONGGAK)
        ========================================================= */}
        <section id="tonggak" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-stone-200/80 scroll-mt-20">
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
            3. COMPARISON TABLE
        ========================================================= */}
        <section id="perbandingan" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto border-t border-stone-200/80 scroll-mt-20">
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
            4. ARCHITECTURE DIAGRAM (SUPABASE + VERCEL + GEMINI)
        ========================================================= */}
        <section id="architecture" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-stone-200/80 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
              <Server className="w-3.5 h-3.5 text-emerald-700" />
              <span>{locale === "bm" ? "Seni Bina Penuh (Averis Cloud + AI)" : "Full System Architecture"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-1">
              {locale === "bm" ? "Rajah Aliran Seni Bina: Supabase, Vercel & Gemini" : "Architecture Diagram: Supabase, Vercel & Gemini"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 font-medium">
              {locale === "bm"
                ? "Aliran data hujung-ke-hujung (end-to-end) menggabungkan pengkomputeran pelayan awan, lapisan cache multi-tier, kueri geospatial, dan penaakulan AI."
                : "End-to-end data pipeline merging serverless cloud computing, multi-tier caching, geospatial queries, and LLM reasoning."}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-8">
            {/* Visual Interactive Architecture Diagram Flow */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
                  <span>Pipeline Ekosistem Realtime</span>
                </span>
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Latency: &lt; 2.5s (Cached: ~120ms)
                </span>
              </div>

              {/* Step Flow Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Node 1: Client & Edge */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/70 px-1.5 py-0.5 rounded">LAYER 1</span>
                      <Globe className="w-4 h-4 text-stone-400" />
                    </div>
                    <h4 className="font-black text-stone-950 text-sm mt-2">Pelanggan &amp; Vercel Edge</h4>
                    <p className="text-[11px] text-stone-600 font-medium mt-1">
                      Antara muka dwibahasa (BM/EN) dihoskan di Vercel Cloud Serverless dengan global CDN.
                    </p>
                  </div>
                  <div className="text-[10px] font-mono bg-white p-2 rounded-lg border border-stone-200 text-stone-700">
                    Next.js 14 App Router &bull; Fast Refresh
                  </div>
                </div>

                {/* Node 2: Supabase Cloud */}
                <div className="p-4 rounded-2xl bg-emerald-50/50 border-2 border-emerald-600/60 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-emerald-900 bg-emerald-200 px-1.5 py-0.5 rounded">CLOUD TIER</span>
                      <Database className="w-4 h-4 text-emerald-700" />
                    </div>
                    <h4 className="font-black text-emerald-950 text-sm mt-2">Supabase Postgres</h4>
                    <p className="text-[11px] text-emerald-900/80 font-medium mt-1">
                      Pangkalan data awan AWS (ap-southeast-1). Semakan cache penerbangan &amp; destinasi.
                    </p>
                  </div>
                  <div className="text-[10px] font-mono bg-white p-2 rounded-lg border border-emerald-200 text-emerald-950">
                    flight_cache &bull; destinations_cache &bull; searches
                  </div>
                </div>

                {/* Node 3: External APIs */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-blue-800 bg-blue-100 px-1.5 py-0.5 rounded">INGESTION</span>
                      <Cloud className="w-4 h-4 text-stone-400" />
                    </div>
                    <h4 className="font-black text-stone-950 text-sm mt-2">Panggilan Selari API</h4>
                    <p className="text-[11px] text-stone-600 font-medium mt-1">
                      Kueri serentak jika cache miss untuk penerbangan, halal OSM, dan status pasport MY.
                    </p>
                  </div>
                  <div className="text-[10px] font-mono bg-white p-2 rounded-lg border border-stone-200 text-stone-700">
                    Amadeus + Overpass OSM + Passport API
                  </div>
                </div>

                {/* Node 4: Gemini AI Engine */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">AI ENGINE</span>
                      <Cpu className="w-4 h-4 text-amber-700" />
                    </div>
                    <h4 className="font-black text-stone-950 text-sm mt-2">Gemini 1.5 Flash</h4>
                    <p className="text-[11px] text-stone-600 font-medium mt-1">
                      Anggaran kos hotel bilik kongsi, sentimen ulasan halal pelancong, &amp; jadual 4 hari.
                    </p>
                  </div>
                  <div className="text-[10px] font-mono bg-white p-2 rounded-lg border border-stone-200 text-stone-700">
                    Google AI Studio &bull; Low Latency Reasoning
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Architecture Flow Explanation */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-700 space-y-3 font-medium">
              <div className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-800" />
                <span>Aliran Kitaran Hayat Permintaan (Request Lifecycle)</span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 leading-relaxed text-stone-600 pl-1">
                <li>Pengguna memasukkan bajet (RM), tempoh hari (1-14), bilangan pax (1-10), dan lapangan terbang asal di <code>/kalkulator</code>.</li>
                <li>Laluan API <code>POST /api/recommend</code> menyemak jadual cache Supabase Postgres terlebih dahulu bagi mengelakkan pembaziran kuota API.</li>
                <li>Jika berlaku cache miss, sistem menghantar panggilan selari (parallel fetch) ke Amadeus Flight API, Overpass OSM (kueri nod <code>diet:halal=yes</code>), dan Passport-Visa-API.</li>
                <li>Model <strong>Google Gemini 1.5 Flash</strong> mengira unjuran kos hotel bilik kongsi <code>ceil(pax/2)</code>, makanan halal harian, dan menghasilkan itinerari realistik.</li>
                <li>Hasil cadangan 3 destinasi terbaik yang muat dalam had bajet dikembalikan ke pelayar dan sejarah carian direkodkan ke Supabase.</li>
              </ol>
            </div>
          </div>
        </section>


        {/* =========================================================
            5. TECH STACK SECTION (WITH CLOUD + AI BADGES)
        ========================================================= */}
        <section id="tech-stack" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-stone-200/80 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            {/* Averis Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800 text-white text-xs font-bold shadow-xs">
                <Cloud className="w-3.5 h-3.5" />
                <span>Averis Cloud Edition Compliant</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 text-emerald-300 text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Averis AI Edition Compliant</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
              {locale === "bm" ? "Susunan Teknologi (Tech Stack) & Pengesahan Percuma" : "Tech Stack & 100% Free Tier Confirmation"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 font-medium">
              {locale === "bm"
                ? "Direka bentuk untuk ketahanan hackathon: semua komponen beroperasi pada pelan percuma tanpa memerlukan kad kredit."
                : "Engineered for hackathon resilience: all infrastructure runs entirely within verified free tiers with zero credit card requirements."}
            </p>
          </div>

          {/* Tech Stack Table */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-700 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4 sm:px-6">Lapisan (Layer)</th>
                    <th className="py-3.5 px-4 sm:px-6">Teknologi &amp; Model</th>
                    <th className="py-3.5 px-4 sm:px-6">Had Pelan Percuma</th>
                    <th className="py-3.5 px-4 sm:px-6">Peranan Dalam Traversi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-600 font-medium">
                  <tr className="hover:bg-stone-50/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">
                      <span className="flex items-center gap-2">
                        <Database className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Cloud Database &amp; Cache</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-emerald-900">
                      Supabase Postgres (AWS Cloud)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">500MB DB, 1GB Storage, 50k MAU</td>
                    <td className="py-3.5 px-4 sm:px-6">Menyimpan cache penerbangan &amp; destinasi, mengelakkan kueri berulang</td>
                  </tr>

                  <tr className="hover:bg-stone-50/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">
                      <span className="flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Artificial Intelligence (AI)</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-emerald-900">
                      Google Gemini 1.5 Flash
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">15 RPM, 1,500 Permintaan Sehari (RPD)</td>
                    <td className="py-3.5 px-4 sm:px-6">Anggaran kos dinamik, justifikasi poket, itinerari, &amp; sentimen halal</td>
                  </tr>

                  <tr className="hover:bg-stone-50/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">
                      <span className="flex items-center gap-2">
                        <Server className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Frontend &amp; Hosting</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-emerald-900">
                      Next.js 14 App Router on Vercel
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">100GB Bandwidth, Edge Functions</td>
                    <td className="py-3.5 px-4 sm:px-6">Rendering pelayan pantas, Fast Refresh, &amp; seni bina API modular</td>
                  </tr>

                  <tr className="hover:bg-stone-50/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">
                      <span className="flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Halal Geospatial</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-emerald-900">
                      Overpass API (OpenStreetMap)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">10,000 Panggilan Sehari (Free OSS)</td>
                    <td className="py-3.5 px-4 sm:px-6">Kueri nod nod spatial diet:halal=yes sebenar tanpa hardcode statik</td>
                  </tr>

                  <tr className="hover:bg-stone-50/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">
                      <span className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Visa Intelligence</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-emerald-900">
                      Passport-Visa-API + REST Countries
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">Akses Terbuka Tanpa Had</td>
                    <td className="py-3.5 px-4 sm:px-6">Semakan hak akses pasport Malaysia (180+ negara bebas visa)</td>
                  </tr>

                  <tr className="hover:bg-stone-50/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">
                      <span className="flex items-center gap-2">
                        <Compass className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Harga Penerbangan</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-emerald-900">
                      Amadeus Flight API (Test Env)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">2,000 Panggilan Sebulan</td>
                    <td className="py-3.5 px-4 sm:px-6">Data tambang pergi-balik pasaran (disimpan 24 jam dalam flight_cache)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>


        {/* =========================================================
            6. IMPLEMENTATION DETAILS & REVERSE-BUDGETING FORMULA
        ========================================================= */}
        <section id="pelaksanaan" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-stone-200/80 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {locale === "bm" ? "Butiran Pelaksanaan Teknikal" : "Technical Implementation Details"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-3">
              {locale === "bm" ? "Formula Matematik & Logik Terbalik" : "Reverse Budgeting Mathematical Logic"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 font-medium">
              {locale === "bm"
                ? "Bagaimana enjin Traversi menukar had perbelanjaan kasar kepada pengiraan tepat kos hidup di destinasi."
                : "How Traversi mathematically transforms a top-level spending ceiling into precise on-the-ground travel costs."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 4D Formula Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-bold text-lg text-stone-950 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-800" />
                <span>{locale === "bm" ? "Formula Matematik 4 Dimensi" : "4D Mathematical Formula"}</span>
              </h3>
              <div className="p-4 rounded-xl bg-stone-50 font-mono text-xs text-stone-800 border border-stone-200 space-y-1.5">
                <p className="text-emerald-800 font-bold">// Pengiraan Kos Total Kumpulan</p>
                <p>rooms = Math.ceil(pax / 2);</p>
                <p>nights = Math.max(0, days - 1);</p>
                <p className="text-stone-950 font-bold pt-1.5 border-t border-stone-200">
                  total = (flight * pax) + (hotel * rooms * nights) + (food * pax * days) + (transport * rooms * days);
                </p>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Mencerminkan tingkah laku sebenar belia Malaysia: berkongsi bilik hotel berdua (twin-sharing <code>ceil(pax/2)</code>) dan berkongsi tambang kenderaan/Grab secara kumpulan untuk penjimatan maksimum.
              </p>
            </div>

            {/* Value Score Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-bold text-lg text-stone-950 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-800" />
                <span>{locale === "bm" ? "Algoritma Penilaian (Value Score)" : "Value Score Metric"}</span>
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Destinasi dinilai dan disusun secara automatik menggunakan skor nilai seimbang:
              </p>
              <ul className="text-xs text-stone-700 space-y-2 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                  <span><strong>Ketepatan Bajet:</strong> Destinasi yang menggunakan 70% hingga 95% had belanja diberi keutamaan tertinggi bagi mengelakkan pembaziran baki.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                  <span><strong>Pengiraan Halal Overpass:</strong> &ge;100 nod halal diiktiraf sebagai &quot;Mudah&quot; (+15 mata), 20-99 &quot;Sederhana&quot; (+8 mata), &lt;20 &quot;Terhad&quot;.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                  <span><strong>Akses Pasport MY:</strong> Destinasi bebas visa 30-90 hari atau penerbangan domestik MyKad diberi bonus markah kemudahan perjalanan.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>


        {/* =========================================================
            7. CHALLENGES FACED & ENGINEERING DECISIONS
        ========================================================= */}
        <section id="cabaran" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-stone-200/80 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {locale === "bm" ? "Cabaran & Keputusan Kejuruteraan" : "Challenges & Solutions"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-3">
              {locale === "bm" ? "Halangan Teknikal & Penyelesaian Nyata" : "Technical Challenges & Engineering Decisions"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 font-medium">
              {locale === "bm"
                ? "Tiga cabaran kritikal yang dihadapi semasa membangunkan sistem dan bagaimana arkitek kami menyelesaikannya."
                : "Three key architectural hurdles encountered and the engineering choices made to overcome them."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <h3 className="text-base font-bold text-stone-950">1. Had Kuota API Luaran</h3>
              <p className="text-xs text-rose-700 font-bold">Cabaran:</p>
              <p className="text-xs text-stone-600 font-medium leading-relaxed">
                Amadeus Test API menghadkan 2,000 panggilan sebulan, manakala kueri Overpass awam boleh mengalami latensi tinggi semasa demo.
              </p>
              <p className="text-xs text-emerald-800 font-bold pt-1">Penyelesaian Kejuruteraan:</p>
              <p className="text-xs text-stone-600 font-medium leading-relaxed">
                Membina lapisan cache multi-tier dalam Supabase Postgres (<code className="text-emerald-800 font-semibold">destinations_cache</code> &amp; <code className="text-emerald-800 font-semibold">flight_cache</code>) dengan jangka hayat TTL 24 jam.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <h3 className="text-base font-bold text-stone-950">2. Ketepatan Data Halal</h3>
              <p className="text-xs text-rose-700 font-bold">Cabaran:</p>
              <p className="text-xs text-stone-600 font-medium leading-relaxed">
                Banyak platform pelancongan hanya menggunakan senarai statik yang lapuk, tidak mewakili realiti restoran di lokasi.
              </p>
              <p className="text-xs text-emerald-800 font-bold pt-1">Penyelesaian Kejuruteraan:</p>
              <p className="text-xs text-stone-600 font-medium leading-relaxed">
                Menghantar kueri nod spatial <code className="text-emerald-800 font-semibold">node[&quot;diet:halal&quot;=&quot;yes&quot;]</code> terus ke OpenStreetMap dan menyemak silang dengan sentimen ulasan Google via Gemini 1.5 Flash.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <h3 className="text-base font-bold text-stone-950">3. Kekeliruan Visa Belia</h3>
              <p className="text-xs text-rose-700 font-bold">Cabaran:</p>
              <p className="text-xs text-stone-600 font-medium leading-relaxed">
                Belia sering keliru antara visa on arrival, permohonan eVisa awal (K-ETA Korea), dan negara bebas visa sepenuhnya.
              </p>
              <p className="text-xs text-emerald-800 font-bold pt-1">Penyelesaian Kejuruteraan:</p>
              <p className="text-xs text-stone-600 font-medium leading-relaxed">
                Penyepaduan modul semakan pasport automatik yang memaparkan label jelas (contoh: Visa Free 30 Hari, K-ETA, atau MyKad bagi penerbangan domestik).
              </p>
            </div>
          </div>
        </section>


        {/* =========================================================
            8. FUTURE ROADMAP
        ========================================================= */}
        <section id="roadmap" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-stone-200/80 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {locale === "bm" ? "Pelan Hala Tuju Produk" : "Product Roadmap"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-3">
              {locale === "bm" ? "Dari Prototaip Hackathon Ke Ekosistem Komersial" : "From Hackathon Prototype to Commercial Ecosystem"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 font-medium">
              {locale === "bm"
                ? "Langkah perancangan strategik 3 fasa untuk mengembangkan Traversi menjadi aplikasi pengembaraan nombor satu belia."
                : "A 3-phase execution strategy taking Traversi from hackathon MVP into Malaysia's premier youth travel companion."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-emerald-50/70 border-2 border-emerald-600 space-y-3">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-800 text-white text-xs font-bold">
                FASA 1: MVP
              </div>
              <h3 className="font-bold text-base text-stone-950">Averis Hackathon 2026 (18-22 Sept)</h3>
              <ul className="text-xs text-stone-700 space-y-1.5 font-medium">
                <li>&bull; Enjin Reverse-Budgeting fleksibel (RM500-RM10,000)</li>
                <li>&bull; Pecahan 4 dimensi kos per pax &amp; perkongsian bilik</li>
                <li>&bull; Semakan Halal Overpass OSM &amp; Pasport Malaysia</li>
                <li>&bull; Penjanaan jadual 4 hari realistik dengan Gemini AI</li>
                <li>&bull; Lapisan cache Supabase Postgres untuk penjimatan kuota</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <div className="inline-block px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-bold">
                FASA 2: Komuniti
              </div>
              <h3 className="font-bold text-base text-stone-950">Suku Keempat 2026</h3>
              <ul className="text-xs text-stone-700 space-y-1.5 font-medium">
                <li>&bull; Modul submit kos sebenar oleh belia (Crowdsourced validation)</li>
                <li>&bull; Log masuk Supabase Auth (Google OAuth) rasmi</li>
                <li>&bull; Eksport jadual harian dan kiraan kos terus ke WhatsApp &amp; PDF</li>
                <li>&bull; Ciri perbandingan multi-destinasi bersebelahan (Side-by-side)</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <div className="inline-block px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-bold">
                FASA 3: Ekosistem
              </div>
              <h3 className="font-bold text-base text-stone-950">Tahun 2027</h3>
              <ul className="text-xs text-stone-700 space-y-1.5 font-medium">
                <li>&bull; Pautan affiliate rasmi AirAsia, Skyscanner, &amp; Agoda</li>
                <li>&bull; Aplikasi Web Progresif (PWA) mod luar talian (offline mode)</li>
                <li>&bull; Integrasi e-dompet belia tempatan (Touch &apos;n Go eWallet)</li>
                <li>&bull; Pemantauan amaran tambang murah automatik via emel</li>
              </ul>
            </div>
          </div>
        </section>


        {/* =========================================================
            9. TEAM (4 ORANG)
        ========================================================= */}
        <section id="pasukan" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-stone-200/80 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {locale === "bm" ? "Pasukan Pembangun" : "Development Team"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-3">
              {locale === "bm" ? "Pasukan 4 Orang Traversi" : "Traversi 4-Member Team"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 font-medium">
              {locale === "bm"
                ? "Gabungan kepakaran kejuruteraan perisian, seni bina awan, penyelidikan model AI, dan integrasi API luaran."
                : "Multidisciplinary team spanning full-stack software engineering, cloud architectures, AI systems, and API integration."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. Amir Hakim */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm text-center space-y-3 hover:border-emerald-300 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-emerald-800 text-white font-black text-lg flex items-center justify-center mx-auto shadow-md">
                AH
              </div>
              <div>
                <h3 className="font-bold text-stone-950 text-base">Amir Hakim</h3>
                <p className="text-xs font-bold text-emerald-800 mt-0.5">Team Lead &amp; Full-Stack</p>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Seni bina Next.js 14 App Router, enjin reverse-budgeting, rekaan UI anti-slop, dan koordinasi projek.
              </p>
            </div>

            {/* 2. Moi */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm text-center space-y-3 hover:border-emerald-300 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-stone-100 text-stone-800 font-black text-lg flex items-center justify-center mx-auto border border-stone-200">
                M
              </div>
              <div>
                <h3 className="font-bold text-stone-950 text-base">Moi</h3>
                <p className="text-xs font-bold text-emerald-800 mt-0.5">Cloud &amp; Database</p>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Skema Supabase Cloud Postgres, lapisan cache multi-tier (flight &amp; destinations), dan keselamatan data.
              </p>
            </div>

            {/* 3. Eqhlas */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm text-center space-y-3 hover:border-emerald-300 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-stone-100 text-stone-800 font-black text-lg flex items-center justify-center mx-auto border border-stone-200">
                E
              </div>
              <div>
                <h3 className="font-bold text-stone-950 text-base">Eqhlas</h3>
                <p className="text-xs font-bold text-emerald-800 mt-0.5">AI &amp; LLM Engineer</p>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Prompt engineering Google Gemini 1.5 Flash, anggaran kos makanan/hotel, dan penjanaan jadual 4 hari.
              </p>
            </div>

            {/* 4. Paan */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm text-center space-y-3 hover:border-emerald-300 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-stone-100 text-stone-800 font-black text-lg flex items-center justify-center mx-auto border border-stone-200">
                P
              </div>
              <div>
                <h3 className="font-bold text-stone-950 text-base">Paan</h3>
                <p className="text-xs font-bold text-emerald-800 mt-0.5">External APIs</p>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Penyepaduan Amadeus Flight API, Overpass OSM geospatial halal queries, Passport-Visa-API, dan pertukaran mata wang.
              </p>
            </div>
          </div>
        </section>


        {/* =========================================================
            10. FINAL CTA: KALKULATOR + GITHUB + LIVE DEMO
        ========================================================= */}
        <section id="cta" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center border-t border-stone-200/80 scroll-mt-20">
          <div className="p-8 sm:p-12 rounded-3xl bg-emerald-50/80 border border-emerald-200 shadow-sm space-y-6">
            {/* Live Demo Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-emerald-300 text-xs font-bold text-emerald-900 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
              <span>Live Demo Beroperasi (Averis Hackathon 2026)</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight">
              {locale === "bm" ? "Bersedia Merancang Trip Mengikut Bajet Anda?" : "Ready to Plan a Trip Within Your Budget?"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto font-medium leading-relaxed">
              {locale === "bm"
                ? "Masukkan had bajet poket anda dan biarkan Traversi carikan destinasi yang benar-benar muat tanpa sebarang teka-teki."
                : "Enter your spending limit and let Traversi compute destinations that genuinely fit return airfare, rooms, meals, and visas."}
            </p>

            {/* Action Buttons: Calculator, GitHub, Live Demo */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              {/* Primary: Calculator */}
              <Link
                href="/kalkulator"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-900/15 transition-all cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>{locale === "bm" ? "Buka Kalkulator Bajet" : "Open Budget Calculator"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Secondary: GitHub Repo */}
              <a
                href="https://github.com/cs-mirakim/traversi"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-stone-100 text-stone-800 font-bold text-sm flex items-center justify-center gap-2 border border-stone-200 shadow-2xs transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              </a>

              {/* Tertiary: Live Demo Anchor */}
              <a
                href="/kalkulator"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emerald-100/70 hover:bg-emerald-100 text-emerald-950 font-bold text-sm flex items-center justify-center gap-2 border border-emerald-200 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>Live Demo</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-stone-200 bg-white py-10 px-4 sm:px-6 text-center text-xs text-stone-500 md:pl-72">
        <div className="max-w-5xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 font-bold text-stone-900">
            <Compass className="w-4 h-4 text-emerald-800" />
            <span>Traversi &bull; {locale === "bm" ? "Travel Versi Anda" : "Your Trip, Your Version"}</span>
          </div>
          <p className="text-stone-500 max-w-md mx-auto">
            Dibina sempena <strong>Averis Hackathon 2026</strong> (Cloud + AI Edition). 
          </p>
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-emerald-800">
            <a href="https://github.com/cs-mirakim/traversi" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <span>&bull;</span>
            <Link href="/kalkulator" className="hover:underline">
              Kalkulator Bajet
            </Link>
            <span>&bull;</span>
            <a href="#architecture" className="hover:underline">
              Seni Bina Supabase &amp; Gemini
            </a>
          </div>
          <div className="pt-2 text-[11px] text-stone-400 border-t border-stone-100">
            Pasukan 4 Orang: <strong>Amir Hakim</strong> &bull; <strong>Moi</strong> &bull; <strong>Eqhlas</strong> &bull; <strong>Paan</strong>
          </div>
        </div>
      </footer>
    </div>
  );
}
