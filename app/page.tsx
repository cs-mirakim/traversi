"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ComparisonTable from "@/components/ComparisonTable";
import { 
  Calculator, 
  ShieldCheck, 
  UtensilsCrossed, 
  Check, 
  ArrowRight, 
  AlertTriangle,
  Award,
  Database,
  Cpu,
  Cloud,
  Layers,
  MapPin,
  Calendar,
  Compass,
  CheckCircle2,
  Users,
  Code2,
  GitBranch,
  ExternalLink,
  Target
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#022c22] text-[#ecfdf5] font-sans flex flex-col selection:bg-emerald-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* =========================================================
            1. HERO SECTION: PITCH DECK HEADLINE & VALUE PROP
        ========================================================= */}
        <section className="relative pt-16 pb-20 px-4 sm:px-6 max-w-6xl mx-auto text-center">
          {/* Averis Hackathon Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/90 border border-emerald-700 text-emerald-300 text-xs font-bold mb-6 shadow-md">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Averis Hackathon 2026 &bull; 18 – 22 September &bull; Cloud + AI Edition</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight">
            Kau Masuk Bajet RM, <br />
            <span className="text-emerald-400 underline decoration-emerald-500 decoration-wavy decoration-2">
              Traversi Carikan Destinasi Ngam.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-emerald-200/90 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            Sistem perancang kembara pertama untuk belia dan pelajar Malaysia berasaskan <strong>Reverse-Budgeting</strong>: masukkan had wang poket anda, enjin pintar menentukan destinasi mana yang lepas bajet siap pecahan 4 dimensi kos, semakan status pasport Malaysia, dan skor halal.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link
              href="/kalkulator"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-[#022c22] font-black text-base flex items-center justify-center gap-2.5 shadow-xl transition-all cursor-pointer border border-emerald-300"
            >
              <Calculator className="w-5 h-5" />
              <span>Buka Kalkulator Bajet Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#architecture"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 font-bold text-base flex items-center justify-center gap-2 border border-emerald-800 shadow-sm transition-colors"
            >
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Seni Bina Supabase &amp; Gemini AI</span>
            </a>
          </div>

          {/* Core Feature Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto pt-4 text-left">
            <div className="p-5 rounded-2xl bg-emerald-950/70 border border-emerald-800/80">
              <div className="flex items-center gap-2 font-black text-white text-lg mb-1">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>100% Kos Telus</span>
              </div>
              <p className="text-xs text-emerald-300/80 font-medium">
                Pecahan 4 dimensi: penerbangan, bilik hotel (twin sharing), makan harian, dan Grab.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/70 border border-emerald-800/80">
              <div className="flex items-center gap-2 font-black text-white text-lg mb-1">
                <UtensilsCrossed className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Overpass Halal OSM</span>
              </div>
              <p className="text-xs text-emerald-300/80 font-medium">
                Kueri geospatial premis makanan halal OpenStreetMap sebenar di destinasi.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/70 border border-emerald-800/80">
              <div className="flex items-center gap-2 font-black text-white text-lg mb-1">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Pasport Malaysia (MY)</span>
              </div>
              <p className="text-xs text-emerald-300/80 font-medium">
                Semakan automatik akses bebas visa dan tempoh hari tanpa anda perlu google berulang kali.
              </p>
            </div>
          </div>
        </section>


        {/* =========================================================
            2. REAL PROBLEM: KENAPA BELIA MALAYSIA SELALU OVERBUDGET
        ========================================================= */}
        <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto border-t border-emerald-900/60">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              Kajian Masalah Nyata
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-3">
              Mengapa Ramai Belia Malaysia Terlebih Belanja?
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-2 font-medium">
              Lebih 70% pengembara belia terlebih belanja kerana maklumat industri pelancongan semasa berpecah-belah dan mengelirukan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-3xl bg-[#ecfdf5] text-[#022c22] border border-emerald-300 shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-black text-lg text-[#022c22]">
                Tiket Penerbangan Cuma 35% Daripada Kos Sebenar
              </h3>
              <p className="text-xs text-emerald-900/90 leading-relaxed font-medium">
                Skyscanner tunjuk tiket RM280, tetapi sebaik tiba di destinasi kos hotel, makan minum, dan Grab melonjak cecah RM2,000 tanpa kawalan.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-3xl bg-[#ecfdf5] text-[#022c22] border border-emerald-300 shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-black text-lg text-[#022c22]">
                Kena Buka 4 Aplikasi Berasingan Untuk Rancang
              </h3>
              <p className="text-xs text-emerald-900/90 leading-relaxed font-medium">
                Satu laman untuk tiket penerbangan, satu aplikasi untuk hotel, satu tab Google syarat visa pasport Malaysia, dan satu lagi cari restoran halal.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-3xl bg-[#ecfdf5] text-[#022c22] border border-emerald-300 shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-black text-lg text-[#022c22]">
                Tiada Platform Yang Mengira Dari Poket Pengguna
              </h3>
              <p className="text-xs text-emerald-900/90 leading-relaxed font-medium">
                Sistem komersial sedia ada direka untuk menjual inventori tiket dan bilik komisen, bukan untuk memastikan pengembara tidak terlebih belanja.
              </p>
            </div>
          </div>
        </section>


        {/* =========================================================
            3. THREE PILLARS (TIGA TONGGAK PENYELESAIAN)
        ========================================================= */}
        <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto border-t border-emerald-900/60">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              Tiga Tonggak Sistem
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-3">
              Dicipta Khas Menepati Realiti Belia Tempatan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-emerald-950/60 border border-emerald-800/90 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-white">1. Kos Penuh 4 Dimensi</h3>
              <p className="text-xs text-emerald-200/80 leading-relaxed font-medium">
                Formula komprehensif mengira tiket pergi-balik per pax, bilik hotel twin-sharing <code className="bg-emerald-900/80 px-1 py-0.5 rounded text-emerald-300">ceil(pax/2)</code>, makan minum harian, dan Grab perkongsian kumpulan.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-emerald-950/60 border border-emerald-800/90 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-white">2. Halal OSM &amp; Pasport MY</h3>
              <p className="text-xs text-emerald-200/80 leading-relaxed font-medium">
                Menggunakan Overpass API untuk membanci premis <code className="bg-emerald-900/80 px-1 py-0.5 rounded text-emerald-300">diet:halal=yes</code> di OpenStreetMap, dan dataset Passport Index untuk syarat visa pasport Malaysia.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-emerald-950/60 border border-emerald-800/90 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-white">3. Jadual 4 Hari Realistik</h3>
              <p className="text-xs text-emerald-200/80 leading-relaxed font-medium">
                Itinerari harian belia yang praktikal dengan port makan halal tempatan berkadar tinggi (&gt;4.5 bintang) yang sepadan dengan baki lebihan simpanan poket.
              </p>
            </div>
          </div>
        </section>


        {/* =========================================================
            4. COMPARISON TABLE (BENCHMARK VS COMMERCIAL ENGINES)
        ========================================================= */}
        <section id="perbandingan" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto border-t border-emerald-900/60">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              Penanda Aras Pasaran
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-3">
              Perbandingan Traversi Berbanding Sistem Komersial Global
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-2 font-medium">
              Bagaimana Traversi menyelesaikan jurang besar yang ditinggalkan oleh enjin carian tiket biasa.
            </p>
          </div>

          <ComparisonTable />
        </section>


        {/* =========================================================
            5. ARCHITECTURE SECTION (SUPABASE CLOUD + GEMINI AI)
        ========================================================= */}
        <section id="architecture" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto border-t border-emerald-900/60">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              Seni Bina Sistem (Averis Cloud + AI Compliance)
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-3">
              Integrasi Cloud Supabase &amp; Enjin Google Gemini 1.5
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-2 font-medium">
              Seni bina moden berprestasi tinggi yang menggabungkan pengkomputeran pelayan awan dengan kecerdasan buatan dan data geospatial terbuka.
            </p>
          </div>

          {/* Visual Architecture Flowchart / Diagram */}
          <div className="p-6 sm:p-8 rounded-3xl bg-emerald-950/80 border-2 border-emerald-800 shadow-2xl mb-8 space-y-6">
            <div className="text-xs font-mono text-emerald-400 bg-[#011d17] p-4 rounded-2xl border border-emerald-800/80 overflow-x-auto leading-relaxed">
              <span className="text-emerald-500 font-bold block mb-1"># Aliran Data Seni Bina Traversi (E2E Workflow)</span>
              1. Pengguna (Pelayar Web BM/EN) &rarr; Next.js 14 App Router (Hos Vercel Cloud Serverless)<br />
              2. Kueri /api/recommend &rarr; Semak Lapisan Cache Supabase Cloud Postgres (destinations_cache &amp; flight_cache)<br />
              3. Cache Miss? &rarr; Hantar Kueri Selari: Amadeus Flight API + Overpass OSM API (diet:halal=yes) + Passport-Visa-API<br />
              4. Enjin AI &rarr; Google Gemini 1.5 Flash menjana analisis justifikasi bajet, itinerari realistik, dan sentimen halal<br />
              5. Output &rarr; 3 Destinasi Optimum muat bajet dipaparkan bersama pecahan 4 dimensi kos &amp; semakan pasport
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              {/* Cloud Block */}
              <div className="p-5 rounded-2xl bg-[#022c22] border border-emerald-700/80 space-y-2">
                <div className="flex items-center gap-2 text-white font-black text-base">
                  <Database className="w-5 h-5 text-emerald-400" />
                  <span>Cloud: Supabase Postgres</span>
                </div>
                <p className="text-xs text-emerald-200/80 font-medium leading-relaxed">
                  Pangkalan data awan terurus untuk jadual <code className="text-emerald-300">searches</code> (analitik carian belia), <code className="text-emerald-300">flight_cache</code> (penjimatan kuota API), dan <code className="text-emerald-300">user_pins</code>.
                </p>
              </div>

              {/* AI Block */}
              <div className="p-5 rounded-2xl bg-[#022c22] border border-emerald-700/80 space-y-2">
                <div className="flex items-center gap-2 text-white font-black text-base">
                  <Cpu className="w-5 h-5 text-emerald-400" />
                  <span>AI: Gemini 1.5 Flash</span>
                </div>
                <p className="text-xs text-emerald-200/80 font-medium leading-relaxed">
                  Enjin LLM berkecekapan tinggi untuk anggaran kos hotel/makanan, sentimen ulasan kedai halal pelancong Muslim, dan penjanaan itinerari 4 hari.
                </p>
              </div>

              {/* Geospatial & Data Block */}
              <div className="p-5 rounded-2xl bg-[#022c22] border border-emerald-700/80 space-y-2">
                <div className="flex items-center gap-2 text-white font-black text-base">
                  <Cloud className="w-5 h-5 text-emerald-400" />
                  <span>Data: Overpass &amp; Passport</span>
                </div>
                <p className="text-xs text-emerald-200/80 font-medium leading-relaxed">
                  Kueri terus data OpenStreetMap (OSM) nod diet:halal tanpa senarai statik, digandingkan bersama pangkalan data peraturan pasport Malaysia 180+ negara.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* =========================================================
            6. IMPLEMENTATION & REVERSE-BUDGETING LOGIC
        ========================================================= */}
        <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto border-t border-emerald-900/60">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              Pelaksanaan Kejuruteraan
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-3">
              Formula Matematik &amp; Logik Terbalik
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-2 font-medium">
              Bagaimana Traversi mengira had perbelanjaan kumpulan dengan kejituan tinggi tanpa membebankan pengguna.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-emerald-950/70 border border-emerald-800 space-y-4">
              <h3 className="font-black text-xl text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-400" />
                Formula Matematik 4 Dimensi
              </h3>
              <div className="p-4 rounded-xl bg-[#011d17] font-mono text-xs text-emerald-300 border border-emerald-900 space-y-2">
                <p className="text-emerald-400 font-bold">// Pengiraan Kos Total Kumpulan</p>
                <p>rooms = ceil(pax / 2);</p>
                <p>nights = max(0, days - 1);</p>
                <p className="text-white font-bold">
                  total = (flight * pax) + (hotel * rooms * nights) + (food * pax * days) + (transport * rooms * days);
                </p>
              </div>
              <p className="text-xs text-emerald-200/80 leading-relaxed font-medium">
                Formula ini mencerminkan tingkah laku sebenar belia: berkongsi bilik hotel berdua dan berkongsi tambang kereta sewa/Grab secara kumpulan untuk meminimumkan kos.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-emerald-950/70 border border-emerald-800 space-y-4">
              <h3 className="font-black text-xl text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                Skor Penilaian Destinasi (Value Score)
              </h3>
              <p className="text-xs text-emerald-200/80 leading-relaxed font-medium">
                Destinasi tidak hanya ditapis mengikut muat atau tidak, tetapi dinilai menggunakan algoritma <code className="text-emerald-300">valueScore</code>:
              </p>
              <ul className="text-xs text-emerald-200/90 space-y-2 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong>Penggunaan Bajet Optimum:</strong> Destinasi yang menggunakan 70% hingga 95% bajet mendapat skor tertinggi.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong>Bonus Halal Overpass:</strong> Tambahan markah sekiranya premis halal bertaraf &quot;Mudah&quot; (&ge;100 nod OSM).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong>Kemudahan Pasport:</strong> Destinasi bebas visa 30-90 hari atau perjalanan domestik MyKad diberi keutamaan.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>


        {/* =========================================================
            7. CHALLENGES & SOLUTIONS (CABARAN KEJURUTERAAN)
        ========================================================= */}
        <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto border-t border-emerald-900/60">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              Cabaran &amp; Penyelesaian
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-3">
              Halangan Teknikal &amp; Keputusan Kejuruteraan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-emerald-950/70 border border-emerald-800 space-y-3">
              <h3 className="text-base font-black text-white">1. Had Kuota API Luaran</h3>
              <p className="text-xs text-rose-300 font-bold">Cabaran:</p>
              <p className="text-xs text-emerald-200/80 font-medium">
                Amadeus Test API menghadkan 2,000 panggilan sebulan, manakala kueri Overpass awam boleh mengalami latensi tinggi.
              </p>
              <p className="text-xs text-emerald-400 font-bold pt-1">Penyelesaian Kejuruteraan:</p>
              <p className="text-xs text-emerald-200/80 font-medium">
                Membina lapisan cache multi-tier dalam Supabase Postgres (<code className="text-emerald-300">destinations_cache</code> &amp; <code className="text-emerald-300">flight_cache</code>) dengan jangka hayat TTL 24 jam.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-emerald-950/70 border border-emerald-800 space-y-3">
              <h3 className="text-base font-black text-white">2. Ketepatan Data Halal</h3>
              <p className="text-xs text-rose-300 font-bold">Cabaran:</p>
              <p className="text-xs text-emerald-200/80 font-medium">
                Banyak platform pelancongan hanya menggunakan senarai statik yang tidak dikemas kini atau berat sebelah.
              </p>
              <p className="text-xs text-emerald-400 font-bold pt-1">Penyelesaian Kejuruteraan:</p>
              <p className="text-xs text-emerald-200/80 font-medium">
                Menghantar kueri nod spatial <code className="text-emerald-300">node[&quot;diet:halal&quot;=&quot;yes&quot;]</code> terus ke OpenStreetMap dan menyemak silang dengan sentimen ulasan Google via Gemini 1.5 Flash.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-emerald-950/70 border border-emerald-800 space-y-3">
              <h3 className="text-base font-black text-white">3. Kekeliruan Visa Belia</h3>
              <p className="text-xs text-rose-300 font-bold">Cabaran:</p>
              <p className="text-xs text-emerald-200/80 font-medium">
                Belia sering keliru antara visa on arrival, permohonan eVisa awal (K-ETA Korea), dan negara bebas visa sepenuhnya.
              </p>
              <p className="text-xs text-emerald-400 font-bold pt-1">Penyelesaian Kejuruteraan:</p>
              <p className="text-xs text-emerald-200/80 font-medium">
                Penyepaduan modul semakan pasport automatik yang memaparkan label jelas (contoh: Visa Free 30 Hari, K-ETA, atau MyKad bagi penerbangan domestik).
              </p>
            </div>
          </div>
        </section>


        {/* =========================================================
            8. ROADMAP (PELAN HALA TUJU AVERIS & MASA DEPAN)
        ========================================================= */}
        <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto border-t border-emerald-900/60">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              Pelan Hala Tuju Produk
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-3">
              Dari Prototaip Hackathon Ke Ekosistem Sebenar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phase 1 */}
            <div className="p-6 rounded-3xl bg-[#011d17] border-2 border-emerald-500/80 space-y-3 relative">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500 text-[#022c22] text-xs font-black">
                FASA 1: MVP (Averis Hackathon)
              </div>
              <h3 className="font-black text-lg text-white">18 &ndash; 22 September 2026</h3>
              <ul className="text-xs text-emerald-200/90 space-y-1.5 font-medium">
                <li className="flex items-center gap-2">&bull; Enjin Reverse-Budgeting fleksibel (RM500-RM10,000)</li>
                <li className="flex items-center gap-2">&bull; Pecahan 4 dimensi kos per pax &amp; perkongsian bilik</li>
                <li className="flex items-center gap-2">&bull; Semakan Halal Overpass OSM &amp; Pasport Malaysia</li>
                <li className="flex items-center gap-2">&bull; Penjanaan jadual 4 hari realistik dengan Gemini AI</li>
              </ul>
            </div>

            {/* Phase 2 */}
            <div className="p-6 rounded-3xl bg-emerald-950/60 border border-emerald-800 space-y-3">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-900 text-emerald-300 text-xs font-bold border border-emerald-700">
                FASA 2: Pengesahan Komuniti
              </div>
              <h3 className="font-black text-lg text-white">Suku Keempat 2026</h3>
              <ul className="text-xs text-emerald-200/80 space-y-1.5 font-medium">
                <li className="flex items-center gap-2">&bull; Modul submit kos sebenar oleh belia (Crowdsourced validation)</li>
                <li className="flex items-center gap-2">&bull; Log masuk Supabase Auth (Google) untuk simpan destinasi</li>
                <li className="flex items-center gap-2">&bull; Eksport jadual harian dan kos terus ke WhatsApp kumpulan</li>
              </ul>
            </div>

            {/* Phase 3 */}
            <div className="p-6 rounded-3xl bg-emerald-950/60 border border-emerald-800 space-y-3">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-900 text-emerald-300 text-xs font-bold border border-emerald-700">
                FASA 3: Monetisasi &amp; PWA
              </div>
              <h3 className="font-black text-lg text-white">Tahun 2027</h3>
              <ul className="text-xs text-emerald-200/80 space-y-1.5 font-medium">
                <li className="flex items-center gap-2">&bull; Pautan affiliate rasmi AirAsia/Skyscanner/Agoda</li>
                <li className="flex items-center gap-2">&bull; Aplikasi Web Progresif (PWA) mod luar talian tanpa data</li>
                <li className="flex items-center gap-2">&bull; Integrasi e-dompet belia tempatan (Touch &apos;n Go eWallet)</li>
              </ul>
            </div>
          </div>
        </section>


        {/* =========================================================
            9. TEAM PROFILE (4 ORANG)
        ========================================================= */}
        <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto border-t border-emerald-900/60">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              Pasukan Pembangun
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-3">
              Pasukan 4 Orang Traversi
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-2 font-medium">
              Komitmen bersama merekabentuk perisian berimpak tinggi untuk belia Malaysia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-[#022c22] font-black text-lg flex items-center justify-center mx-auto">
                AH
              </div>
              <h3 className="font-bold text-white text-base">Amir Hakim</h3>
              <p className="text-xs font-bold text-emerald-400">Team Lead &amp; Full-Stack</p>
              <p className="text-[11px] text-emerald-200/70">Seni bina aplikasi Next.js 14, kalkulator terbalik, rekaan UI anti-slop.</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center mx-auto">
                M
              </div>
              <h3 className="font-bold text-white text-base">Moi</h3>
              <p className="text-xs font-bold text-emerald-400">Cloud &amp; Database Architect</p>
              <p className="text-[11px] text-emerald-200/70">Skema pangkalan data Supabase Postgres, lapisan cache &amp; Google Auth.</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center mx-auto">
                E
              </div>
              <h3 className="font-bold text-white text-base">Eqhlas</h3>
              <p className="text-xs font-bold text-emerald-400">AI Engineer (Gemini 1.5)</p>
              <p className="text-[11px] text-emerald-200/70">Prompt engineering anggaran kos, cadangan itinerari, &amp; sentimen halal.</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center mx-auto">
                P
              </div>
              <h3 className="font-bold text-white text-base">Paan</h3>
              <p className="text-xs font-bold text-emerald-400">External Data &amp; Travel APIs</p>
              <p className="text-[11px] text-emerald-200/70">Integrasi Amadeus Test, REST Countries, ExchangeRate &amp; Overpass API.</p>
            </div>
          </div>
        </section>


        {/* =========================================================
            10. FINAL CTA SECTION
        ========================================================= */}
        <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center border-t border-emerald-900/60">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#ecfdf5] text-[#022c22] border-2 border-emerald-300 shadow-2xl space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black text-[#022c22] tracking-tight">
              Bersedia Merancang Trip Pertama Anda?
            </h2>
            <p className="text-sm sm:text-base text-emerald-950 max-w-xl mx-auto font-medium leading-relaxed">
              Cuba sekarang secara percuma. Masukkan bajet maksimum anda dan lihat destinasi impian yang benar-benar muat dengan wang poket anda.
            </p>
            <div className="pt-2">
              <Link
                href="/kalkulator"
                className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl bg-[#022c22] hover:bg-[#064e3b] text-[#ecfdf5] font-black text-lg shadow-xl transition-all cursor-pointer border-2 border-emerald-400/40"
              >
                <Calculator className="w-5 h-5" />
                <span>Buka Kalkulator Bajet Sekarang</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-emerald-900/60 bg-[#011d17] py-8 px-4 sm:px-6 text-center text-xs text-emerald-300/80">
        <div className="max-w-5xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 font-bold text-white">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Traversi (Travel Versi Anda)</span>
          </div>
          <p className="text-emerald-300 max-w-md mx-auto font-medium">
            Dibina khas untuk Averis Hackathon 2026 (18-22 Sept).
          </p>
          <div className="pt-2 text-[11px] text-emerald-400/70 border-t border-emerald-900/40 font-medium">
            Pasukan 4 Orang: <strong>Amir Hakim</strong> &bull; <strong>Moi</strong> &bull; <strong>Eqhlas</strong> &bull; <strong>Paan</strong>
          </div>
        </div>
      </footer>
    </div>
  );
}
