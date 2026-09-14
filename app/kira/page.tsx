"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import BudgetForm from "@/components/BudgetForm";
import DestinationCard from "@/components/DestinationCard";
import ItineraryModal from "@/components/ItineraryModal";
import { RecommendationResult } from "@/lib/mockDestinations";
import { formatRM } from "@/lib/utils";
import { Compass, ShieldCheck, UtensilsCrossed, Check, AlertCircle, ArrowLeft } from "lucide-react";

export default function CalculatorPage() {
  // State for search query
  const [budget, setBudget] = useState<number>(2500);
  const [budgetMode, setBudgetMode] = useState<"per_pax" | "total">("total");
  const [days, setDays] = useState<number>(4);
  const [vibe, setVibe] = useState<string>("all");
  const [pax, setPax] = useState<number>(1);
  const [origin, setOrigin] = useState<string>("KUL (KLIA / KLIA2)");

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
    <div className="min-h-screen bg-[#FBFBFA] text-stone-900 font-sans flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* TOP BAR / BREADCRUMB */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-stone-950 transition-colors bg-white px-3 py-1.5 rounded-lg border border-stone-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Pengenalan Sistem</span>
          </Link>

          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <Compass className="w-3.5 h-3.5 text-emerald-800" />
            <span>Mod Kalkulator Aktif</span>
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
        <section id="cadangan" className="py-10 px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8 border-b border-stone-200 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Keputusan Cadangan Padanan
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
                3 Destinasi Terbaik Muat Bajet
              </h2>
              <p className="text-xs sm:text-sm text-stone-700 mt-1 font-medium">
                Berdasarkan had bajet <strong className="text-stone-950">{formatRM(effectiveBudget)}</strong>{" "}
                {budgetMode === "per_pax" ? `(RM${budget.toLocaleString()} × ${pax} pax)` : `(Jumlah kumpulan ${pax} pax)`}{" "}
                untuk <strong className="text-stone-950">{days} hari</strong> dari {origin}.
              </p>
            </div>

            <div className="text-xs font-bold text-stone-800">
              Disusun mengikut: <span className="text-emerald-800 underline">Nilai Paling Optimum &amp; Berbaloi</span>
            </div>
          </div>

          {/* Destination Cards Grid */}
          {isLoading ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 max-w-xl mx-auto space-y-4 shadow-sm">
              <div className="w-10 h-10 border-3 border-emerald-800/20 border-t-emerald-800 rounded-full animate-spin mx-auto" />
              <div>
                <h3 className="text-base font-bold text-stone-950 mb-1">
                  Mengira Destinasi Sesuai...
                </h3>
                <p className="text-xs text-stone-700 max-w-sm mx-auto leading-relaxed">
                  Sedang menapis tambang penerbangan terkini, kos hotel, makan harian, dan pengangkutan untuk bajet {formatRM(effectiveBudget)}.
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
            <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 max-w-lg mx-auto shadow-xs">
              <AlertCircle className="w-10 h-10 text-amber-700 mx-auto mb-3" />
              <h3 className="font-bold text-stone-950 mb-1">Tiada destinasi yang muat dengan jumlah bajet ini</h3>
              <p className="text-xs text-stone-700 mb-5 leading-relaxed">
                Jumlah bajet {formatRM(effectiveBudget)} mungkin terlalu ketat untuk menampung tiket penerbangan pergi-balik dan penginapan minimum. Cuba naikkan nilai bajet atau laraskan bilangan hari dan suasana kembara.
              </p>
              <button
                onClick={() => {
                  setBudget(2500);
                  setBudgetMode("total");
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:outline-none"
              >
                Tetapkan Semula Bajet ke RM2,500 (Standard)
              </button>
            </div>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-stone-200 bg-white py-8 px-4 sm:px-6 text-center text-xs text-stone-700 mt-12">
        <div className="max-w-5xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 font-bold text-stone-950">
            <Compass className="w-4 h-4 text-emerald-800" />
            <span>Traversi (Travel DIY RM)</span>
          </div>
          <p className="text-stone-700 max-w-md mx-auto font-medium">
            Dibina khas untuk Averis Hackathon 2026 (18-22 Sept).
          </p>
          <div className="pt-2 text-[11px] text-stone-700 border-t border-stone-100 font-medium">
            Pasukan 4 Orang: <strong>Amir Hakim</strong> • <strong>Moi</strong> • <strong>Eqhlas</strong> • <strong>Paan</strong>
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
