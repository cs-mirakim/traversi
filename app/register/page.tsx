"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Compass, UserPlus, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register, loginWithGoogle } = useAuth();
  const { locale } = useLanguage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      register(name, email);
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/profile");
      }, 600);
    }, 500);
  };

  const handleGoogle = () => {
    setIsLoading(true);
    setTimeout(() => {
      loginWithGoogle();
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/profile");
      }, 600);
    }, 500);
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

      {/* Main Register Card */}
      <div className="max-w-md mx-auto w-full my-auto py-8">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <Link href="/" className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-800 text-white shadow-md mx-auto mb-2">
              <Compass className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
              {locale === "bm" ? "Daftar Akaun Baru" : "Create an Account"}
            </h1>
            <p className="text-xs text-stone-600 font-medium">
              {locale === "bm"
                ? "Simpan destinasi kegemaran dan rekod carian bajet anda."
                : "Save your favorite destinations and travel budget records."}
            </p>
          </div>

          {success ? (
            <div className="py-8 text-center space-y-2 animate-in fade-in">
              <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
              <p className="font-bold text-stone-900 text-base">
                {locale === "bm" ? "Pendaftaran Berjaya!" : "Registration Complete!"}
              </p>
              <p className="text-xs text-stone-500">
                {locale === "bm" ? "Menyediakan papan pemuka profil anda..." : "Preparing your dashboard..."}
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogle}
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 font-bold text-xs sm:text-sm text-stone-800 flex items-center justify-center gap-2.5 transition-all shadow-2xs cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
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

              <div className="relative text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-200" />
                </div>
                <span className="relative bg-white px-3 text-[11px] font-semibold text-stone-600 uppercase tracking-wider">
                  {locale === "bm" ? "atau guna emel" : "or with email"}
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    {locale === "bm" ? "Nama Penuh" : "Full Name"}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Amir Hakim"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-stone-50/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    {locale === "bm" ? "Alamat Emel" : "Email Address"}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="amir@contoh.com"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-stone-50/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    {locale === "bm" ? "Cipta Kata Laluan" : "Create Password"}
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-stone-50/50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{isLoading ? (locale === "bm" ? "Mendaftar..." : "Registering...") : (locale === "bm" ? "Daftar Percuma" : "Register for Free")}</span>
                </button>
              </form>

              {/* Login link */}
              <div className="text-center pt-2 border-t border-stone-100">
                <p className="text-xs text-stone-600">
                  {locale === "bm" ? "Sudah mempunyai akaun? " : "Already have an account? "}
                  <Link href="/login" className="font-bold text-emerald-800 hover:underline">
                    {locale === "bm" ? "Log masuk di sini" : "Sign in here"}
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Simple Footer Note */}
      <div className="text-center text-xs text-stone-600 pb-4">
        Traversi &bull; Averis Hackathon 2026
      </div>
    </div>
  );
}
