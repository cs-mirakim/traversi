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

export default function CalculatorPage() {
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
    <div className="min-h-screen bg-[#022c22] text-[#ecfdf5] font-sans flex flex-col selection:bg-emerald-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* TOP BAR / BREADCRUMB */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-7 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-200 hover:text-white transition-colors bg-emerald-950/80 px-3.5 py-2 rounded-xl border border-emerald-800 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Pitch Deck Sistem</span>
          </Link>

          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 bg-emerald-950/80 px-3.5 py-2 rounded-xl border border-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Kalkulator Enjin Aktif</span>
          </div>
        </div>

        {/* INPUT FORM SECTION */}
        <section className="pt-6 pb-12 px-4 sm:px-6 max-w-5xl mx-auto">
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
        <section id="cadangan" className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 border-b border-emerald-800/80 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-700/50">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Hasil Padanan Enjin
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                3 Destinasi Terbaik Muat Bajet
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200/90 mt-1 font-medium">
                Berdasarkan had bajet <strong className="text-white">{formatRM(effectiveBudget)}</strong>{" "}
                {budgetMode === "per_pax" ? `(RM${budget.toLocaleString()} × ${pax} pax)` : `(Jumlah kumpulan ${pax} pax)`}{" "}
                untuk <strong className="text-white">{days} hari</strong> dari lapangan terbang {origin}.
              </p>
            </div>

            <div className="text-xs font-bold text-emerald-300 bg-emerald-950/90 px-3 py-2 rounded-xl border border-emerald-800/80 w-fit">
              Disusun mengikut: <span className="text-white font-extrabold underline">Nilai Paling Optimum &amp; Berbaloi</span>
            </div>
          </div>

          {/* Destination Cards Grid */}
          {isLoading ? (
            <div className="p-12 text-center bg-[#ecfdf5] text-[#022c22] rounded-3xl border-2 border-emerald-300 max-w-xl mx-auto space-y-4 shadow-2xl">
              <div className="w-12 h-12 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin mx-auto" />
              <div>
                <h3 className="text-lg font-black text-[#022c22] mb-1">
                  Mengira Destinasi Sesuai...
                </h3>
                <p className="text-xs font-medium text-emerald-800 max-w-sm mx-auto leading-relaxed">
                  Sedang menyemak kos penerbangan, bilik hotel kongsi, makan harian, data Overpass OSM halal, dan syarat pasport Malaysia.
                </p>
              </div>
            </div>
          ) : recommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
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
            <div className="p-8 text-center bg-[#ecfdf5] text-[#022c22] rounded-3xl border-2 border-emerald-300 max-w-lg mx-auto shadow-2xl">
              <AlertCircle className="w-12 h-12 text-amber-700 mx-auto mb-3" />
              <h3 className="text-lg font-black text-[#022c22] mb-1">Tiada destinasi yang muat dengan bajet ini</h3>
              <p className="text-xs text-emerald-800 mb-5 font-medium leading-relaxed">
                Jumlah bajet {formatRM(effectiveBudget)} mungkin terlalu ketat untuk menampung tiket kapal terbang, hotel {days} hari, dan makan minum. Sila laraskan bajet atau kurangkan hari.
              </p>
              <button
                onClick={() => {
                  setBudget(2500);
                  setBudgetMode("total");
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#022c22] hover:bg-[#064e3b] text-white cursor-pointer transition-colors"
              >
                Tetapkan Semula ke RM2,500 (Standard)
              </button>
            </div>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-emerald-900/60 bg-[#011d17] py-8 px-4 sm:px-6 text-center text-xs text-emerald-300/80 mt-16">
        <div className="max-w-5xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 font-bold text-white">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Traversi (Travel Versi Anda)</span>
          </div>
          <p className="text-emerald-300 max-w-md mx-auto font-medium">
            Dibina khas untuk Averis Hackathon 2026 (18-22 Sept).
          </p>
          <div className="pt-2 text-[11px] text-emerald-400/70 border-t border-emerald-900/40 font-medium">
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
