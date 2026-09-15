"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { MOCK_DESTINATIONS } from "@/lib/mockDestinations";
import { formatRM } from "@/lib/utils";
import { 
  User, 
  Star, 
  History, 
  LogOut, 
  Calculator, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Compass,
  Building,
  CheckCircle2,
  Trash2
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoggedIn, logout, toggleStar } = useAuth();
  const { locale } = useLanguage();

  // If not logged in or user logs out, redirect straight to landing page (never show Sign In Required)
  React.useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) {
    return null;
  }

  // Get starred destinations details
  const starredList = MOCK_DESTINATIONS.filter((d) =>
    user.starredDestinations.includes(d.id)
  );

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-[#0f172a] flex flex-col">
      <Navbar />

      <div className="flex-1 md:pl-72">
        <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-10 space-y-8">
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-800 text-white font-black text-2xl flex items-center justify-center shadow-md shrink-0">
              {user.avatar || user.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-stone-950 tracking-tight">
                  {user.name}
                </h1>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {locale === "bm" ? "Ahli Traversi" : "Traversi Member"}
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium">{user.email}</p>
              <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-stone-600">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>{locale === "bm" ? "Pasport Malaysia (MY) Sah" : "Valid Malaysian Passport (MY)"}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/kalkulator"
              className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Calculator className="w-4 h-4" />
              <span>{locale === "bm" ? "Kira Bajet Baru" : "Calculate Trip"}</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>{locale === "bm" ? "Log Keluar" : "Sign Out"}</span>
            </button>
          </div>
        </div>

        {/* Section 1: Starred / Pinned Destinations */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h2 className="text-lg sm:text-xl font-black text-stone-950">
                {locale === "bm" ? "Destinasi Yang Anda Pin / Star" : "Your Starred Destinations"}
              </h2>
            </div>
            <span className="text-xs font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-lg">
              {starredList.length} {locale === "bm" ? "Destinasi Disimpan" : "Saved"}
            </span>
          </div>

          {starredList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {starredList.map((dest) => (
                <div
                  key={dest.id}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="relative h-36 w-full overflow-hidden bg-stone-100">
                    <img
                      src={dest.image}
                      alt={dest.city}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <button
                      onClick={() => toggleStar(dest.id)}
                      title={locale === "bm" ? "Buang dari simpanan" : "Remove from starred"}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-white/90 text-amber-500 hover:bg-white transition-colors cursor-pointer"
                    >
                      <Star className="w-4 h-4 fill-amber-500" />
                    </button>
                    <div className="absolute bottom-2.5 left-3 text-white">
                      <p className="text-xs font-bold">{dest.flag} {dest.country}</p>
                      <p className="text-base font-black">{dest.city}</p>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-stone-600 line-clamp-2 font-medium">
                      {dest.tagline}
                    </p>
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-900">
                        ~{formatRM(dest.flightPriceReturnRM)} tiket pergi-balik
                      </span>
                      <Link
                        href="/kalkulator"
                        className="text-emerald-800 font-bold hover:underline flex items-center gap-0.5"
                      >
                        <span>{locale === "bm" ? "Kira Bajet" : "Plan"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 space-y-2">
              <Star className="w-8 h-8 mx-auto text-stone-300" />
              <p className="text-xs font-semibold">
                {locale === "bm" ? "Anda belum menyimpan sebarang destinasi." : "You haven't starred any destinations yet."}
              </p>
              <Link
                href="/kalkulator"
                className="inline-block text-xs font-bold text-emerald-800 hover:underline pt-1"
              >
                {locale === "bm" ? "Teroka & kira destinasi sekarang &rarr;" : "Explore destinations now &rarr;"}
              </Link>
            </div>
          )}
        </section>

        {/* Section 2: Recent Calculations / Searches */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-800" />
            <h2 className="text-lg sm:text-xl font-black text-stone-950">
              {locale === "bm" ? "Sejarah Kiraan Bajet Anda" : "Recent Budget Calculations"}
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 shadow-2xs">
            {user.searchHistory && user.searchHistory.length > 0 ? (
              user.searchHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-stone-50/70 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      {item.origin}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-stone-900">
                        {formatRM(item.budget)} &bull; {item.days} {locale === "bm" ? "Hari" : "Days"} &bull; {item.pax} Pax
                      </p>
                      <p className="text-xs text-stone-500 font-medium">
                        {locale === "bm" ? `Berlepas dari ${item.origin} • Disimpan pada ${item.date}` : `From ${item.origin} • Saved on ${item.date}`}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/kalkulator"
                    className="px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-white text-xs font-bold text-stone-700 hover:text-stone-900 transition-colors shrink-0"
                  >
                    {locale === "bm" ? "Buka Semula" : "Reopen"}
                  </Link>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-stone-500">
                {locale === "bm" ? "Tiada sejarah carian lampau." : "No calculation history recorded."}
              </div>
            )}
          </div>
        </section>
      </main>

        {/* FOOTER (Compact & Bilingual) */}
        <footer className="border-t border-stone-200 bg-white py-4 px-4 sm:px-6 text-center text-xs text-stone-600 md:pl-72">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 font-bold text-stone-900">
              <Compass className="w-4 h-4 text-emerald-800 shrink-0" />
              <span>Traversi &bull; {locale === "bm" ? "Travel Versi Anda" : "Your Trip, Your Version"}</span>
              <span className="text-stone-300 hidden sm:inline">|</span>
              <span className="text-stone-500 font-medium hidden sm:inline">Averis x Monash Hackathon 2026</span>
            </div>
            <div className="text-[11px] text-stone-600 font-medium">
              {locale === "bm" ? "Pasukan 4 Orang: " : "4-Member Team: "}
              <strong className="text-stone-800">Amir Hakim</strong> &bull; <strong className="text-stone-800">Moi</strong> &bull; <strong className="text-stone-800">Eqhlas</strong> &bull; <strong className="text-stone-800">Paan</strong>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

