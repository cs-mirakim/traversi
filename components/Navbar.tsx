"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Compass, Globe, LogIn, UserPlus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const { locale, toggleLocale, t } = useLanguage();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const openAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-stone-200 bg-white/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand */}
          <Link 
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-xs">
              <Compass className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg text-stone-950 tracking-tight">Traversi</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {locale === "bm" ? "Travel Versi Anda" : "Your Trip"}
                </span>
              </div>
            </div>
          </Link>

          {/* Center Navigation Links (Clean & Minimal) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-stone-600">
            <Link
              href="/"
              className="hover:text-emerald-800 transition-colors"
            >
              {locale === "bm" ? "Pengenalan" : "Overview"}
            </Link>
            <a
              href="/#perbandingan"
              className="hover:text-emerald-800 transition-colors"
            >
              {locale === "bm" ? "Perbandingan" : "Comparison"}
            </a>
            <a
              href="/#architecture"
              className="hover:text-emerald-800 transition-colors"
            >
              {locale === "bm" ? "Seni Bina" : "Architecture"}
            </a>
            <Link
              href="/kalkulator"
              className="text-emerald-800 font-extrabold hover:text-emerald-950 transition-colors"
            >
              {locale === "bm" ? "Kalkulator Bajet" : "Calculator"}
            </Link>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* Language Switcher Button (BM / EN) */}
            <button
              type="button"
              onClick={toggleLocale}
              title={locale === "bm" ? "Switch to English" : "Tukar ke Bahasa Melayu"}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-xs font-bold text-stone-800 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              <span>{locale === "bm" ? "BM" : "EN"}</span>
            </button>

            {/* Login Button */}
            <button
              type="button"
              onClick={() => openAuth("login")}
              className="text-xs font-bold px-3 py-1.5 rounded-xl text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              {locale === "bm" ? "Log Masuk" : "Login"}
            </button>

            {/* Register Button */}
            <button
              type="button"
              onClick={() => openAuth("register")}
              className="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-[#022c22] hover:bg-[#064e3b] text-white transition-all shadow-xs cursor-pointer"
            >
              {locale === "bm" ? "Daftar" : "Register"}
            </button>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
}
