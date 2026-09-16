"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
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
  ExternalLink,
  Sparkles,
  Server,
  PlayCircle
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import UserAvatar from "@/components/UserAvatar";

function GithubIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

function GoogleIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale, toggleLocale } = useLanguage();
  const { user, isLoggedIn, logout, loginWithGoogle } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("overview");

  // Track active section on scroll for scrollspy highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = [
        "overview",
        "problem-statement",
        "core-pillars",
        "market-benchmark",
        "technical-architecture",
        "tech-stack",
        "implementation-details",
        "challenges-faced",
        "future-roadmap",
        "team-governance",
        "live-prototype",
      ];

      const scrollPosition = window.scrollY + 120;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    router.push("/");
  };

  // Official Pitch Deck sections strictly matching Averis Hackathon 2026 Documentation Guidelines
  const averisSections = [
    {
      num: "00",
      label: locale === "bm" ? "Pengenalan & Nilai" : "Overview & Value Prop",
      sub: locale === "bm" ? "Enjin Reverse-Budgeting" : "Reverse-Budgeting Engine",
      href: "/#overview",
      icon: Sparkles,
    },
    {
      num: "01",
      label: locale === "bm" ? "Penyataan Masalah" : "Problem Statement",
      sub: locale === "bm" ? "Perangkap Kos Sebenar Belia" : "The Core Youth Expense Trap",
      href: "/#problem-statement",
      icon: BookOpen,
    },
    {
      num: "02",
      label: locale === "bm" ? "3 Tonggak Utama" : "Three Core Pillars",
      sub: locale === "bm" ? "4D Cost, Visa MY & Halal OSM" : "4D Cost, Visa Free & Halal",
      href: "/#core-pillars",
      icon: ShieldCheck,
    },
    {
      num: "03",
      label: locale === "bm" ? "Perbandingan Pasaran" : "Market Benchmark",
      sub: locale === "bm" ? "Traversi vs Skyscanner/Flights" : "Traversi vs Booking Engines",
      href: "/#market-benchmark",
      icon: Layers,
    },
    {
      num: "04",
      label: locale === "bm" ? "Seni Bina Teknikal" : "Technical Architecture",
      sub: locale === "bm" ? "Supabase Cloud + Vercel + Gemini" : "Cloud Caching & AI Engine",
      href: "/#technical-architecture",
      icon: Server,
    },
    {
      num: "05",
      label: locale === "bm" ? "Susunan Teknologi" : "Technical Stack",
      sub: locale === "bm" ? "Pematuhan Averis Cloud & AI" : "Cloud & AI Free-Tier Audit",
      href: "/#tech-stack",
      icon: Cpu,
    },
    {
      num: "06",
      label: locale === "bm" ? "Butiran Pelaksanaan" : "Implementation Details",
      sub: locale === "bm" ? "Formula Matematik 4 Dimensi" : "4D Math Model & Scoring",
      href: "/#implementation-details",
      icon: Code2,
    },
    {
      num: "07",
      label: locale === "bm" ? "Cabaran Dihadapi" : "Challenges Faced",
      sub: locale === "bm" ? "Had Kuota API & Ketepatan Halal" : "API Quotas & Solutions",
      href: "/#challenges-faced",
      icon: AlertTriangle,
    },
    {
      num: "08",
      label: locale === "bm" ? "Pelan Hala Tuju" : "Future Roadmap",
      sub: locale === "bm" ? "Pelan 3 Fasa Komersial" : "3-Phase Commercial Scale",
      href: "/#future-roadmap",
      icon: Milestone,
    },
    {
      num: "09",
      label: locale === "bm" ? "Pasukan Pembangun" : "Team Governance",
      sub: locale === "bm" ? "4 Orang Ahli Pasukan" : "4-Member Engineering Team",
      href: "/#team-governance",
      icon: Users,
    },
    {
      num: "10",
      label: locale === "bm" ? "Prototaip & Pautan" : "Live Prototype & Demo",
      sub: locale === "bm" ? "Kalkulator, GitHub & Live URL" : "App, Repo & Video Demo",
      href: "/#live-prototype",
      icon: Calculator,
    },
  ];

  return (
    <>
      {/* =========================================================================
          1. PERMANENT DESKTOP SIDEBAR (ALWAYS VISIBLE ON DESKTOP & LAPTOP md+)
      ========================================================================= */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-72 bg-white border-r border-stone-200 z-40 overflow-y-auto select-none shadow-xs">
        {/* Top Brand Header (Exactly h-16 and border-b border-stone-200 to align seamlessly with top header) */}
        <div className="h-16 px-5 border-b border-stone-200 flex items-center justify-between shrink-0">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-white shadow-xs transition-transform duration-300 group-hover:rotate-45">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg text-stone-950 tracking-tight">Traversi</span>
              </div>
              <p className="text-[10px] font-bold text-emerald-800 leading-none">
                {locale === "bm" ? "Travel Versi Anda" : "Your Trip, Your Version"}
              </p>
            </div>
          </Link>
        </div>

        {/* Middle: Pitch Deck Navigation strictly matching Averis Guidelines */}
        <div className="flex-1 p-3 space-y-1">
          <div className="px-2.5 py-1.5 text-[10px] font-black text-stone-400 uppercase tracking-wider flex items-center justify-between">
            <span>{locale === "bm" ? "Struktur Pitch Deck" : "Pitch Deck Structure"}</span>
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-800 rounded border border-emerald-200">
              {locale === "bm" ? "10 Seksyen" : "10 Sections"}
            </span>
          </div>

          <nav className="space-y-1">
            {averisSections.map((item) => {
              const sectionId = item.href.replace("/#", "");
              const isActive = pathname === "/" && activeSection === sectionId;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-bold transition-all group ${
                    isActive
                      ? "bg-emerald-50 text-emerald-950 border border-emerald-300 shadow-2xs font-extrabold"
                      : "text-stone-700 hover:text-stone-950 hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200/60"
                  }`}
                >
                  <span
                    className={`w-6 h-5 rounded-md font-mono text-[10px] font-black flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? "bg-emerald-800 text-white shadow-2xs"
                        : "bg-stone-100 text-stone-600 group-hover:bg-emerald-800 group-hover:text-white"
                    }`}
                  >
                    {item.num}
                  </span>
                  <div className="min-w-0 truncate">
                    <p
                      className={`truncate leading-tight ${
                        isActive ? "text-emerald-950 font-black" : "text-stone-900 group-hover:text-emerald-950"
                      }`}
                    >
                      {item.label}
                    </p>
                    <p
                      className={`text-[10px] truncate font-medium ${
                        isActive ? "text-emerald-800 font-bold" : "text-stone-500 group-hover:text-emerald-800"
                      }`}
                    >
                      {item.sub}
                    </p>
                  </div>
                </a>
              );
            })}

            {isLoggedIn && (
              <Link
                href="/profile"
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-bold transition-colors border-t border-stone-100 mt-2 pt-2 ${
                  pathname === "/profile"
                    ? "bg-emerald-50 text-emerald-900 font-extrabold"
                    : "text-stone-700 hover:bg-stone-50 hover:text-emerald-800"
                }`}
              >
                <User className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{locale === "bm" ? "Profil & Destinasi Disimpan" : "Profile & Saved Destinations"}</span>
              </Link>
            )}
          </nav>
        </div>

        {/* Bottom: Language Switcher, GitHub Repo & Auth Status */}
        <div className="p-4 border-t border-stone-100 space-y-3 bg-stone-50/50">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={toggleLocale}
              title={locale === "bm" ? "Switch to English" : "Tukar ke Bahasa Melayu"}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-100 text-xs font-bold text-stone-800 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              <span>{locale === "bm" ? "BM (Bahasa)" : "EN (English)"}</span>
            </button>

            <a
              href="https://github.com/cs-mirakim/traversi"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-950 font-medium transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Auth Status in Sidebar */}
          {isLoggedIn ? (
            <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-stone-200">
              <Link
                href="/profile"
                className="flex items-center gap-2.5 min-w-0 hover:opacity-80 transition-opacity"
              >
                <UserAvatar user={user} size="sm" />
                <div className="truncate">
                  <p className="text-xs font-bold text-stone-900 truncate">{user?.name}</p>
                  <p className="text-[10px] text-stone-500 truncate">{user?.email}</p>
                </div>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                title={locale === "bm" ? "Log Keluar" : "Log Out"}
                className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/login"
                className="py-2 text-center rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-xs font-bold text-stone-800 shadow-2xs transition-colors"
              >
                {locale === "bm" ? "Log Masuk" : "Sign In"}
              </Link>
              <Link
                href="/register"
                className="py-2 text-center rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-xs transition-colors"
              >
                {locale === "bm" ? "Daftar Akaun" : "Sign Up"}
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* =========================================================================
          2. TOP HEADER FOR MAIN CONTENT (OFFSET BY md:pl-72 FOR DESKTOP SIDEBAR)
      ========================================================================= */}
      <header className="sticky top-0 z-30 w-full md:pl-72 h-16 border-b border-stone-200 bg-white/95 backdrop-blur-md flex items-center">
        <div className="w-full px-4 sm:px-8 h-full flex items-center justify-between">
          {/* Mobile Only: Menu Trigger + Brand */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Buka Menu"
              className="p-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-800 transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5 text-emerald-800" />
            </button>

            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-800 flex items-center justify-center text-white shadow-xs">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-black text-lg text-stone-950">Traversi</span>
            </Link>
          </div>

          {/* Desktop Left Breadcrumb / Context */}
          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-stone-500">
            <span className="text-emerald-800 font-extrabold">Averis x Monash Hackathon 2026</span>
            <span>&bull;</span>
            <span className="text-stone-700">Cloud + AI Edition</span>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLocale}
              title={locale === "bm" ? "Switch to English" : "Tukar ke Bahasa Melayu"}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-xs font-bold text-stone-800 shadow-2xs transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              <span>{locale === "bm" ? "BM" : "EN"}</span>
            </button>

            {/* User Profile / Auth State */}
            {!isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-xs font-bold px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-950 shadow-2xs transition-colors cursor-pointer"
                >
                  {locale === "bm" ? "Log Masuk" : "Sign In"}
                </Link>
                <Link
                  href="/register"
                  className="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white transition-all shadow-xs cursor-pointer"
                >
                  {locale === "bm" ? "Daftar Akaun" : "Sign Up"}
                </Link>
              </div>
            ) : (
              <Link
                href="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-950 text-xs font-bold transition-all"
                title={locale === "bm" ? "Lihat Profil & Destinasi Disimpan" : "View Profile & Saved Destinations"}
              >
                <UserAvatar user={user} size="xs" />
                <span className="hidden sm:inline font-bold">{user?.name}</span>
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

      {/* =========================================================================
          3. MOBILE ONLY SLIDE DRAWER (< md)
      ========================================================================= */}
      <div 
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div 
          className="absolute inset-0 bg-stone-950/40 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)} 
        />

        <div 
          className={`relative w-80 max-w-[85vw] bg-white h-full shadow-2xl p-6 flex flex-col justify-between border-r border-stone-200 z-10 transform transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="space-y-4 overflow-y-auto pr-1">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="font-black text-lg text-stone-950">Traversi</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-1 text-xs font-bold text-stone-700">
              {averisSections.map((item) => {
                const sectionId = item.href.replace("/#", "");
                const isActive = pathname === "/" && activeSection === sectionId;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
                      isActive
                        ? "bg-emerald-50 text-emerald-950 font-extrabold border border-emerald-300"
                        : "hover:bg-emerald-50/70 hover:text-emerald-900 border border-transparent"
                    }`}
                  >
                    <span
                      className={`w-6 h-5 rounded-md font-mono text-[10px] font-black flex items-center justify-center shrink-0 ${
                        isActive
                          ? "bg-emerald-800 text-white"
                          : "bg-stone-100 text-stone-700"
                      }`}
                    >
                      {item.num}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="pt-3 border-t border-stone-100 space-y-2">
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-50 border border-stone-200"
                >
                  <UserAvatar user={user} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-stone-900 truncate">{user?.name}</p>
                    <p className="text-[10px] text-stone-500 truncate">{user?.email}</p>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-2.5 text-center text-xs font-bold text-rose-600 bg-rose-50 rounded-xl cursor-pointer"
                >
                  {locale === "bm" ? "Log Keluar" : "Log Out"}
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center rounded-xl border border-stone-300 bg-white text-xs font-bold text-stone-800 shadow-2xs"
                >
                  {locale === "bm" ? "Log Masuk" : "Sign In"}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center rounded-xl bg-emerald-800 text-white text-xs font-bold shadow-xs"
                >
                  {locale === "bm" ? "Daftar Akaun" : "Sign Up"}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
