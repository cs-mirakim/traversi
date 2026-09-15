"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Compass, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  Globe, 
  Calculator, 
  UtensilsCrossed 
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function LoginPage() {
  const router = useRouter();
  const { isLoggedIn, login, loginWithGoogle } = useAuth();
  const { locale, toggleLocale } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // If already logged in, redirect straight to profile
  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/profile");
    }
  }, [isLoggedIn, router]);

  const slides = [
    {
      badgeBm: "01 • Formula Bajet Terbalik 4D",
      badgeEn: "01 • 4D Reverse-Budgeting Math",
      titleBm: "Kau Masuk Bajet Poket, Kami Kira Sampai Cukup.",
      titleEn: "Enter Your Pocket Budget, We Fit Every Ringgit.",
      descBm: "Pecahan komprehensif merangkumi tiket kapal terbang pergi-balik, bilik hotel kongsi berdua ceil(pax/2), makan halal harian, dan Grab.",
      descEn: "Comprehensive modeling covering return airfare, twin-sharing hotel rooms ceil(pax/2), daily halal dining, and local rideshare.",
      statBm: "4 Dimensi Kos • 10% Margin Keselamatan",
      statEn: "4D Cost Model • Dynamic 10% Safety Margin",
      icon: Calculator,
    },
    {
      badgeBm: "02 • Pasport Malaysia Intelligence",
      badgeEn: "02 • Malaysian Passport Intelligence",
      titleBm: "Semakan Bebas Visa Khusus Warganegara Malaysia.",
      titleEn: "Instant Visa-Exemption Data for Malaysians.",
      descBm: "Semakan status kemasukan tanpa visa dan eVisa bagi 180+ negara serta pengesahan penerbangan domestik MyKad secara automatik.",
      descEn: "Real-time visa-free privilege rules across 180+ countries and domestic MyKad flights without outdated travel guides.",
      statBm: "180+ Destinasi Disemak • Status Sah Rasmi",
      statEn: "180+ Destinations Mapped • Official Policy",
      icon: ShieldCheck,
    },
    {
      badgeBm: "03 • Audit Halal Geospatial & AI",
      badgeEn: "03 • Geospatial Halal & AI Engine",
      titleBm: "Kueri OpenStreetMap & Sentimen Gemini AI.",
      titleEn: "Live OpenStreetMap Overpass & Gemini AI.",
      descBm: "Mengesan bilangan nod makanan diet:halal sebenar di bandar destinasi secara geospatial, dinilai bersama model Gemini 1.5 Flash.",
      descEn: "Spatial density query of real diet:halal food nodes around destination center, verified with Gemini 1.5 Flash reasoning.",
      statBm: "OpenStreetMap + Gemini AI • Audit Spatial Nyata",
      statEn: "OpenStreetMap + Gemini AI • Real Spatial Nodes",
      icon: UtensilsCrossed,
    },
  ];

  // Auto-slide rotation every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleGoogle = () => {
    setIsLoading(true);
    loginWithGoogle();
    router.push("/profile");
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    login("hangtuah@traversi.my", "Hang Tuah");
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-[#0f172a] flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* =========================================================================
            LEFT COLUMN: INTERACTIVE TRAVERSI SHOWCASE SLIDER (lg:col-span-5)
        ========================================================================= */}
        <div className="hidden lg:flex lg:col-span-5 bg-[#022c22] text-white p-8 sm:p-10 flex-col justify-between relative overflow-hidden select-none">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-900/40 rounded-full blur-2xl pointer-events-none" />

          {/* Top Brand Header */}
          <div className="relative z-10 space-y-2">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-emerald-700 flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:rotate-45">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="font-black text-xl tracking-tight text-white">Traversi</span>
                <p className="text-[10px] font-bold text-emerald-400">
                  {locale === "bm" ? "Travel Versi Anda" : "Your Trip, Your Version"}
                </p>
              </div>
            </Link>
            <div className="pt-2">
              <span className="text-[10px] font-mono font-bold bg-emerald-900/70 text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-700/50 uppercase tracking-wider">
                Averis x Monash 2026 &bull; Cloud + AI
              </span>
            </div>
          </div>

          {/* Middle: Active Slide Content */}
          <div className="relative z-10 py-6 space-y-4">
            {slides.map((slide, idx) => {
              const Icon = slide.icon;
              if (idx !== activeSlide) return null;
              return (
                <div key={idx} className="space-y-3 animate-fadeIn">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/90 text-emerald-300 border border-emerald-700/60 text-xs font-bold uppercase tracking-wider">
                    <Icon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{locale === "bm" ? slide.badgeBm : slide.badgeEn}</span>
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight">
                    {locale === "bm" ? slide.titleBm : slide.titleEn}
                  </h2>
                  <p className="text-xs text-emerald-200/80 font-medium leading-relaxed">
                    {locale === "bm" ? slide.descBm : slide.descEn}
                  </p>
                  <div className="pt-2">
                    <span className="inline-block text-[11px] font-mono font-bold text-emerald-300 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-800/80 shadow-2xs">
                      {locale === "bm" ? slide.statBm : slide.statEn}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom: Carousel Controls & Pagination Dots */}
          <div className="relative z-10 pt-4 border-t border-emerald-900/60 flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeSlide === idx ? "w-7 bg-emerald-400" : "w-2 bg-emerald-800 hover:bg-emerald-700"
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                aria-label="Previous Slide"
                className="w-7 h-7 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-300 border border-emerald-700/50 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
                aria-label="Next Slide"
                className="w-7 h-7 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-300 border border-emerald-700/50 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: SIGN IN FORM (lg:col-span-7)
        ========================================================================= */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          {/* Top Bar Navigation: Back & Language Switcher */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-stone-950 bg-stone-50 hover:bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{locale === "bm" ? "Kembali ke Utama" : "Back to Home"}</span>
            </Link>

            <button
              type="button"
              onClick={toggleLocale}
              title={locale === "bm" ? "Switch to English" : "Tukar ke Bahasa Melayu"}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-xs font-bold text-stone-800 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              <span>{locale === "bm" ? "BM" : "EN"}</span>
            </button>
          </div>

          {/* Heading */}
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>{locale === "bm" ? "Akses Segera Tanpa Kata Laluan" : "Passwordless Instant Access"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
              {locale === "bm" ? "Log Masuk ke Traversi" : "Sign In to Traversi"}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed">
              {locale === "bm"
                ? "Gunakan akaun Google atau masuk pantas dengan profil demo Hang Tuah."
                : "Sign in with Google or use one-click Hang Tuah instant demo."}
            </p>
          </div>

          {/* Direct Action Buttons */}
          <div className="space-y-3">
            {/* 1. Google 1-Click Button */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-2xl border border-stone-300 bg-white hover:bg-stone-50 font-bold text-xs sm:text-sm text-stone-800 flex items-center justify-center gap-3 transition-all shadow-2xs hover:shadow-sm cursor-pointer active:scale-[0.99]"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
              <span>{locale === "bm" ? "Log Masuk dengan Google" : "Sign In with Google"}</span>
            </button>

            {/* 2. Instant Demo Login Button */}
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer active:scale-[0.99]"
            >
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{locale === "bm" ? "Masuk Pantas Sebagai Hang Tuah (Demo)" : "Instant Demo Sign In (Hang Tuah)"}</span>
            </button>
          </div>

          {/* Benefits Feature List */}
          <div className="pt-2 border-t border-stone-100 space-y-2 text-stone-600 text-xs font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>{locale === "bm" ? "Simpan dan bintangkan destinasi percutian kegemaran" : "Save and star your favorite travel destinations"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>{locale === "bm" ? "Rekod carian bajet disimpan automatik" : "Automatic budget search history tracking"}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>{locale === "bm" ? "Log masuk selamat berasaskan Supabase Auth" : "Secure cloud authentication via Supabase"}</span>
            </div>
          </div>

          {/* Switch to Sign Up */}
          <div className="pt-3 border-t border-stone-100 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <p className="text-stone-500 font-medium">
              {locale === "bm" ? "Belum mempunyai akaun? " : "Don't have an account? "}
              <Link href="/register" className="font-bold text-emerald-800 hover:text-emerald-950 underline transition-colors">
                {locale === "bm" ? "Daftar Akaun di sini" : "Sign Up here"}
              </Link>
            </p>
            <span className="text-[10px] text-stone-400 font-mono">100% Free &bull; No CC Required</span>
          </div>
        </div>

      </div>
    </div>
  );
}
