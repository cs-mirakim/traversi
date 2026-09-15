"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import BudgetForm from "@/components/BudgetForm";
import DestinationCard from "@/components/DestinationCard";
import ItineraryModal from "@/components/ItineraryModal";
import { RecommendationResult } from "@/lib/mockDestinations";
import { formatRM } from "@/lib/utils";
import { Compass, Sparkles, AlertCircle, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function CalculatorPage() {
  const { locale } = useLanguage();

  // State for search query
  const [budget, setBudget] = useState<number>(2500);
  const [budgetMode, setBudgetMode] = useState<"per_pax" | "total">("total");
  const [days, setDays] = useState<number>(4);
  const [vibe, setVibe] = useState<string>("all");
  const [pax, setPax] = useState<number>(1);
  const [origin, setOrigin] = useState<string>("KUL");

  // State for recommendations
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedResult, setSelectedResult] = useState<RecommendationResult | null>(null);

  // Effective budget
  const effectiveBudget = budgetMode === "per_pax" ? budget * pax : budget;

  // Fetch recommendations from /api/recommend
  const fetchRecommendations = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ budget, budgetMode, days, vibe, pax, origin }),
      });
      const data = await res.json();
      if (data.success && data.recommendations) {
        setRecommendations(data.recommendations);
      }
    } catch (err) {
      console.error("Error fetching recommendations:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load on mount
  useEffect(() => {
    fetchRecommendations();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRecommendations();
    // Scroll smoothly to results
    const el = document.getElementById("cadangan");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-[#0f172a] font-sans flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      <main className="flex-1 md:pl-72">
        {/* TOP BAR / BREADCRUMB */}
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 pt-7 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-stone-950 transition-colors bg-white px-3.5 py-2 rounded-xl border border-stone-300 shadow-2xs hover:border-stone-400 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{locale === "bm" ? "Kembali ke Pengenalan" : "Back to Overview"}</span>
          </Link>

          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-900 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>{locale === "bm" ? "Kalkulator Bajet Aktif" : "Calculator Active"}</span>
          </div>
        </div>

        {/* INPUT FORM SECTION */}
        <section className="pt-6 pb-12 px-4 sm:px-8 max-w-6xl mx-auto w-full">
          <BudgetForm
            budget={budget}
            budgetMode={budgetMode}
            days={days}
            vibe={vibe}
            pax={pax}
            origin={origin}
            isLoading={isLoading}
            onBudgetChange={setBudget}
            onBudgetModeChange={setBudgetMode}
            onDaysChange={setDays}
            onVibeChange={setVibe}
            onPaxChange={setPax}
            onOriginChange={setOrigin}
            onSubmit={handleSubmit}
          />
        </section>

        {/* RESULTS SECTION */}
        <section id="cadangan" className="py-12 px-4 sm:px-8 max-w-6xl mx-auto w-full border-t border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {locale === "bm" ? "Hasil Padanan Enjin" : "Recommended Destinations"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-2">
                {locale === "bm" ? "3 Destinasi Terbaik Muat Bajet" : "Top 3 Matching Destinations"}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 font-medium">
                {locale === "bm" ? (
                  <>
                    Berdasarkan had bajet <strong className="text-stone-900">{formatRM(effectiveBudget)}</strong>{" "}
                    {budgetMode === "per_pax" ? `(RM${budget.toLocaleString()} × ${pax} pax)` : `(Jumlah kumpulan ${pax} pax)`}{" "}
                    untuk <strong className="text-stone-900">{days} hari</strong> dari lapangan terbang {origin}.
                  </>
                ) : (
                  <>
                    Based on spending limit of <strong className="text-stone-900">{formatRM(effectiveBudget)}</strong>{" "}
                    {budgetMode === "per_pax" ? `(RM${budget.toLocaleString()} × ${pax} pax)` : `(Group total for ${pax} pax)`}{" "}
                    for <strong className="text-stone-900">{days} days</strong> departing from {origin}.
                  </>
                )}
              </p>
            </div>

            <div className="text-xs font-bold text-stone-700 bg-stone-100 px-3 py-2 rounded-xl border border-stone-200 w-fit">
              {locale === "bm" ? "Disusun mengikut: Nilai Paling Optimum & Berbaloi" : "Sorted by: Highest Value & Trip Comfort"}
            </div>
          </div>

          {/* Destination Cards Grid */}
          {isLoading ? (
            <div className="p-12 text-center bg-white text-stone-900 rounded-3xl border border-stone-200 max-w-xl mx-auto space-y-4 shadow-sm">
              <div className="w-10 h-10 border-3 border-emerald-700 border-t-transparent rounded-full animate-spin mx-auto" />
              <div>
                <h3 className="text-base font-bold text-stone-950 mb-1">
                  {locale === "bm" ? "Mengira Destinasi Sesuai..." : "Calculating Matching Destinations..."}
                </h3>
                <p className="text-xs font-medium text-stone-600 max-w-sm mx-auto leading-relaxed">
                  {locale === "bm"
                    ? "Sedang menyemak penerbangan, bilik hotel kongsi, makan harian, data Overpass OSM halal, dan syarat pasport Malaysia."
                    : "Auditing flights, twin-sharing rooms, daily meals, Overpass OSM halal nodes, and passport regulations."}
                </p>
              </div>
            </div>
          ) : recommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {recommendations.map((rec, index) => (
                <DestinationCard
                  key={rec.destination.id}
                  result={rec}
                  budgetInput={effectiveBudget}
                  daysInput={days}
                  paxInput={pax}
                  rank={index + 1}
                  onSelect={(r) => setSelectedResult(r)}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white text-stone-900 rounded-3xl border border-stone-200 max-w-lg mx-auto shadow-sm">
              <AlertCircle className="w-10 h-10 text-amber-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-stone-950 mb-1">
                {locale === "bm" ? "Tiada destinasi yang muat dengan bajet ini" : "No destinations fit within this budget"}
              </h3>
              <p className="text-xs text-stone-600 mb-5 font-medium leading-relaxed">
                {locale === "bm"
                  ? `Jumlah bajet ${formatRM(effectiveBudget)} mungkin terlalu ketat untuk menampung tiket kapal terbang, hotel ${days} hari, dan makan minum. Sila laraskan bajet atau kurangkan hari.`
                  : `A budget of ${formatRM(effectiveBudget)} is insufficient to cover return airfare, hotel for ${days} days, and dining. Try increasing your budget or reducing duration.`}
              </p>
              <button
                onClick={() => {
                  setBudget(2500);
                  setBudgetMode("total");
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white cursor-pointer transition-colors"
              >
                {locale === "bm" ? "Tetapkan Semula ke RM2,500" : "Reset to RM2,500"}
              </button>
            </div>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-stone-200 bg-white py-8 px-4 sm:px-6 text-center text-xs text-stone-500 mt-16">
        <div className="max-w-5xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 font-bold text-stone-900">
            <Compass className="w-4 h-4 text-emerald-800" />
            <span>Traversi &bull; {locale === "bm" ? "Travel Versi Anda" : "Your Trip, Your Version"}</span>
          </div>
          <p className="text-stone-500 max-w-md mx-auto">
            Averis Hackathon 2026
          </p>
          <div className="pt-2 text-[11px] text-stone-400 border-t border-stone-100">
            Pasukan 4 Orang: <strong>Amir Hakim</strong> &bull; <strong>Moi</strong> &bull; <strong>Eqhlas</strong> &bull; <strong>Paan</strong>
          </div>
        </div>
      </footer>

      {/* ITINERARY MODAL */}
      <ItineraryModal
        result={selectedResult}
        budgetInput={effectiveBudget}
        daysInput={days}
        paxInput={pax}
        onClose={() => setSelectedResult(null)}
      />
    </div>
  );
}
