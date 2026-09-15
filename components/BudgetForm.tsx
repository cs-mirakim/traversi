"use client";

import React from "react";
import { 
  Sliders, 
  Calendar, 
  Users, 
  MapPin, 
  Search, 
  Compass, 
  Palmtree, 
  Building2, 
  Trees, 
  ShoppingBag,
  Utensils,
  Landmark,
  Wallet,
  User,
  UsersRound,
  Minus,
  Plus
} from "lucide-react";
import { formatRM } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

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
  const { locale } = useLanguage();

  const budgetPresets = [
    { label: locale === "bm" ? "Jimat" : "Budget", amount: 1000 },
    { label: locale === "bm" ? "Standard" : "Standard", amount: 2500 },
    { label: locale === "bm" ? "Selesa" : "Comfort", amount: 4000 },
    { label: locale === "bm" ? "Global" : "Global", amount: 7500 },
  ];

  const vibeOptions = [
    { id: "all", labelBm: "Semua Suasana", labelEn: "All Vibes", icon: Compass },
    { id: "beach", labelBm: "Pantai & Pulau", labelEn: "Beach & Islands", icon: Palmtree },
    { id: "city", labelBm: "Bandar & Kafe", labelEn: "City & Cafes", icon: Building2 },
    { id: "nature", labelBm: "Alam & Healing", labelEn: "Nature & Retreat", icon: Trees },
    { id: "shopping", labelBm: "Pasar & Beli-Belah", labelEn: "Shopping & Bazaars", icon: ShoppingBag },
    { id: "foodie", labelBm: "Syurga Makanan Halal", labelEn: "Halal Foodie", icon: Utensils },
    { id: "heritage", labelBm: "Sejarah & Warisan", labelEn: "Heritage & History", icon: Landmark },
    { id: "budget", labelBm: "Jimat Belia", labelEn: "Backpacker", icon: Wallet },
  ] as const;

  const totalEffectiveBudget = budgetMode === "per_pax" ? budget * pax : budget;

  return (
    <div id="cari" className="w-full bg-white text-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md">
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Form Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
              <Compass className="w-3.5 h-3.5 text-emerald-700" />
              <span>{locale === "bm" ? "Kalkulator Bajet Terbalik" : "Reverse-Budgeting Calculator"}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-950 tracking-tight">
              {locale === "bm" ? "Kira Destinasi Mengikut Had Bajet Anda" : "Calculate Trips Within Your Spending Limit"}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200 w-fit">
            <span>{locale === "bm" ? "4 Dimensi Kos • Halal OSM • Pasport MY" : "4D Cost • Halal OSM • Passport MY"}</span>
          </div>
        </div>

        {/* 1. Mode Selector & Custom Price Input */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-emerald-700" />
              <span>{locale === "bm" ? "Had Bajet Perjalanan (RM500 - RM10,000)" : "Budget Limit (RM500 - RM10,000)"}</span>
            </label>

            {/* Mode Toggle (By Pax vs Sekali / Kumpulan) */}
            <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-200">
              <button
                type="button"
                onClick={() => onBudgetModeChange("per_pax")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  budgetMode === "per_pax"
                    ? "bg-white text-emerald-900 shadow-2xs border border-stone-200"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>{locale === "bm" ? "Per Pax (Seorang)" : "Per Person"}</span>
              </button>

              <button
                type="button"
                onClick={() => onBudgetModeChange("total")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  budgetMode === "total"
                    ? "bg-white text-emerald-900 shadow-2xs border border-stone-200"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <UsersRound className="w-3.5 h-3.5" />
                <span>{locale === "bm" ? "Sekali (Jumlah Kumpulan)" : "Group Total"}</span>
              </button>
            </div>
          </div>

          {/* Value Display and Direct Number Typing Field */}
          <div className="p-5 sm:p-6 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-stone-700 block mb-1.5">
                {budgetMode === "per_pax" 
                  ? (locale === "bm" ? "Masukkan Bajet Seorang (RM):" : "Enter Budget Per Person (RM):") 
                  : (locale === "bm" ? "Masukkan Jumlah Bajet Kumpulan (RM):" : "Enter Total Group Budget (RM):")}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-black text-emerald-800">RM</span>
                <input
                  type="number"
                  min={500}
                  max={10000}
                  step={50}
                  value={budget || ""}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    onBudgetChange(Math.max(0, Math.min(10000, val)));
                  }}
                  placeholder="2500"
                  aria-label="Input Nilai Bajet Anda"
                  className="w-40 sm:w-48 px-3 py-1.5 text-2xl sm:text-3xl font-black text-stone-900 bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none shadow-2xs"
                />
              </div>
              <span className="text-[11px] font-medium text-stone-500 mt-1.5 block">
                {locale === "bm" ? "Taip terus apa jua nilai dari RM500 hingga RM10,000" : "Type any amount from RM500 to RM10,000"}
              </span>
            </div>

            {/* Effective Calculation Summary */}
            <div className="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-200 flex flex-col sm:items-end">
              <span className="text-xs font-semibold text-stone-500 block">
                {locale === "bm" ? `Jumlah Had Belanja (${pax} Pax):` : `Total Group Spend (${pax} Pax):`}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
                {formatRM(totalEffectiveBudget)}
              </span>
              <span className="inline-block mt-1 text-xs font-bold text-emerald-900 bg-emerald-100/70 px-2.5 py-0.5 rounded-md border border-emerald-300/80">
                {budgetMode === "per_pax" 
                  ? `RM${budget.toLocaleString()} × ${pax} ${locale === "bm" ? "orang" : "pax"}` 
                  : (locale === "bm" ? `~RM${Math.round(budget / pax).toLocaleString()} seorang` : `~RM${Math.round(budget / pax).toLocaleString()} per pax`)}
              </span>
            </div>
          </div>

          {/* Slider input with dynamic gradient fill */}
          <div className="relative py-2">
            <input
              id="budget-slider"
              type="range"
              min={500}
              max={10000}
              step={100}
              value={budget}
              onChange={(e) => onBudgetChange(Number(e.target.value))}
              aria-label="Pelaras Slider Bajet"
              style={{
                background: `linear-gradient(to right, #065f46 0%, #065f46 ${Math.min(100, Math.max(0, ((budget - 500) / (10000 - 500)) * 100))}%, #e7e5e4 ${Math.min(100, Math.max(0, ((budget - 500) / (10000 - 500)) * 100))}%, #e7e5e4 100%)`,
              }}
              className="w-full h-3 rounded-full cursor-pointer shadow-inner transition-all"
            />
            <div className="flex justify-between text-xs font-semibold text-stone-500 pt-2">
              <span>RM500 ({locale === "bm" ? "Domestik" : "Domestic"})</span>
              <span className="font-bold text-emerald-800">RM2,500 ({locale === "bm" ? "Purata ASEAN" : "Avg ASEAN"})</span>
              <span>RM10,000 ({locale === "bm" ? "Global" : "Global"})</span>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-semibold text-stone-600">
              {locale === "bm" ? "Pilihan Cepat:" : "Quick Presets:"}
            </span>
            {budgetPresets.map((preset) => (
              <button
                key={preset.amount}
                type="button"
                onClick={() => onBudgetChange(preset.amount)}
                className={`text-xs px-3 py-1 rounded-full font-bold transition-all cursor-pointer border ${
                  budget === preset.amount
                    ? "bg-emerald-800 text-white border-emerald-800 shadow-2xs"
                    : "bg-white text-stone-700 border-stone-200 hover:bg-stone-100"
                }`}
              >
                {preset.label} ({formatRM(preset.amount)})
              </button>
            ))}
          </div>
        </div>

        {/* 2. Controls Grid: Days (1-14 custom), Departure Airport, Pax (1-10 custom) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Days: Custom 1-14 */}
          <div className="space-y-2.5 bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5 shrink-0">
                <Calendar className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>{locale === "bm" ? "Tempoh (Hari)" : "Duration (Days)"}</span>
              </label>
              <span className="text-xs font-black text-emerald-900 bg-white px-2.5 py-1 rounded-lg border border-stone-200 shrink-0 whitespace-nowrap shadow-2xs">
                {days} {locale === "bm" ? "Hari" : "Days"}
              </span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => onDaysChange(Math.max(1, days - 1))}
                aria-label="Kurangkan bilangan hari"
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-white border border-stone-300 text-stone-800 font-bold hover:bg-stone-100 transition-colors shadow-2xs cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <input
                type="number"
                min={1}
                max={14}
                value={days}
                onChange={(e) => onDaysChange(Math.max(1, Math.min(14, Number(e.target.value))))}
                aria-label="Bilangan hari perjalanan"
                className="flex-1 text-center py-1 text-base font-black text-stone-900 bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none shadow-2xs"
              />
              <button
                type="button"
                onClick={() => onDaysChange(Math.min(14, days + 1))}
                aria-label="Tambah bilangan hari"
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-white border border-stone-300 text-stone-800 font-bold hover:bg-stone-100 transition-colors shadow-2xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <input
              type="range"
              min={1}
              max={14}
              value={days}
              onChange={(e) => onDaysChange(Number(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />
          </div>

          {/* Departure Airport: KUL / PEN / KCH / KK / BKI */}
          <div className="space-y-2.5 bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200 flex flex-col justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5 shrink-0">
              <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>{locale === "bm" ? "Berlepas Dari" : "Departing From"}</span>
            </label>
            <select
              value={origin}
              onChange={(e) => onOriginChange(e.target.value)}
              className="w-full py-2 px-3 text-xs sm:text-sm font-bold rounded-xl bg-white border border-stone-300 text-stone-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none shadow-2xs"
            >
              <option value="KUL">KUL - Kuala Lumpur (KLIA / KLIA2)</option>
              <option value="PEN">PEN - Pulau Pinang (Bayan Lepas)</option>
              <option value="KCH">KCH - Kuching International Airport</option>
              <option value="KK / BKI">BKI - Kota Kinabalu (Sabah)</option>
            </select>
            <p className="text-[11px] font-medium text-stone-500 leading-tight">
              {locale === "bm" ? "Kiraan penerbangan dari lapangan terbang pilihan." : "Flight calculations from chosen airport."}
            </p>
          </div>

          {/* Pax Counter: Custom 1-10 */}
          <div className="space-y-2.5 bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5 shrink-0">
                <Users className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>{locale === "bm" ? "Bilangan Pax" : "Travelers"}</span>
              </label>
              <span className="text-xs font-black text-emerald-900 bg-white px-2.5 py-1 rounded-lg border border-stone-200 shrink-0 whitespace-nowrap shadow-2xs">
                {pax} {locale === "bm" ? "Orang" : "Pax"}
              </span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => onPaxChange(Math.max(1, pax - 1))}
                aria-label="Kurangkan bilangan pax"
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-white border border-stone-300 text-stone-800 font-bold hover:bg-stone-100 transition-colors shadow-2xs cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <input
                type="number"
                min={1}
                max={10}
                value={pax}
                onChange={(e) => onPaxChange(Math.max(1, Math.min(10, Number(e.target.value))))}
                aria-label="Bilangan orang"
                className="flex-1 text-center py-1 text-base font-black text-stone-900 bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none shadow-2xs"
              />
              <button
                type="button"
                onClick={() => onPaxChange(Math.min(10, pax + 1))}
                aria-label="Tambah bilangan pax"
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-white border border-stone-300 text-stone-800 font-bold hover:bg-stone-100 transition-colors shadow-2xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] font-medium text-stone-500 leading-tight">
              {locale === "bm" 
                ? `${Math.ceil(pax / 2)} bilik hotel (kongsi 2 pax/bilik)` 
                : `${Math.ceil(pax / 2)} rooms (twin sharing)`}
            </p>
          </div>
        </div>

        {/* 3. Vibe Filter Selection */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>{locale === "bm" ? "Pilih Suasana & Vibe Percutian" : "Select Travel Atmosphere & Vibe"}</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {vibeOptions.map((v) => {
              const Icon = v.icon;
              const isSelected = vibe === v.id;
              const label = locale === "bm" ? v.labelBm : v.labelEn;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => onVibeChange(v.id)}
                  className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-left whitespace-nowrap overflow-hidden ${
                    isSelected
                      ? "bg-emerald-900 text-white border-emerald-900 shadow-sm"
                      : "bg-white text-stone-800 border-stone-200 hover:bg-stone-50 hover:border-stone-300 shadow-2xs"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-emerald-300" : "text-emerald-700"}`} />
                  <span className="truncate">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Submit CTA Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-md transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{locale === "bm" ? "Memproses Data OpenStreetMap & Pasport..." : "Processing OSM & Passport Data..."}</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4 text-emerald-300" />
                <span>{locale === "bm" ? "Kira & Paparkan Destinasi Ngam Bajet" : "Calculate Matching Destinations"}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
