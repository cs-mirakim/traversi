"use client";

import React from "react";
import Link from "next/link";
import { Compass, Calculator, BookOpen, Layers, ShieldCheck, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-800/80 bg-[#022c22]/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link 
          href="/"
          className="flex items-center gap-3 group focus:outline-none rounded-xl"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-[#022c22] shadow-md border border-emerald-400">
            <Compass className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45 text-[#022c22]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl text-white tracking-tight">Traversi</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-900/80 text-emerald-300 border border-emerald-700">
                Travel Versi Anda
              </span>
            </div>
            <p className="text-[11px] text-emerald-300/80 hidden sm:block font-medium">
              Reverse-Budgeting &bull; Averis Hackathon 2026
            </p>
          </div>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 bg-emerald-950/90 p-1 rounded-xl border border-emerald-800">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-200 hover:text-white hover:bg-emerald-900/60 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pitch Deck</span>
          </Link>
          <a
            href="/#architecture"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-200 hover:text-white hover:bg-emerald-900/60 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Seni Bina Cloud</span>
          </a>
          <a
            href="/#perbandingan"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-200 hover:text-white hover:bg-emerald-900/60 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Perbandingan</span>
          </a>
          <Link
            href="/kalkulator"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black text-[#022c22] bg-emerald-300 hover:bg-emerald-200 transition-colors"
          >
            <Calculator className="w-3.5 h-3.5 text-[#022c22]" />
            <span>Kalkulator</span>
          </Link>
        </nav>

        {/* Right Badges & Action */}
        <div className="flex items-center gap-2.5">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cloud + AI</span>
          </div>

          <Link
            href="/kalkulator"
            className="text-xs font-black px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#022c22] shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            <span>Buka Kalkulator</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
