"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Compass, ArrowLeft, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function RegisterPage() {
  const router = useRouter();
  const { isLoggedIn, login, loginWithGoogle } = useAuth();
  const { locale } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect straight to profile
  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/profile");
    }
  }, [isLoggedIn, router]);

  const handleGoogle = () => {
    setIsLoading(true);
    loginWithGoogle();
    router.push("/profile");
  };

  const handleDemoRegister = () => {
    setIsLoading(true);
    login("hangtuah@traversi.my", "Hang Tuah");
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-[#0f172a] flex flex-col justify-between p-4 sm:p-6">
      {/* Top Bar */}
      <div className="max-w-md mx-auto w-full pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{locale === "bm" ? "Kembali ke Utama" : "Back to Home"}</span>
        </Link>
      </div>

      {/* Main Register Card - Pure 1-Click Google & Instant Setup */}
      <div className="max-w-md mx-auto w-full my-auto py-6">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl p-6 sm:p-8 space-y-6">
          {/* Brand Icon & Heading */}
          <div className="text-center space-y-2">
            <Link 
              href="/" 
              className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-800 text-white shadow-md mx-auto mb-2 group"
            >
              <Compass className="w-6 h-6 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
              {locale === "bm" ? "Daftar Akaun Baru" : "Create an Account"}
            </h1>
            <p className="text-xs text-stone-600 font-medium leading-relaxed">
              {locale === "bm"
                ? "Daftar serta-merta dengan akaun Google tanpa perlu mengisi borang manual."
                : "Instant signup using your Google account with zero manual form filling."}
            </p>
          </div>

          {/* Direct Auth Action Buttons */}
          <div className="space-y-3 pt-2">
            {/* 1. Google One-Click Button */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-2xl border border-stone-200 bg-white hover:bg-stone-50 font-bold text-xs sm:text-sm text-stone-800 flex items-center justify-center gap-3 transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-[0.99]"
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
              <span>{locale === "bm" ? "Daftar dengan Google" : "Sign up with Google"}</span>
            </button>

            {/* 2. Instant Demo Register Button */}
            <button
              type="button"
              onClick={handleDemoRegister}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer active:scale-[0.99]"
            >
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{locale === "bm" ? "Daftar Segera Sebagai Hang Tuah (Demo)" : "Instant Demo Register (Hang Tuah)"}</span>
            </button>
          </div>

          {/* Benefits Feature List */}
          <div className="pt-3 border-t border-stone-100 space-y-2 text-stone-600 text-xs font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>{locale === "bm" ? "100% percuma tanpa langganan tersembunyi" : "100% free with zero hidden costs"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>{locale === "bm" ? "Simpan carian bajet dan destinasi kegemaran" : "Bookmark trips and track past search calculations"}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>{locale === "bm" ? "Akses selamat dan pantas melalui Supabase Cloud" : "Fast, secured cloud profile on Supabase"}</span>
            </div>
          </div>

          {/* Footer Switch to Login */}
          <div className="text-center pt-1 border-t border-stone-100">
            <p className="text-xs text-stone-500 font-medium">
              {locale === "bm" ? "Sudah mempunyai akaun? " : "Already have an account? "}
              <Link href="/login" className="font-bold text-emerald-800 hover:text-emerald-950 underline transition-colors">
                {locale === "bm" ? "Log masuk di sini" : "Sign in here"}
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="text-center py-4 text-[11px] text-stone-400">
        Traversi &bull; Averis Hackathon 2026 Cloud + AI Edition
      </div>
    </div>
  );
}
