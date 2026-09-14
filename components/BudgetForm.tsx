"use client";

import React from "react";
import { 
  Sliders, 
  Calendar, 
  Users, 
  MapPin, 
  Search, 
  Layers, 
  Compass, 
  Palmtree, 
  Building2, 
  Trees, 
  ShoppingBag,
  Utensils,
  Landmark,
  Wallet,
  User,
  UsersRound
} from "lucide-react";
import { formatRM } from "@/lib/utils";

interface BudgetFormProps {
  budget: number;
  budgetMode: "per_pax" | "total";
  days: number;
  vibe: string;
  pax: number;
  origin: string;
  isLoading: boolean;
  onBudgetChange: (val: number) => void;
  onBudgetModeChange: (mode: "per_pax" | "total") => void;
  onDaysChange: (val: number) => void;
  onVibeChange: (val: string) => void;
  onPaxChange: (val: number) => void;
  onOriginChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function BudgetForm({
  budget,
  budgetMode,
  days,
  vibe,
  pax,
  origin,
  isLoading,
  onBudgetChange,
  onBudgetModeChange,
  onDaysChange,
  onVibeChange,
  onPaxChange,
  onOriginChange,
  onSubmit,
}: BudgetFormProps) {
  const budgetPresets = [
    { label: "Backpacker", amount: 1500 },
    { label: "Standard", amount: 2500 },
    { label: "Selesa", amount: 3500 },
    { label: "VIP", amount: 4800 },
  ];

  const durationOptions = [3, 4, 5, 7];

  const vibeOptions = [
    { id: "all", label: "Semua Suasana", icon: Compass },
    { id: "beach", label: "Pantai & Pulau", icon: Palmtree },
    { id: "city", label: "Bandar & Kafe", icon: Building2 },
    { id: "nature", label: "Alam & Healing", icon: Trees },
    { id: "shopping", label: "Pasar & Beli-Belah", icon: ShoppingBag },
    { id: "foodie", label: "Syurga Makanan Halal", icon: Utensils },
    { id: "heritage", label: "Sejarah & Warisan", icon: Landmark },
    { id: "budget", label: "Jimat Backpacker", icon: Wallet },
  ] as const;

  const totalEffectiveBudget = budgetMode === "per_pax" ? budget * pax : budget;

  return (
    <div id="cari" className="w-full max-w-4xl mx-auto bg-white rounded-3xl p-5 sm:p-8 border border-stone-200 shadow-xl shadow-stone-200/40">
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Form Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Kalkulator Bajet Perjalanan
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-stone-950 tracking-tight">
              Kira Destinasi Mengikut Bajet Anda
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-800 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200 w-fit">
            <Layers className="w-3.5 h-3.5 text-emerald-800" />
            <span>Pecahan 4 Kos Asas &amp; Semakan Pasport MY</span>
          </div>
        </div>

        {/* 1. Mode Selector & Custom Price Input */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-emerald-800" />
              Tetapan &amp; Nilai Bajet Anda
            </label>

            {/* Mode Toggle (By Pax vs Sekali / Kumpulan) */}
            <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-200">
              <button
                type="button"
                onClick={() => onBudgetModeChange("per_pax")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  budgetMode === "per_pax"
                    ? "bg-white text-emerald-900 shadow-2xs border border-stone-200"
                    : "text-stone-700 hover:text-stone-900"
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Kira Per Pax (Seorang)</span>
              </button>

              <button
                type="button"
                onClick={() => onBudgetModeChange("total")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  budgetMode === "total"
                    ? "bg-white text-emerald-900 shadow-2xs border border-stone-200"
                    : "text-stone-700 hover:text-stone-900"
                }`}
              >
                <UsersRound className="w-3.5 h-3.5" />
                <span>Kira Sekali (Jumlah Kumpulan)</span>
              </button>
            </div>
          </div>

          {/* Value Display and Direct Number Typing Field */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-stone-700 block mb-1">
                {budgetMode === "per_pax" ? "Masukkan Bajet Seorang (RM):" : "Masukkan Jumlah Bajet Kumpulan (RM):"}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-stone-800">RM</span>
                <input
                  type="number"
                  min={500}
                  max={20000}
                  step={50}
                  value={budget || ""}
                  onChange={(e) => onBudgetChange(Math.max(0, Number(e.target.value)))}
                  placeholder="Contoh: 2500"
                  aria-label="Input Nilai Bajet Anda"
                  className="w-36 sm:w-44 px-3 py-1.5 text-2xl sm:text-3xl font-black text-emerald-900 bg-white border border-stone-300 rounded-xl focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:outline-none"
                />
              </div>
            </div>

            {/* Effective Calculation Summary */}
            <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-200">
              <span className="text-xs font-semibold text-stone-600 block">
                Jumlah Had Belanja Kumpulan ({pax} Pax):
              </span>
              <span className="text-2xl sm:text-3xl font-black text-stone-950">
                {formatRM(totalEffectiveBudget)}
              </span>
              <p className="text-[11px] font-semibold text-emerald-800 mt-0.5">
                {budgetMode === "per_pax" 
                  ? `(RM${budget.toLocaleString()} × ${pax} orang)` 
                  : `(Bersamaan ~RM${Math.round(budget / pax).toLocaleString()} seorang)`}
              </p>
            </div>
          </div>

          {/* Slider input */}
          <div className="relative py-1">
            <input
              id="budget-slider"
              type="range"
              min={800}
              max={8000}
              step={100}
              value={budget}
              onChange={(e) => onBudgetChange(Number(e.target.value))}
              aria-label="Pelaras Slider Bajet"
              className="w-full h-3 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-800 focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:outline-none"
            />
            <div className="flex justify-between text-[11px] font-semibold text-stone-700 pt-1">
              <span>RM800</span>
              <span>RM3,000 (Purata Bajet Belia)</span>
              <span>RM8,000</span>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-semibold text-stone-700">Preset Bajet Pantas:</span>
            {budgetPresets.map((preset) => (
              <button
                key={preset.amount}
                type="button"
                onClick={() => onBudgetChange(preset.amount)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-colors cursor-pointer border focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:outline-none ${
                  budget === preset.amount
                    ? "bg-emerald-800 text-white border-emerald-800 shadow-2xs"
                    : "bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100"
                }`}
              >
                {preset.label} ({formatRM(preset.amount)})
              </button>
            ))}
          </div>
        </div>

