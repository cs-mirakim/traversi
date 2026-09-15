"use client";

import React, { useState, useEffect } from "react";
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
  Users
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

export default function Navbar() {
  const router = useRouter();
  const { locale, toggleLocale } = useLanguage();
  const { user, isLoggedIn, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpen]);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
    router.push("/");
  };

  return (
    <>
      {/* Full-width sticky header */}
      <header className="sticky top-0 z-40 w-full border-b border-stone-200 bg-white/95 backdrop-blur-md">
        <div className="w-full px-4 sm:px-8 h-16 flex items-center justify-between">
          {/* Left: Menu Sidebar Trigger + Brand */}
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Buka Menu Navigasi"
              className="px-3 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-800 transition-colors cursor-pointer flex items-center gap-2"
            >
              <Menu className="w-4 h-4 text-emerald-800" />
              <span className="text-xs font-bold text-stone-800">Menu</span>
            </button>

            {/* Brand Logo */}
            <Link 
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-white shadow-xs">
                <Compass className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg text-stone-950 tracking-tight">Traversi</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {locale === "bm" ? "Travel Versi Anda" : "Your Trip"}
                </span>
              </div>
            </Link>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Language Switcher Button (BM / EN) */}
            <button
              type="button"
              onClick={toggleLocale}
              title={locale === "bm" ? "Switch to English" : "Tukar ke Bahasa Melayu"}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-xs font-bold text-stone-800 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              <span>{locale === "bm" ? "BM" : "EN"}</span>
            </button>

            {/* When NOT logged in: Show Login & Register buttons */}
            {!isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-xs font-bold px-3.5 py-1.5 rounded-xl text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  {locale === "bm" ? "Log Masuk" : "Login"}
                </Link>

                <Link
                  href="/register"
                  className="text-xs font-bold px-4 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white transition-all shadow-xs cursor-pointer"
                >
                  {locale === "bm" ? "Daftar" : "Register"}
                </Link>
              </div>
            ) : (
              /* When LOGGED IN: Show Profile badge only */
              <Link
                href="/profile"
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-950 text-xs font-bold transition-all"
                title={locale === "bm" ? "Lihat Profil & Destinasi Disimpan" : "View Profile & Saved Destinations"}
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-800 text-white text-[11px] font-black flex items-center justify-center">
                  {user?.avatar || user?.name?.[0] || "U"}
                </div>
                <span className="font-bold">{user?.name}</span>
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

      {/* Slide-out Sidebar Drawer with Smooth CSS Transitions */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-stone-950/40 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)} 
        />

        {/* Drawer Panel with hardware-accelerated slide transition */}
        <div 
          className={`relative w-84 max-w-[85vw] bg-white h-full shadow-2xl p-6 flex flex-col justify-between border-r border-stone-200 z-10 transform transition-transform duration-300 ease-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer Top */}
          <div className="space-y-5 overflow-y-auto pr-1">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white flex items-center justify-center shadow-xs">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="font-black text-lg text-stone-950">Traversi</span>
              </div>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links inside Sidebar */}
            <nav className="space-y-1 text-xs font-bold text-stone-700">
              <a
                href="/#masalah"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-stone-50 hover:text-emerald-800 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{locale === "bm" ? "1. Masalah Nyata Belia" : "1. Real Problem Statement"}</span>
              </a>

              <a
                href="/#tonggak"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-stone-50 hover:text-emerald-800 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{locale === "bm" ? "2. Tiga Tonggak Traversi" : "2. Three Core Pillars"}</span>
              </a>

              <a
                href="/#perbandingan"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-stone-50 hover:text-emerald-800 transition-colors"
              >
                <Layers className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{locale === "bm" ? "3. Perbandingan Ekosistem" : "3. Ecosystem Comparison"}</span>
              </a>

              <a
                href="/#architecture"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-stone-50 hover:text-emerald-800 transition-colors"
              >
                <Layers className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{locale === "bm" ? "4. Seni Bina Supabase & AI" : "4. Supabase & AI Architecture"}</span>
              </a>

              <a
                href="/#tech-stack"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-stone-50 hover:text-emerald-800 transition-colors"
              >
                <Cpu className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{locale === "bm" ? "5. Tech Stack (Cloud + AI)" : "5. Tech Stack (Cloud + AI)"}</span>
              </a>

              <a
                href="/#pelaksanaan"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-stone-50 hover:text-emerald-800 transition-colors"
              >
                <Code2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{locale === "bm" ? "6. Formula & Pelaksanaan" : "6. Math Formula & Logic"}</span>
              </a>

              <a
                href="/#cabaran"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-stone-50 hover:text-emerald-800 transition-colors"
              >
                <AlertTriangle className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{locale === "bm" ? "7. Cabaran & Penyelesaian" : "7. Challenges & Solutions"}</span>
              </a>

              <a
                href="/#roadmap"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-stone-50 hover:text-emerald-800 transition-colors"
              >
                <Milestone className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{locale === "bm" ? "8. Pelan Hala Tuju (Roadmap)" : "8. Product Roadmap"}</span>
              </a>

              <a
                href="/#pasukan"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-stone-50 hover:text-emerald-800 transition-colors"
              >
                <Users className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{locale === "bm" ? "9. Pasukan 4 Orang" : "9. 4-Member Team"}</span>
              </a>

              {isLoggedIn && (
                <Link
                  href="/profile"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-stone-50 hover:text-emerald-800 transition-colors border-t border-stone-100 mt-2 pt-2"
                >
                  <User className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{locale === "bm" ? "Profil & Destinasi Disimpan" : "Profile & Saved Items"}</span>
                </Link>
              )}
            </nav>
          </div>

          {/* Drawer Bottom */}
          <div className="pt-4 border-t border-stone-100 space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
              <a
                href="https://github.com/cs-mirakim/traversi"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-stone-900 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub Repo</span>
              </a>
              <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                Hackathon 2026
              </span>
            </div>

            {isLoggedIn ? (
              <div className="flex items-center justify-between pt-1">
                <Link
                  href="/profile"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-2 min-w-0 hover:opacity-80 transition-opacity"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {user?.avatar || "U"}
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-stone-900 truncate">{user?.name}</p>
                    <p className="text-[11px] text-stone-500 truncate">{user?.email}</p>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  title="Log Keluar"
                  className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setSidebarOpen(false)}
                  className="py-2.5 text-center rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-bold text-stone-800"
                >
                  {locale === "bm" ? "Log Masuk" : "Login"}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setSidebarOpen(false)}
                  className="py-2.5 text-center rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-xs"
                >
                  {locale === "bm" ? "Daftar" : "Register"}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

