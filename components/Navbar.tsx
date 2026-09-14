"use client";

import React from "react";
import Link from "next/link";
import { Compass, Award, Calculator, BookOpen } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200 bg-white/95 backdrop-blur-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link 
          href="/"
          className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:outline-none rounded-xl"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-white shadow-xs">
            <Compass className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-stone-950 tracking-tight">Traversi</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-200">
                Travel DIY RM
              </span>
            </div>
            <p className="text-[11px] text-stone-700 hidden sm:block font-medium">
              Bajet Berapa Boleh Pergi Mana? • Edisi Pasport Malaysia
            </p>
          </div>
        </Link>

        {/* Center / Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-stone-100/80 p-1 rounded-xl border border-stone-200">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-stone-800 hover:text-stone-950 hover:bg-white transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-stone-600" />
            <span>Pengenalan Sistem</span>
          </Link>
          <Link
            href="/kira"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-900 hover:bg-white transition-colors"
          >
            <Calculator className="w-3.5 h-3.5 text-emerald-700" />
            <span>Kalkulator Bajet</span>
          </Link>
        </nav>

        {/* Right Badges & Action */}
        <div className="flex items-center gap-2.5">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-100 text-stone-800 text-xs font-semibold border border-stone-200">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>Averis Hackathon 2026</span>
          </div>

          <Link
            href="/kira"
            className="text-xs font-bold px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:outline-none transition-colors flex items-center gap-1.5"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Buka Kalkulator</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
