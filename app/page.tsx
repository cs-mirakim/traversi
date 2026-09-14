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
  Coins, 
  ArrowRight, 
  TrendingUp, 
  AlertTriangle,
  Award
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FBFBFA] text-stone-900 font-sans flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-16 pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
          {/* Hackathon Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-bold mb-6 shadow-2xs">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>Averis Hackathon 2026 • 18 – 22 September</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-stone-950 mb-6 max-w-4xl mx-auto leading-tight">
            Bajet Berapa, <br className="hidden sm:inline" />
            <span className="text-emerald-800 underline decoration-amber-400 decoration-wavy decoration-2">
              Boleh Pergi Mana?
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-stone-700 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Sistem perancang kembara pertama untuk belia dan pelajar Malaysia yang menggunakan kaedah <strong>Reverse-Budgeting</strong>: masukkan had bajet poket anda, sistem tentukan destinasi mana yang lepas siap pecahan tiket, hotel, makan harian, dan status halal.
          </p>

          {/* Two Primary Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link
              href="/kira"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 active:scale-[0.99] text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-900/20 focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 focus-visible:outline-none transition-all"
            >
              <Calculator className="w-5 h-5" />
              <span>Buka Kalkulator Bajet Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#perbandingan"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-stone-100 text-stone-800 font-bold text-base flex items-center justify-center gap-2 border border-stone-300 shadow-2xs focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:outline-none transition-colors"
            >
              <span>Lihat Penanda Aras Ekosistem</span>
            </a>
          </div>

          {/* Core Highlights Pill Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-bold text-stone-800 border-t border-stone-200/80 pt-8 max-w-3xl mx-auto">
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-800" />
              <span>Pecahan Lengkap 4 Kos Asas</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-800" />
              <span>Semakan Pasport Malaysia</span>
            </div>
            <div className="flex items-center gap-1.5">
              <UtensilsCrossed className="w-4 h-4 text-emerald-800" />
              <span>Skor Mesra Makanan Halal</span>
            </div>
          </div>
        </section>

        {/* MASALAH NYATA: KENAPA BELIA MALAYSIA SELALU 'OVERBUDGET'? */}
        <section className="py-14 px-4 sm:px-6 max-w-5xl mx-auto bg-stone-100/70 rounded-3xl border border-stone-200/80 my-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Masalah Pengembara Belia
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-1">
              Mengapa Ramai Pelajar Tersangkut Bila Melancong?
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 mt-2 font-medium">
              Kajian perbelanjaan mendapati lebih 70% pengembara belia Malaysia terlebih belanja akibat maklumat yang berpecah-belah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Problem 1 */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center mb-3">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-stone-950 text-sm">
                Perangkap Tiket Promosi Murah
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                Beli tiket kapal terbang RM280, tapi bila tiba di destinasi, kos hotel, makanan harian, dan Grab mencecah RM2,000 tanpa disedari.
              </p>
            </div>

            {/* Problem 2 */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                <Coins className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-stone-950 text-sm">
                Tiada Enjin Carian Bajet Terbalik
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                Skyscanner dan Google Flights paksa pengguna pilih bandar dulu. Belia yang hanya ada RM1,500 tidak tahu ke mana sebenarnya duit mereka muat.
              </p>
            </div>

            {/* Problem 3 */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-800" />
              </div>
              <h3 className="font-bold text-stone-950 text-sm">
                Kekeliruan Visa &amp; Makanan Halal
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                Perlu buka 4 aplikasi berasingan: satu semak tiket, satu cari hotel, satu Google syarat visa pasport Malaysia, dan satu lagi cari kedai halal.
              </p>
            </div>
          </div>
        </section>

        {/* BAGAIMANA TRAVERSI MENYELESAIKANNYA (3 TONGGAK) */}
        <section className="py-14 px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Solusi Traversi
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-1">
              3 Tonggak Utama Sistem Traversi
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 mt-2 font-medium">
              Direka khas dengan perspektif pengembara Malaysia yang mementingkan ketelusan kos dan kemudahan ibadah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-black text-sm">
                01
              </div>
              <h3 className="font-bold text-stone-950 text-base">
                Kiraan 4 Dimensi Kos Wajib
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                Mengira gabungan Tiket Penerbangan pergi-balik dari KLIA/Pulau Pinang/Senai, Penginapan hotel mampu milik, Belanja makan 3 kali sehari, dan Pengangkutan harian.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-black text-sm">
                02
              </div>
              <h3 className="font-bold text-stone-950 text-base">
                Penapis Bebas Visa Pasport MY
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                Menyemak status visa secara automatik mengikut kekuatan Pasport Malaysia, termasuk had tempoh hari selamat (cth: 30 hari di ASEAN) tanpa perlu buat visa kedutaan.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-black text-sm">
                03
              </div>
              <h3 className="font-bold text-stone-950 text-base">
                Skor Akses Makanan Halal
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                Memberikan indikator ketelusan sama ada destinasi tersebut mudah mencari kedai makan halal, sederhana, atau memerlukan ketelitian, siap cadangan port makan popular.
              </p>
            </div>
          </div>
        </section>

        {/* JADUAL PERBANDINGAN EKOSISTEM (PENGGANTI KAD LAMA) */}
        <div id="perbandingan" className="scroll-mt-16">
          <ComparisonTable />
        </div>

        {/* CALL TO ACTION BOTTOM BANNER */}
        <section className="py-14 px-4 sm:px-6 max-w-5xl mx-auto my-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-stone-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-emerald-800 text-emerald-100">
                <TrendingUp className="w-3.5 h-3.5 text-amber-300" />
                <span>Sedia Untuk Merancang Percutian?</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Masukkan Bajet Anda, Lihat Ke Mana Anda Boleh Pergi
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
                Uji kalkulator interaktif Traversi sekarang. Boleh tentukan nilai bajet sendiri, pilih kiraan per pax atau satu kumpulan, dan dapatkan itinerari lengkap 4 hari.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/kira"
                className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
              >
                <Calculator className="w-5 h-5" />
                <span>Masuk ke Kalkulator Traversi</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-stone-200 bg-white py-8 px-4 sm:px-6 text-center text-xs text-stone-700">
        <div className="max-w-5xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 font-bold text-stone-950">
            <span>Traversi (Travel DIY RM)</span>
          </div>
          <p className="text-stone-700 max-w-md mx-auto font-medium">
            Dibina khas untuk Averis Hackathon 2026 (18 – 22 September).
          </p>
          <div className="pt-2 text-[11px] text-stone-700 border-t border-stone-100 font-medium">
            Pasukan 4 Orang: <strong>Amir Hakim</strong> • <strong>Moi</strong> • <strong>Eqhlas</strong> • <strong>Paan</strong>
          </div>
        </div>
      </footer>
    </div>
  );
}
