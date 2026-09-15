"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Compass, 
  Globe, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Star, 
  Layers, 
  ShieldCheck, 
  BookOpen,
  Cpu,
  Code2,
  AlertTriangle,
  Milestone,
  Users,
  Calculator,
  ChevronDown,
  Sparkles
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

function GithubIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

// Exact format matching the landing page sections
export const PITCH_DECK_SECTIONS = [
  {
    id: "masalah",
    title: "Problem (Mengapa Tersangkut)",
    icon: BookOpen,
  },
  {
    id: "tonggak",
    title: "3 Tonggak Utama (Kiraan 4 Dimensi, Visa MY, Halal Score)",
    icon: ShieldCheck,
  },
  {
    id: "perbandingan",
    title: "Perbandingan vs Skyscanner/Google Flights",
    icon: Layers,
  },
  {
    id: "architecture",
    title: "Architecture Diagram (Supabase + Vercel + Gemini)",
    icon: Layers,
  },
  {
    id: "tech-stack",
    title: "Tech Stack (Cloud + AI)",
    icon: Cpu,
  },
  {
    id: "pelaksanaan",
    title: "Implementation Details",
    icon: Code2,
  },
  {
    id: "cabaran",
    title: "Challenges Faced",
    icon: AlertTriangle,
  },
  {
    id: "roadmap",
    title: "Future Roadmap",
    icon: Milestone,
  },
  {
    id: "pasukan",
    title: "Team 4 Orang",
    icon: Users,
  },
  {
    id: "cta",
    title: "CTA ke Kalkulator + link GitHub & Live Demo",
    icon: Calculator,
  },
];

export default function Navbar() {
  const router = useRouter();
  const { locale, toggleLocale } = useLanguage();
  const { user, isLoggedIn, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200 bg-white/95 backdrop-blur-md">
      <div className="w-full px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo + Compact Floating Dropdown Navigation */}
        <div className="flex items-center gap-3">
          {/* Brand Logo */}
          <Link 
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-white shadow-xs">
              <Compass className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg text-stone-950 tracking-tight">Traversi</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 hidden sm:inline">
                {locale === "bm" ? "Travel Versi Anda" : "Your Trip"}
              </span>
            </div>
          </Link>

          {/* Compact Dropdown Nav Button (Not a full-screen drawer!) */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Navigasi Pitch Deck"
              aria-expanded={menuOpen}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                menuOpen 
                  ? "bg-emerald-800 text-white border-emerald-800 shadow-xs" 
                  : "border-stone-200 hover:bg-stone-100 text-stone-800 bg-white"
              }`}
            >
              <Menu className="w-4 h-4 text-inherit" />
              <span className="hidden sm:inline">Seksyen Pitch Deck</span>
              <span className="sm:hidden">Menu</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Floating Dropdown Card (Anchored cleanly below button) */}
            {menuOpen && (
              <div 
                className="absolute top-full left-0 mt-2 w-[340px] sm:w-[420px] max-h-[80vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-stone-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150 divide-y divide-stone-100"
              >
                <div className="pb-2 px-2 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Navigasi Kandungan Pitch Deck
                  </span>
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* The 10 Pitch Deck Sections */}
                <div className="py-2 space-y-1">
                  {PITCH_DECK_SECTIONS.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.id}
                        href={`/#${item.id}`}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-stone-700 hover:bg-emerald-50 hover:text-emerald-950 transition-colors group"
                      >
                        <span className="w-5 h-5 rounded-md bg-stone-100 group-hover:bg-emerald-100 text-stone-600 group-hover:text-emerald-800 flex items-center justify-center shrink-0 text-[10px] font-mono font-bold">
                          {idx + 1}
                        </span>
                        <Icon className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </a>
                    );
                  })}
                </div>

                {/* Profile & Footer Links inside Dropdown */}
                <div className="pt-2 px-2 space-y-2 text-xs">
                  {isLoggedIn ? (
                    <div className="flex items-center justify-between pt-1">
                      <Link
                        href="/profile"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 min-w-0 font-bold text-stone-800 hover:text-emerald-800"
                      >
                        <User className="w-4 h-4 text-emerald-700" />
                        <span className="truncate">Profil &amp; Destinasi Disimpan</span>
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                      >
                        Log Keluar
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between pt-1 text-stone-500">
                      <a
                        href="https://github.com/cs-mirakim/traversi"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 font-bold hover:text-stone-900"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>GitHub Repository</span>
                      </a>
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">
                        Hackathon 2026
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Desktop Quick Navigation Links (Visible on large screens) */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-bold text-stone-600">
          <a href="/#masalah" className="px-2.5 py-1.5 rounded-lg hover:text-emerald-900 hover:bg-stone-100 transition-colors">
            Problem
          </a>
          <a href="/#tonggak" className="px-2.5 py-1.5 rounded-lg hover:text-emerald-900 hover:bg-stone-100 transition-colors">
            3 Tonggak
          </a>
          <a href="/#perbandingan" className="px-2.5 py-1.5 rounded-lg hover:text-emerald-900 hover:bg-stone-100 transition-colors">
            Perbandingan
          </a>
          <a href="/#architecture" className="px-2.5 py-1.5 rounded-lg hover:text-emerald-900 hover:bg-stone-100 transition-colors">
            Architecture
          </a>
          <a href="/#tech-stack" className="px-2.5 py-1.5 rounded-lg hover:text-emerald-900 hover:bg-stone-100 transition-colors">
            Tech Stack
          </a>
          <a href="/#pasukan" className="px-2.5 py-1.5 rounded-lg hover:text-emerald-900 hover:bg-stone-100 transition-colors">
            Team
          </a>
        </nav>

        {/* Right: Actions (Language, Auth, Calculator Shortcut) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Calculator Link */}
          <Link
            href="/kalkulator"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-bold transition-all shadow-2xs"
          >
            <Calculator className="w-3.5 h-3.5 text-emerald-700" />
            <span>Kalkulator Bajet</span>
          </Link>

          {/* Language Switcher */}
          <button
            type="button"
            onClick={toggleLocale}
            title={locale === "bm" ? "Switch to English" : "Tukar ke Bahasa Melayu"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-xs font-bold text-stone-800 transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-700" />
            <span>{locale === "bm" ? "BM" : "EN"}</span>
          </button>

          {/* Auth: Not logged in */}
          {!isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-xs font-bold px-3 py-1.5 rounded-xl text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                {locale === "bm" ? "Log Masuk" : "Login"}
              </Link>
              <Link
                href="/register"
                className="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white transition-all shadow-xs cursor-pointer"
              >
                {locale === "bm" ? "Daftar" : "Register"}
              </Link>
            </div>
          ) : (
            /* Auth: Logged in Profile Badge */
            <Link
              href="/profile"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-950 text-xs font-bold transition-all"
              title={locale === "bm" ? "Lihat Profil & Destinasi Disimpan" : "View Profile & Saved Destinations"}
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-800 text-white text-[11px] font-black flex items-center justify-center">
                {user?.avatar || user?.name?.[0] || "U"}
              </div>
              <span className="font-bold hidden sm:inline">{user?.name}</span>
              {user?.starredDestinations && user.starredDestinations.length > 0 && (
                <span className="flex items-center gap-0.5 text-[10px] text-amber-700 bg-amber-100/80 px-1.5 py-0.2 rounded font-bold">
                  <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                  <span>{user.starredDestinations.length}</span>
                </span>
              )}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
