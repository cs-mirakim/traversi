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
  Radio,
  PlayCircle,
  Clock,
  Award
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
        {/* =========================================================================
            HERO PITCH: REVERSE-BUDGETING VALUE PROPOSITION
        ========================================================================= */}
        <section id="overview" className="relative pt-12 pb-18 px-4 sm:px-6 max-w-5xl mx-auto text-center min-h-[calc(100vh-4rem)] flex flex-col justify-center scroll-mt-16">
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
          <p className="text-base sm:text-lg text-stone-600 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            {locale === "bm"
              ? "Enjin carian bajet terbalik (Reverse-Budgeting) pertama Malaysia: masukkan had bajet wang poket anda, Traversi mengira destinasi yang muat kos tiket penerbangan, bilik kongsi berdua, makanan halal, dan pasport."
              : "Malaysia's first reverse-budgeting travel recommendation engine: specify your spending ceiling, and our intelligent engine computes destinations that genuinely fit return flights, twin-sharing rooms, daily halal dining, and visa privileges."}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
            <Link
              href="/kalkulator"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-900/15 transition-all cursor-pointer"
            >
              <Calculator className="w-5 h-5" />
              <span>{locale === "bm" ? "Kira Bajet Saya Sekarang" : "Calculate My Budget Now"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
              <div className="flex items-center gap-2 font-bold text-stone-900 text-sm mb-1">
                <Check className="w-4 h-4 text-emerald-700 shrink-0 stroke-[2.5]" />
                <span>{locale === "bm" ? "100% Kos Telus" : "100% Transparent Costs"}</span>
              </div>
              <p className="text-xs text-stone-600 font-medium leading-relaxed">
                {locale === "bm" 
                  ? "Pecahan 4 dimensi: penerbangan, bilik hotel kongsi berdua ceil(pax/2), makan harian, dan Grab."
                  : "4D breakdown: airfare, twin-sharing hotel rooms ceil(pax/2), daily dining, and local transit."}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
              <div className="flex items-center gap-2 font-bold text-stone-900 text-sm mb-1">
                <UtensilsCrossed className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{locale === "bm" ? "Kueri Geospatial Halal" : "Geospatial Halal Audit"}</span>
              </div>
              <p className="text-xs text-stone-600 font-medium leading-relaxed">
                {locale === "bm"
                  ? "Kueri langsung OpenStreetMap Overpass API bagi nod diet:halal tanpa senarai statik."
                  : "Live OpenStreetMap Overpass API queries of diet:halal food nodes with zero hardcoding."}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
              <div className="flex items-center gap-2 font-bold text-stone-900 text-sm mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{locale === "bm" ? "Pasport Malaysia (MY)" : "Malaysian Passport (MY)"}</span>
              </div>
              <p className="text-xs text-stone-600 font-medium leading-relaxed">
                {locale === "bm"
                  ? "Semakan automatik peraturan bebas visa 180+ negara dan penerbangan domestik MyKad."
                  : "Automated visa exemption duration checking for 180+ countries and domestic MyKad flights."}
              </p>
            </div>
          </div>
        </section>


        {/* =========================================================================
            01. PROBLEM STATEMENT (Averis Guidelines: The Problem)
        ========================================================================= */}
        <section id="problem-statement" className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-14 px-4 sm:px-6 max-w-5xl mx-auto border-t border-stone-200/80 scroll-mt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {locale === "bm" ? "01 • Penyataan Masalah" : "01 • Problem Statement"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-3">
              {locale === "bm" ? "Mengapa 70% Belia Terlebih Belanja Semasa Melancong?" : "Why Do 70% of Youth Overspend While Traveling?"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 font-medium">
              {locale === "bm" 
                ? "Kajian perbelanjaan mendapati belia dan pelajar Malaysia terjerat dengan maklumat industri yang pecah-belah."
                : "Studies show Malaysian youth and student travelers overspend due to fragmented booking platforms."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-stone-950">
                {locale === "bm" ? "1. Tiket Promosi Cuma Separuh Cerita" : "1. Cheap Airfare Trap"}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {locale === "bm"
                  ? "Beli tiket promosi RM280, tapi bila tiba di destinasi, kos bilik hotel, makanan harian, dan Grab mencecah RM2,000 tanpa disedari."
                  : "You snag a RM280 promo flight, but ground expenses for hotel rooms, daily dining, and local rides silently surge to RM2,000."}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-stone-950">
                {locale === "bm" ? "2. Tiada Enjin Carian Bajet Terbalik" : "2. No Reverse Budget Search"}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {locale === "bm"
                  ? "Skyscanner dan Google Flights paksa pilih bandar dahulu. Belia yang ada bajet RM1,500 tidak tahu ke mana sebenarnya duit mereka muat."
                  : "Traditional engines force you to specify a city first. Travelers who only know they have RM1,500 have no idea where that money actually lasts."}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-stone-950">
                {locale === "bm" ? "3. Terpaksa Buka 4 Aplikasi Berasingan" : "3. Juggling 4 Fragmented Apps"}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {locale === "bm"
                  ? "Satu aplikasi semak tiket, satu cari hotel, satu Google syarat visa pasport Malaysia, dan satu lagi mencari kedai makan halal."
                  : "One app for airfare, another for rooms, a search tab checking Malaysian visa policies, and another hunting for verified halal dining."}
              </p>
            </div>
          </div>
        </section>


        {/* =========================================================================
            02. THREE CORE PILLARS
        ========================================================================= */}
        <section id="core-pillars" className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-14 px-4 sm:px-6 max-w-5xl mx-auto border-t border-stone-200/80 scroll-mt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {locale === "bm" ? "02 • Tiga Tonggak Utama" : "02 • Three Core Pillars"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-3">
              {locale === "bm" ? "Dicipta Khas Mengikut Keperluan Pengembara Malaysia" : "Engineered Specifically for Malaysian Youth"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-950">
                {locale === "bm" ? "1. Kiraan Kos Penuh 4 Dimensi" : "1. Realistic 4D Cost Breakdown"}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {locale === "bm"
                  ? "Formula mengira tiket pergi-balik per pax, bilik hotel kongsi berdua ceil(pax/2), makan harian, dan tambang kenderaan tempatan."
                  : "Computes return airfare, twin-sharing hotel rooms ceil(pax/2), daily meals, and rideshare transport."}
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-950">
                {locale === "bm" ? "2. Halal Overpass & Pasport MY" : "2. Live Halal & Visa Checks"}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {locale === "bm"
                  ? "Kueri nod OpenStreetMap sebenar bagi diet:halal dan semakan syarat pasport Malaysia tanpa sebarang data lapuk."
                  : "Live OpenStreetMap Overpass queries for diet:halal nodes paired with Malaysian passport visa datasets."}
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-950">
                {locale === "bm" ? "3. Jadual 4 Hari Realistik" : "3. Authentic 4-Day Itineraries"}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {locale === "bm"
                  ? "Jadual perjalanan praktikal bersama senarai port makan halal berkadar tinggi yang sepadan dengan baki wang saku sebenar."
                  : "Balanced day-by-day itineraries featuring high-rated halal spots matched against your remaining spending money."}
              </p>
            </div>
          </div>
        </section>


        {/* =========================================================================
            03. MARKET BENCHMARK (COMPARISON TABLE)
        ========================================================================= */}
        <section id="market-benchmark" className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-14 px-4 sm:px-6 max-w-6xl mx-auto border-t border-stone-200/80 scroll-mt-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {locale === "bm" ? "03 • Penanda Aras Pasaran" : "03 • Market Benchmark"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-3">
              {locale === "bm" ? "Perbandingan Traversi vs Platform Komersial Global" : "Traversi vs Global Commercial Travel Platforms"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 font-medium">
              {locale === "bm" 
                ? "Lihat bagaimana Traversi menyelesaikan titik buta (blindspot) enjin carian tiket komersial sedia ada."
                : "Discover how Traversi resolves the blindspots of standard flight booking engines."}
            </p>
          </div>

          <ComparisonTable />
        </section>


        {/* =========================================================================
            04. TECHNICAL ARCHITECTURE (Averis Guidelines: Cloud + AI Requirement)
        ========================================================================= */}
        <section id="technical-architecture" className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-14 px-4 sm:px-6 max-w-5xl mx-auto border-t border-stone-200/80 scroll-mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {locale === "bm" ? "04 • Seni Bina Teknikal" : "04 • Technical Architecture"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-3">
              {locale === "bm" ? "Integrasi Penuh: Supabase Cloud, Vercel & Google Gemini" : "Full Integration: Supabase Cloud, Vercel & Google Gemini"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 font-medium">
              {locale === "bm"
                ? "Aliran data hujung-ke-hujung menggabungkan pengkomputeran pelayan awan, lapisan cache multi-tier, kueri geospatial, dan penaakulan AI."
                : "End-to-end data pipeline merging serverless cloud computing, multi-tier caching, geospatial queries, and LLM reasoning."}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-8">
            {/* Interactive Architecture Flow Diagram */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
                  <span>{locale === "bm" ? "Aliran Pemprosesan Realtime" : "Realtime Data Pipeline"}</span>
                </span>
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-bold">
                  {locale === "bm" ? "Latensi: < 2.5s (Cached: ~120ms)" : "Latency: < 2.5s (Cached: ~120ms)"}
                </span>
              </div>

              {/* 4 Pipeline Step Nodes */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Node 1 */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/70 px-1.5 py-0.5 rounded">LAYER 1</span>
                      <Globe className="w-4 h-4 text-stone-400" />
                    </div>
                    <h4 className="font-black text-stone-950 text-sm mt-2">
                      {locale === "bm" ? "Pelanggan & Vercel Edge" : "Client & Vercel Edge"}
                    </h4>
                    <p className="text-[11px] text-stone-600 font-medium mt-1 leading-relaxed">
                      {locale === "bm"
                        ? "Antara muka dwibahasa (BM/EN) dihoskan di Vercel Cloud Serverless dengan CDN global."
                        : "Bilingual UI (BM/EN) hosted on Vercel Cloud Serverless with global Edge CDN."}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono bg-white p-2 rounded-lg border border-stone-200 text-stone-700">
                    Next.js 14 App Router &bull; Fast Refresh
                  </div>
                </div>

                {/* Node 2 - Balanced harmonious styling with other nodes */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">CLOUD TIER</span>
                      <Database className="w-4 h-4 text-emerald-700" />
                    </div>
                    <h4 className="font-black text-stone-950 text-sm mt-2">
                      {locale === "bm" ? "Supabase Postgres" : "Supabase Cloud Postgres"}
                    </h4>
                    <p className="text-[11px] text-stone-600 font-medium mt-1 leading-relaxed">
                      {locale === "bm"
                        ? "Pangkalan data awan AWS (ap-southeast-1). Semakan cache penerbangan & destinasi."
                        : "Managed AWS Postgres (ap-southeast-1). Flight & destination caching layer."}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono bg-white p-2 rounded-lg border border-stone-200 text-stone-700">
                    flight_cache &bull; destinations_cache &bull; searches
                  </div>
                </div>

                {/* Node 3 */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-blue-800 bg-blue-100 px-1.5 py-0.5 rounded">INGESTION</span>
                      <Cloud className="w-4 h-4 text-stone-400" />
                    </div>
                    <h4 className="font-black text-stone-950 text-sm mt-2">
                      {locale === "bm" ? "Panggilan Selari API" : "Parallel Ingestion APIs"}
                    </h4>
                    <p className="text-[11px] text-stone-600 font-medium mt-1 leading-relaxed">
                      {locale === "bm"
                        ? "Kueri serentak jika cache miss untuk penerbangan, halal OSM, dan status pasport MY."
                        : "Parallel fetch on cache miss: airfares, OSM halal nodes, and MY passport rules."}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono bg-white p-2 rounded-lg border border-stone-200 text-stone-700">
                    Amadeus + Overpass OSM + Passport API
                  </div>
                </div>

                {/* Node 4 */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">AI ENGINE</span>
                      <Cpu className="w-4 h-4 text-amber-700" />
                    </div>
                    <h4 className="font-black text-stone-950 text-sm mt-2">
                      {locale === "bm" ? "Google Gemini 1.5" : "Google Gemini 1.5 Flash"}
                    </h4>
                    <p className="text-[11px] text-stone-600 font-medium mt-1 leading-relaxed">
                      {locale === "bm"
                        ? "Anggaran kos hotel bilik kongsi, sentimen ulasan halal pelancong, & jadual 4 hari."
                        : "Dynamic twin-share room modeling, halal reviews sentiment, & 4-day itineraries."}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono bg-white p-2 rounded-lg border border-stone-200 text-stone-700">
                    Google AI Studio &bull; Low Latency Reasoning
                  </div>
                </div>
              </div>
            </div>

            {/* Request Lifecycle Steps */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-700 space-y-3 font-medium">
              <div className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-800" />
                <span>{locale === "bm" ? "Aliran Kitaran Hayat Permintaan (Request Lifecycle)" : "End-to-End Request Lifecycle"}</span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 leading-relaxed text-stone-600 pl-1">
                {locale === "bm" ? (
                  <>
                    <li>Pengguna memasukkan had bajet (RM), tempoh (1–14 hari), bilangan pax (1–10), dan lapangan terbang asal di <code>/kalkulator</code>.</li>
                    <li>Laluan API <code>POST /api/recommend</code> menyemak jadual cache Supabase Postgres terlebih dahulu bagi mengelakkan pembaziran kuota API.</li>
                    <li>Sekiranya berlaku cache miss, sistem menghantar panggilan selari ke Amadeus Flight API, Overpass OSM (nod <code>diet:halal=yes</code>), dan Passport-Visa-API.</li>
                    <li>Model <strong>Google Gemini 1.5 Flash</strong> mengira unjuran kos hotel bilik kongsi <code>ceil(pax/2)</code>, makanan halal harian, dan menghasilkan itinerari realistik.</li>
                    <li>Hasil cadangan 3 destinasi terbaik yang muat dalam had bajet dipaparkan bersama pecahan kos 4 dimensi dan disimpan ke jadual sejarah Supabase.</li>
                  </>
                ) : (
                  <>
                    <li>The traveler inputs their spending ceiling (RM), duration (1–14 days), party size (1–10 pax), and origin airport at <code>/kalkulator</code>.</li>
                    <li>The API route <code>POST /api/recommend</code> inspects the Supabase Postgres cache layer first to conserve upstream API quotas.</li>
                    <li>On a cache miss, parallel async requests query the Amadeus Flight API, Overpass OSM (geospatial <code>diet:halal=yes</code>), and Passport-Visa-API.</li>
                    <li><strong>Google Gemini 1.5 Flash</strong> estimates twin-share room costs <code>ceil(pax/2)</code>, daily halal meals, and synthesizes 4-day realistic itineraries.</li>
                    <li>The top 3 optimal destinations fitting within budget are delivered with transparent 4D cost breakdowns and logged to Supabase.</li>
                  </>
                )}
              </ol>
            </div>
          </div>
        </section>


        {/* =========================================================================
            05. TECHNICAL STACK (Averis Guidelines: Tech Stack Section)
        ========================================================================= */}
        <section id="tech-stack" className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-14 px-4 sm:px-6 max-w-5xl mx-auto border-t border-stone-200/80 scroll-mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {locale === "bm" ? "05 • Susunan Teknologi & Audit" : "05 • Technical Stack & Audit"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-3">
              {locale === "bm" ? "Susunan Teknologi & Pengesahan 100% Bebas Kos" : "Technical Stack & 100% Free-Tier Audit"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 font-medium">
              {locale === "bm"
                ? "Semua komponen beroperasi sepenuhnya pada pelan percuma tanpa memerlukan kad kredit mengikut garis panduan Averis Cloud & AI Edition."
                : "All infrastructure runs strictly within verified free tiers with zero credit card dependencies per Averis Cloud & AI guidelines."}
            </p>
          </div>

          {/* Tech Stack Table */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-700 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4 sm:px-6">{locale === "bm" ? "Lapisan (Layer)" : "Layer"}</th>
                    <th className="py-3.5 px-4 sm:px-6">{locale === "bm" ? "Teknologi & Model" : "Technology & Model"}</th>
                    <th className="py-3.5 px-4 sm:px-6">{locale === "bm" ? "Had Pelan Percuma" : "Free-Tier Limit"}</th>
                    <th className="py-3.5 px-4 sm:px-6">{locale === "bm" ? "Peranan Dalam Traversi" : "Role in Traversi"}</th>
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
                    <td className="py-3.5 px-4 sm:px-6">
                      {locale === "bm"
                        ? "Menyimpan cache penerbangan & destinasi, mengelakkan kueri berulang"
                        : "Stores flight & destination cache, prevents redundant external API hits"}
                    </td>
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
                    <td className="py-3.5 px-4 sm:px-6">15 RPM, 1,500 RPD (Google AI Studio)</td>
                    <td className="py-3.5 px-4 sm:px-6">
                      {locale === "bm"
                        ? "Anggaran kos dinamik, justifikasi poket, itinerari, & sentimen halal"
                        : "Dynamic cost estimation, budget rationale, itineraries & halal review sentiment"}
                    </td>
                  </tr>

                  <tr className="hover:bg-stone-50/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">
                      <span className="flex items-center gap-2">
                        <Server className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Frontend &amp; Edge Hosting</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-emerald-900">
                      Next.js 14 App Router on Vercel
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">100GB Bandwidth, Edge Functions</td>
                    <td className="py-3.5 px-4 sm:px-6">
                      {locale === "bm"
                        ? "Rendering pelayan pantas, Fast Refresh, & seni bina API modular"
                        : "Server-side rendering, Fast Refresh, & modular cloud API routing"}
                    </td>
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
                    <td className="py-3.5 px-4 sm:px-6">
                      {locale === "bm" ? "10,000 Panggilan Sehari (Free OSS)" : "10,000 Requests/Day (Free OSS)"}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      {locale === "bm"
                        ? "Kueri nod spatial diet:halal=yes sebenar tanpa hardcode statik"
                        : "Live spatial query of diet:halal=yes nodes without static hardcoding"}
                    </td>
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
                    <td className="py-3.5 px-4 sm:px-6">
                      {locale === "bm" ? "Akses Terbuka Tanpa Had" : "Unlimited Open Access"}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      {locale === "bm"
                        ? "Semakan hak akses pasport Malaysia (180+ negara bebas visa)"
                        : "Malaysian passport privilege checking (180+ visa-exempt nations)"}
                    </td>
                  </tr>

                  <tr className="hover:bg-stone-50/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-stone-900">
                      <span className="flex items-center gap-2">
                        <Compass className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Flight Pricing</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-emerald-900">
                      Amadeus Flight API (Test Env)
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      {locale === "bm" ? "2,000 Panggilan Sebulan" : "2,000 Requests/Month"}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      {locale === "bm"
                        ? "Data tambang pergi-balik pasaran (disimpan 24 jam dalam flight_cache)"
                        : "Real market return airfare data (cached 24h in flight_cache)"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>


        {/* =========================================================================
            06. IMPLEMENTATION DETAILS & MATHEMATICAL MODEL
        ========================================================================= */}
        <section id="implementation-details" className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-14 px-4 sm:px-6 max-w-5xl mx-auto border-t border-stone-200/80 scroll-mt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {locale === "bm" ? "06 • Butiran Pelaksanaan" : "06 • Implementation Details"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-3">
              {locale === "bm" ? "Formula Matematik 4 Dimensi & Logik Terbalik" : "4D Reverse-Budgeting Mathematical Model"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 font-medium">
              {locale === "bm"
                ? "Bagaimana enjin Traversi menukar had perbelanjaan kasar kepada pecahan realistik kos hidup di destinasi."
                : "How Traversi mathematically transforms a top-level spending ceiling into precise on-the-ground travel costs."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 4D Formula Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-bold text-lg text-stone-950 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-800" />
                <span>{locale === "bm" ? "Formula Pengiraan Kos Total" : "Total Cost Calculation Formula"}</span>
              </h3>
              <div className="p-4 rounded-xl bg-stone-50 font-mono text-xs text-stone-800 border border-stone-200 space-y-1.5">
                <p className="text-emerald-800 font-bold">// {locale === "bm" ? "Logik Kongsi Bilik & Kenderaan" : "Twin-Sharing & Rideshare Logic"}</p>
                <p>rooms = Math.ceil(pax / 2);</p>
                <p>nights = Math.max(0, days - 1);</p>
                <p className="text-stone-950 font-bold pt-1.5 border-t border-stone-200">
                  total = (flight * pax) + (hotel * rooms * nights) + (food * pax * days) + (transport * rooms * days);
                </p>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {locale === "bm"
                  ? "Mencerminkan tingkah laku sebenar belia Malaysia: berkongsi bilik hotel berdua (twin-sharing ceil(pax/2)) dan berkongsi tambang kenderaan/Grab secara kumpulan untuk penjimatan maksimum."
                  : "Reflects real Malaysian travel dynamics: sharing twin rooms ceil(pax/2) and splitting rideshare fares across the group for maximum economy."}
              </p>
            </div>

            {/* Value Score Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-bold text-lg text-stone-950 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-800" />
                <span>{locale === "bm" ? "Algoritma Penilaian (Value Score)" : "Value Score Metric"}</span>
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {locale === "bm"
                  ? "Destinasi dinilai dan disusun secara automatik menggunakan skor nilai seimbang:"
                  : "Destinations are ranked automatically by a multi-factor value scoring algorithm:"}
              </p>
              <ul className="text-xs text-stone-700 space-y-2 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                  <span>
                    <strong>{locale === "bm" ? "Ketepatan Bajet: " : "Budget Sweet-Spot: "}</strong>
                    {locale === "bm"
                      ? "Destinasi yang menggunakan 70% hingga 95% had belanja diberi keutamaan tertinggi bagi mengelakkan pembaziran baki."
                      : "Destinations utilizing 70% to 95% of available funds receive top priority to prevent idle leftover cash."}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                  <span>
                    <strong>{locale === "bm" ? "Skor Halal Overpass: " : "Halal Overpass Score: "}</strong>
                    {locale === "bm"
                      ? "≥100 nod halal diiktiraf sebagai \"Mudah\" (+15 mata), 20-99 \"Sederhana\" (+8 mata), <20 \"Terhad\"."
                      : "≥100 halal nodes scored as \"Easy\" (+15 pts), 20–99 \"Moderate\" (+8 pts), <20 \"Restricted\"."}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                  <span>
                    <strong>{locale === "bm" ? "Akses Pasport MY: " : "MY Passport Access: "}</strong>
                    {locale === "bm"
                      ? "Destinasi bebas visa 30-90 hari atau penerbangan domestik MyKad diberi bonus markah kemudahan perjalanan."
                      : "Visa-exempt destinations (30–90 days) and domestic MyKad flights earn travel convenience bonuses."}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>


        {/* =========================================================================
            07. CHALLENGES FACED (Averis Guidelines: Challenges Faced)
        ========================================================================= */}
        <section id="challenges-faced" className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-14 px-4 sm:px-6 max-w-5xl mx-auto border-t border-stone-200/80 scroll-mt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {locale === "bm" ? "07 • Cabaran Dihadapi" : "07 • Challenges Faced"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-3">
              {locale === "bm" ? "Halangan Kejuruteraan & Keputusan Seni Bina" : "Technical Challenges & Engineering Decisions"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 font-medium">
              {locale === "bm"
                ? "Tiga cabaran kritikal yang dihadapi semasa pembinaan prototaip dan bagaimana arkitek kami menyelesaikannya."
                : "Three key architectural hurdles encountered and the engineering choices made to overcome them."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <h3 className="text-base font-bold text-stone-950">
                {locale === "bm" ? "1. Had Kuota API Luaran" : "1. Upstream API Quota Limits"}
              </h3>
              <p className="text-xs text-rose-700 font-bold">{locale === "bm" ? "Cabaran:" : "Challenge:"}</p>
              <p className="text-xs text-stone-600 font-medium leading-relaxed">
                {locale === "bm"
                  ? "Amadeus Test API menghadkan 2,000 panggilan sebulan, manakala kueri Overpass awam boleh mengalami latensi tinggi semasa demo."
                  : "Amadeus Test limits developers to 2,000 requests/month, while public Overpass OSM queries can experience demo latency."}
              </p>
              <p className="text-xs text-emerald-800 font-bold pt-1">{locale === "bm" ? "Penyelesaian Kejuruteraan:" : "Engineering Solution:"}</p>
              <p className="text-xs text-stone-600 font-medium leading-relaxed">
                {locale === "bm"
                  ? "Membina lapisan cache multi-tier dalam Supabase Postgres (destinations_cache & flight_cache) dengan jangka hayat TTL 24 jam."
                  : "Engineered multi-tier caching in Supabase Postgres (destinations_cache & flight_cache) with 24h TTL."}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <h3 className="text-base font-bold text-stone-950">
                {locale === "bm" ? "2. Ketepatan Data Halal" : "2. Real Halal Authenticity"}
              </h3>
              <p className="text-xs text-rose-700 font-bold">{locale === "bm" ? "Cabaran:" : "Challenge:"}</p>
              <p className="text-xs text-stone-600 font-medium leading-relaxed">
                {locale === "bm"
                  ? "Banyak platform pelancongan hanya menggunakan senarai statik yang lapuk, tidak mewakili realiti restoran di lokasi."
                  : "Most travel platforms rely on static outdated lists that fail to reflect actual dining options on the ground."}
              </p>
              <p className="text-xs text-emerald-800 font-bold pt-1">{locale === "bm" ? "Penyelesaian Kejuruteraan:" : "Engineering Solution:"}</p>
              <p className="text-xs text-stone-600 font-medium leading-relaxed">
                {locale === "bm"
                  ? "Menghantar kueri nod spatial node[\"diet:halal\"=\"yes\"] terus ke OpenStreetMap dan menyemak silang dengan sentimen Google via Gemini AI."
                  : "Executed live node[\"diet:halal\"=\"yes\"] OpenStreetMap spatial queries paired with Gemini review sentiment analysis."}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <h3 className="text-base font-bold text-stone-950">
                {locale === "bm" ? "3. Kekeliruan Visa Belia" : "3. Malaysian Visa Regulations"}
              </h3>
              <p className="text-xs text-rose-700 font-bold">{locale === "bm" ? "Cabaran:" : "Challenge:"}</p>
              <p className="text-xs text-stone-600 font-medium leading-relaxed">
                {locale === "bm"
                  ? "Belia sering keliru antara visa on arrival, permohonan eVisa awal (K-ETA Korea), dan negara bebas visa sepenuhnya."
                  : "Youth frequently confuse visa-on-arrival, pre-entry eVisa (like K-ETA), and true visa-exempt destinations."}
              </p>
              <p className="text-xs text-emerald-800 font-bold pt-1">{locale === "bm" ? "Penyelesaian Kejuruteraan:" : "Engineering Solution:"}</p>
              <p className="text-xs text-stone-600 font-medium leading-relaxed">
                {locale === "bm"
                  ? "Penyepaduan modul semakan pasport automatik yang memaparkan label jelas (contoh: Visa Free 30 Hari, K-ETA, atau MyKad bagi domestik)."
                  : "Integrated automated passport rules returning clear tags (e.g. Visa Free 30 Days, K-ETA, or MyKad for domestic)."}
              </p>
            </div>
          </div>
        </section>


        {/* =========================================================================
            08. FUTURE ROADMAP (Averis Guidelines: Future Roadmap)
        ========================================================= */}
        <section id="future-roadmap" className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-14 px-4 sm:px-6 max-w-5xl mx-auto border-t border-stone-200/80 scroll-mt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {locale === "bm" ? "08 • Pelan Hala Tuju" : "08 • Future Roadmap"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-3">
              {locale === "bm" ? "Dari Prototaip Hackathon Ke Ekosistem Komersial" : "From Hackathon Prototype to Commercial Ecosystem"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 font-medium">
              {locale === "bm"
                ? "Langkah perancangan strategik 3 fasa untuk mengembangkan Traversi menjadi aplikasi pengembaraan nombor satu belia."
                : "A 3-phase execution roadmap scaling Traversi into Malaysia's premier youth travel companion."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-emerald-50/70 border-2 border-emerald-600 space-y-3">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-800 text-white text-xs font-bold">
                {locale === "bm" ? "FASA 1: MVP" : "PHASE 1: MVP"}
              </div>
              <h3 className="font-bold text-base text-stone-950">
                {locale === "bm" ? "Averis x Monash Hackathon 2026" : "Averis x Monash Hackathon 2026"}
              </h3>
              <ul className="text-xs text-stone-700 space-y-1.5 font-medium">
                <li>&bull; {locale === "bm" ? "Enjin Reverse-Budgeting fleksibel (RM500-RM10,000)" : "Flexible reverse-budgeting engine (RM500–RM10,000)"}</li>
                <li>&bull; {locale === "bm" ? "Pecahan 4 dimensi kos per pax & perkongsian bilik" : "4D cost breakdown with twin-sharing room allocation"}</li>
                <li>&bull; {locale === "bm" ? "Semakan Halal Overpass OSM & Pasport Malaysia" : "Live Overpass OSM halal & Malaysian passport rules"}</li>
                <li>&bull; {locale === "bm" ? "Penjanaan jadual 4 hari realistik dengan Gemini AI" : "Curated 4-day realistic itineraries with Gemini AI"}</li>
                <li>&bull; {locale === "bm" ? "Lapisan cache Supabase Postgres untuk penjimatan kuota" : "Supabase Postgres caching layer conserving upstream quotas"}</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <div className="inline-block px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-bold">
                {locale === "bm" ? "FASA 2: Komuniti" : "PHASE 2: Community"}
              </div>
              <h3 className="font-bold text-base text-stone-950">
                {locale === "bm" ? "Suku Keempat 2026" : "Q4 2026 Validation"}
              </h3>
              <ul className="text-xs text-stone-700 space-y-1.5 font-medium">
                <li>&bull; {locale === "bm" ? "Modul submit kos sebenar oleh belia (Crowdsourced validation)" : "Crowdsourced on-ground expense validation by travelers"}</li>
                <li>&bull; {locale === "bm" ? "Log masuk Supabase Auth (Google OAuth) rasmi" : "Production Supabase Auth with Google OAuth"}</li>
                <li>&bull; {locale === "bm" ? "Eksport jadual harian dan kiraan kos terus ke WhatsApp & PDF" : "One-click export of itineraries & budgets to WhatsApp/PDF"}</li>
                <li>&bull; {locale === "bm" ? "Ciri perbandingan multi-destinasi bersebelahan" : "Side-by-side multi-destination budget comparison"}</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-3">
              <div className="inline-block px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-bold">
                {locale === "bm" ? "FASA 3: Ekosistem" : "PHASE 3: Ecosystem"}
              </div>
              <h3 className="font-bold text-base text-stone-950">
                {locale === "bm" ? "Tahun 2027" : "Year 2027 Scale"}
              </h3>
              <ul className="text-xs text-stone-700 space-y-1.5 font-medium">
                <li>&bull; {locale === "bm" ? "Pautan affiliate rasmi AirAsia, Skyscanner, & Agoda" : "Affiliate integration with AirAsia, Skyscanner, & Agoda"}</li>
                <li>&bull; {locale === "bm" ? "Aplikasi Web Progresif (PWA) mod luar talian" : "Progressive Web App (PWA) with offline itinerary mode"}</li>
                <li>&bull; {locale === "bm" ? "Integrasi e-dompet belia tempatan (Touch 'n Go eWallet)" : "Local e-wallet integration (Touch 'n Go eWallet budgeting)"}</li>
                <li>&bull; {locale === "bm" ? "Pemantauan amaran tambang murah automatik via emel" : "Automated fare drop alert notifications via email"}</li>
              </ul>
            </div>
          </div>
        </section>


        {/* =========================================================================
            09. TEAM GOVERNANCE (4-Member Team matching README.md & TASKS.md)
        ========================================================================= */}
        <section id="team-governance" className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-14 px-4 sm:px-6 max-w-5xl mx-auto border-t border-stone-200/80 scroll-mt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {locale === "bm" ? "09 • Pasukan Pembangun" : "09 • Team Governance"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-3">
              {locale === "bm" ? "Pasukan 4 Orang Traversi (Averis x Monash 2026)" : "Traversi 4-Member Team (Averis x Monash 2026)"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 font-medium">
              {locale === "bm"
                ? "Gabungan kepakaran kejuruteraan perisian, seni bina awan, penyelidikan model AI, dan integrasi API luaran."
                : "A multidisciplinary team spanning full-stack engineering, cloud architecture, AI systems, and API integration."}
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
                <p className="text-xs font-bold text-emerald-800 mt-0.5">{locale === "bm" ? "Ketua Pasukan & Full-Stack" : "Team Lead & Full-Stack"}</p>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {locale === "bm"
                  ? "Seni bina Next.js 14 App Router, enjin reverse-budgeting, rekaan UI anti-slop, dan koordinasi projek."
                  : "Next.js 14 architecture, reverse-budgeting logic, clean anti-slop design system, and project direction."}
              </p>
            </div>

            {/* 2. Moi (Amir Azib) */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm text-center space-y-3 hover:border-emerald-300 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-stone-100 text-stone-800 font-black text-lg flex items-center justify-center mx-auto border border-stone-200">
                M
              </div>
              <div>
                <h3 className="font-bold text-stone-950 text-base">Moi (Amir Azib)</h3>
                <p className="text-xs font-bold text-emerald-800 mt-0.5">{locale === "bm" ? "Pakar Awan & Pangkalan Data" : "Cloud & Database Architect"}</p>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {locale === "bm"
                  ? "Skema Supabase Cloud Postgres, lapisan cache multi-tier (flight & destinations), dan keselamatan data."
                  : "Supabase Cloud Postgres schemas, multi-tier caching (flight & destination), and authentication security."}
              </p>
            </div>

            {/* 3. Eqhlas */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm text-center space-y-3 hover:border-emerald-300 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-stone-100 text-stone-800 font-black text-lg flex items-center justify-center mx-auto border border-stone-200">
                E
              </div>
              <div>
                <h3 className="font-bold text-stone-950 text-base">Eqhlas</h3>
                <p className="text-xs font-bold text-emerald-800 mt-0.5">{locale === "bm" ? "Jurutera AI & LLM" : "AI & LLM Engineer"}</p>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {locale === "bm"
                  ? "Prompt engineering Google Gemini 1.5 Flash, anggaran kos makanan/hotel, dan penjanaan jadual 4 hari."
                  : "Google Gemini 1.5 Flash prompt engineering, dynamic cost modeling, and 4-day itinerary generation."}
              </p>
            </div>

            {/* 4. Paan (Daniel Farhan) */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm text-center space-y-3 hover:border-emerald-300 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-stone-100 text-stone-800 font-black text-lg flex items-center justify-center mx-auto border border-stone-200">
                P
              </div>
              <div>
                <h3 className="font-bold text-stone-950 text-base">Paan (Daniel Farhan)</h3>
                <p className="text-xs font-bold text-emerald-800 mt-0.5">{locale === "bm" ? "Penyepaduan API Luaran" : "External APIs & Integration"}</p>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {locale === "bm"
                  ? "Penyepaduan Amadeus Flight API, Overpass OSM geospatial halal queries, Passport-Visa-API, dan pertukaran mata wang."
                  : "Amadeus Flight API integration, Overpass OSM geospatial halal queries, Passport-Visa-API, and FX exchange."}
              </p>
            </div>
          </div>
        </section>


        {/* =========================================================================
            10. LIVE PROTOTYPE & SUBMISSION LINKS (Averis Guidelines: Mandatory Links)
        ========================================================================= */}
        <section id="live-prototype" className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-14 px-4 sm:px-6 max-w-4xl mx-auto text-center border-t border-stone-200/80 scroll-mt-16">
          <div className="p-8 sm:p-12 rounded-3xl bg-emerald-50/80 border border-emerald-200 shadow-sm space-y-6">
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-300 text-xs font-bold text-emerald-900 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
              <span>{locale === "bm" ? "Prototaip Beroperasi Sepenuhnya (Averis Hackathon 2026)" : "Fully Operational Prototype (Averis Hackathon 2026)"}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight">
              {locale === "bm" ? "Bersedia Merancang Trip Mengikut Bajet Anda?" : "Ready to Plan a Trip Within Your Actual Budget?"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto font-medium leading-relaxed">
              {locale === "bm"
                ? "Masukkan had bajet wang poket anda sekarang dan lihat destinasi yang benar-benar muat tanpa sebarang teka-teki."
                : "Enter your spending limit now and let Traversi compute destinations that genuinely fit return airfare, rooms, meals, and visas."}
            </p>

            {/* Action Buttons strictly reflecting Averis Submission Components */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              {/* 1. Working Prototype / Calculator */}
              <Link
                href="/kalkulator"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-900/15 transition-all cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>{locale === "bm" ? "Buka Kalkulator Bajet" : "Launch Budget Calculator"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* 2. GitHub Repo Link */}
              <a
                href="https://github.com/cs-mirakim/traversi"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-stone-50 text-stone-800 font-bold text-sm flex items-center justify-center gap-2 border border-stone-300 shadow-2xs hover:border-stone-400 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              </a>

              {/* 3. Live Prototype Link */}
              <Link
                href="/kalkulator"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-stone-50 text-emerald-950 font-bold text-sm flex items-center justify-center gap-2 border-2 border-emerald-700 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>{locale === "bm" ? "Demo Prototaip Langsung" : "Live Prototype Demo"}</span>
              </Link>
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
            {locale === "bm" 
              ? "Dibina sempena Averis x Monash Hackathon 2026 (Edisi Cloud + AI)."
              : "Built for Averis x Monash Hackathon 2026 (Cloud + AI Edition)."}
          </p>
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-emerald-800">
            <a href="https://github.com/cs-mirakim/traversi" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <span>&bull;</span>
            <Link href="/kalkulator" className="hover:underline">
              {locale === "bm" ? "Kalkulator Bajet" : "Budget Calculator"}
            </Link>
            <span>&bull;</span>
            <a href="#technical-architecture" className="hover:underline">
              {locale === "bm" ? "Seni Bina Supabase & Gemini" : "Supabase & Gemini Architecture"}
            </a>
          </div>
          <div className="pt-2 text-[11px] text-stone-400 border-t border-stone-100">
            {locale === "bm" ? "Pasukan 4 Orang: " : "4-Member Team: "}
            <strong>Amir Hakim</strong> &bull; <strong>Moi (Amir Azib)</strong> &bull; <strong>Eqhlas</strong> &bull; <strong>Paan (Daniel Farhan)</strong>
          </div>
        </div>
      </footer>
    </div>
  );
}