        {/* 2. Controls Grid: Days, Departure, Pax */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Days */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-stone-700" />
              Tempoh Perjalanan
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {durationOptions.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => onDaysChange(d)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:outline-none ${
                    days === d
                      ? "bg-stone-900 text-white border-stone-900 shadow-2xs"
                      : "bg-white text-stone-800 border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  {d} Hari
                </button>
              ))}
            </div>
          </div>

          {/* Departure Airport */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-700" />
              Pelepasan Dari
            </label>
            <select
              value={origin}
              onChange={(e) => onOriginChange(e.target.value)}
              className="w-full py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl bg-white border border-stone-200 text-stone-900 focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:outline-none"
            >
              <option value="KUL (KLIA / KLIA2)">KUL (KLIA / KLIA2)</option>
              <option value="PEN (Penang / Bayan Lepas)">PEN (Penang / Bayan Lepas)</option>
              <option value="JHB (Johor Bahru / Senai)">JHB (Johor Bahru / Senai)</option>
              <option value="BKI (Kota Kinabalu)">BKI (Kota Kinabalu)</option>
            </select>
          </div>

          {/* Pax Counter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-stone-700" />
              Bilangan Orang (Pax)
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[1, 2, 3, 4].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => onPaxChange(p)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:outline-none ${
                    pax === p
                      ? "bg-emerald-800 text-white border-emerald-800 shadow-2xs"
                      : "bg-white text-stone-800 border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  {p} Pax
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Vibe Filter Pills (Expanded Authentic Vibes) */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-800 block">
              Pilihan Suasana Perjalanan (Vibe)
            </label>
            <span className="text-[11px] text-stone-600 font-medium">
              Ditapis mengikut minat &amp; gaya kembara
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {vibeOptions.map((v) => {
              const IconComp = v.icon;
              const isSelected = vibe === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => onVibeChange(v.id)}
                  className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:outline-none ${
                    isSelected
                      ? "bg-stone-900 text-white border-stone-900 shadow-2xs"
                      : "bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100"
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{v.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit CTA Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-2xl bg-emerald-800 hover:bg-emerald-900 active:scale-[0.99] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md shadow-emerald-900/20 transition-all cursor-pointer disabled:opacity-75 focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Menapis Destinasi Sesuai Mengikut Bajet...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Cari 3 Destinasi Yang Muat Bajet {formatRM(totalEffectiveBudget)}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
