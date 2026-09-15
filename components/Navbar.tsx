"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  Code2, 
  Calendar, 
  Users,
  Calculator
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { locale, toggleLocale } = useLanguage();
  const { user, isLoggedIn, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-stone-200 bg-white/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Left: Hamburger Sidebar Toggle + Brand */}
          <div className="flex items-center gap-3">
            {/* Sidebar Menu Button */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Buka Menu Navigasi"
              className="p-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 hover:text-stone-950 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Menu className="w-4 h-4 text-emerald-800" />
              <span className="text-xs font-bold hidden sm:inline text-stone-700">Menu</span>
            </button>

            {/* Brand */}
            <Link 
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-white shadow-xs">
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
          </div>

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

            {/* If NOT logged in: Show Login & Register buttons linking to dedicated pages */}
            {!isLoggedIn ? (
              <>
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
              </>
            ) : (
              /* If LOGGED IN: DO NOT show login/register buttons! Show Profile Avatar button */
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-950 text-xs font-bold transition-all"
                  title="Lihat Profil & Destinasi Disimpan"
                >
                  <div className="w-6 h-6 rounded-lg bg-emerald-800 text-white text-[11px] font-black flex items-center justify-center">
                    {user?.avatar || user?.name?.[0] || "U"}
                  </div>
                  <span className="hidden sm:inline font-bold">{user?.name}</span>
                  {user?.starredDestinations && user.starredDestinations.length > 0 && (
                    <span className="flex items-center gap-0.5 text-[10px] text-amber-700 bg-amber-100/80 px-1.5 py-0.2 rounded font-bold">
                      <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                      <span>{user.starredDestinations.length}</span>
                    </span>
                  )}
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Slide-out Sidebar Drawer */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop Click */}
          <div className="fixed inset-0" onClick={() => setSidebarOpen(false)} />

          {/* Drawer Panel */}
          <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl p-6 flex flex-col justify-between border-r border-stone-200 z-10 animate-in slide-in-from-left duration-250">
            {/* Drawer Header */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white flex items-center justify-center">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span className="font-black text-lg text-stone-950">Traversi</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links inside Sidebar */}
              <nav className="space-y-1 text-sm font-bold text-stone-700">
                <Link
                  href="/"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-stone-50 hover:text-emerald-800 transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <span>{locale === "bm" ? "Pengenalan Sistem" : "System Overview"}</span>
                </Link>

                <a
                  href="/#perbandingan"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-stone-50 hover:text-emerald-800 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>{locale === "bm" ? "Perbandingan Ekosistem" : "Comparison Table"}</span>
                </a>

                <a
                  href="/#architecture"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-stone-50 hover:text-emerald-800 transition-colors"
                >
                  <Layers className="w-4 h-4 text-emerald-700" />
                  <span>{locale === "bm" ? "Seni Bina Supabase & AI" : "Cloud & AI Architecture"}</span>
                </a>

                <Link
                  href="/kalkulator"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 transition-colors"
                >
                  <Calculator className="w-4 h-4 text-emerald-800" />
                  <span>{locale === "bm" ? "Kalkulator Bajet" : "Budget Calculator"}</span>
                </Link>

                {isLoggedIn && (
                  <Link
                    href="/profile"
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-stone-50 hover:text-emerald-800 transition-colors"
                  >
                    <User className="w-4 h-4 text-emerald-700" />
                    <span>{locale === "bm" ? "Profil & Destinasi Pilihan" : "Profile & Saved Items"}</span>
                  </Link>
                )}
              </nav>
            </div>

            {/* Drawer Bottom */}
            <div className="pt-4 border-t border-stone-100 space-y-3">
              {isLoggedIn ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {user?.avatar || "U"}
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-stone-900 truncate">{user?.name}</p>
                      <p className="text-[11px] text-stone-500 truncate">{user?.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setSidebarOpen(false);
                    }}
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
      )}
    </>
  );
}
