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
  Plus,
  Sparkles
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
    { label: "Jimat", amount: 1000 },
    { label: "Standard", amount: 2500 },
    { label: "Selesa", amount: 4000 },
    { label: "Global", amount: 7500 },
  ];

  const vibeOptions = [
    { id: "all", label: "Semua Suasana", icon: Compass },
    { id: "beach", label: "Pantai & Pulau", icon: Palmtree },
    { id: "city", label: "Bandar & Kafe", icon: Building2 },
    { id: "nature", label: "Alam & Healing", icon: Trees },
    { id: "shopping", label: "Pasar & Beli-Belah", icon: ShoppingBag },
    { id: "foodie", label: "Syurga Makanan Halal", icon: Utensils },
    { id: "heritage", label: "Sejarah & Warisan", icon: Landmark },
    { id: "budget", label: "Jimat Belia", icon: Wallet },
  ] as const;

  const totalEffectiveBudget = budgetMode === "per_pax" ? budget * pax : budget;

  return (
    <div id="cari" className="w-full max-w-4xl mx-auto bg-[#ecfdf5] text-[#022c22] rounded-3xl p-6 sm:p-9 border-2 border-emerald-200/80 shadow-2xl">
      <form onSubmit={onSubmit} className="space-y-7">
        {/* Form Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-900/10 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              Kalkulator Bajet Terbalik (Reverse-Budgeting)
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#022c22] tracking-tight">
              Kira Destinasi Mengikut Had Belanja Anda
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-950 bg-emerald-200/60 px-3.5 py-2 rounded-xl border border-emerald-300/50 w-fit">
            <span>Pecahan 4 Dimensi &bull; Halal Overpass &bull; Pasport MY</span>
          </div>
        </div>

        {/* 1. Mode Selector & Custom Price Input */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <label className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-emerald-700" />
              Had Bajet Perjalanan (RM500 - RM10,000)
            </label>

            {/* Mode Toggle (By Pax vs Sekali / Kumpulan) */}
            <div className="inline-flex rounded-xl bg-emerald-200/60 p-1 border border-emerald-300/50">
              <button
                type="button"
                onClick={() => onBudgetModeChange("per_pax")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  budgetMode === "per_pax"
                    ? "bg-[#022c22] text-[#ecfdf5] shadow-xs"
                    : "text-emerald-900 hover:text-emerald-950"
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Per Pax (Seorang)</span>
              </button>

              <button
                type="button"
                onClick={() => onBudgetModeChange("total")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  budgetMode === "total"
                    ? "bg-[#022c22] text-[#ecfdf5] shadow-xs"
                    : "text-emerald-900 hover:text-emerald-950"
                }`}
              >
                <UsersRound className="w-3.5 h-3.5" />
                <span>Sekali (Jumlah Kumpulan)</span>
              </button>
            </div>
          </div>

          {/* Value Display and Direct Number Typing Field */}
          <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-950 block mb-1">
                {budgetMode === "per_pax" ? "Masukkan Bajet Seorang (RM):" : "Masukkan Jumlah Bajet Kumpulan (RM):"}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-emerald-800">RM</span>
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
                  className="w-40 sm:w-48 px-3 py-1.5 text-2xl sm:text-3xl font-black text-emerald-900 bg-emerald-50/50 border-2 border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 mt-1 block">
                Boleh taip terus apa jua nilai dari RM500 hingga RM10,000
              </span>
            </div>

            {/* Effective Calculation Summary */}
            <div className="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-emerald-100">
              <span className="text-xs font-semibold text-emerald-800 block">
                Jumlah Had Belanja Kumpulan ({pax} Pax):
              </span>
              <span className="text-3xl sm:text-4xl font-black text-[#022c22]">
                {formatRM(totalEffectiveBudget)}
              </span>
              <p className="text-xs font-bold text-emerald-700 mt-0.5">
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
              min={500}
              max={10000}
              step={100}
              value={budget}
              onChange={(e) => onBudgetChange(Number(e.target.value))}
              aria-label="Pelaras Slider Bajet"
              className="w-full h-3 bg-emerald-200/80 rounded-lg appearance-none cursor-pointer accent-emerald-700 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
            <div className="flex justify-between text-xs font-bold text-emerald-900 pt-1">
              <span>RM500 (Domestik)</span>
              <span>RM2,500 (Purata Belia ASEAN)</span>
              <span>RM10,000 (Global)</span>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-bold text-emerald-950">Pilihan Cepat:</span>
            {budgetPresets.map((preset) => (
              <button
                key={preset.amount}
                type="button"
                onClick={() => onBudgetChange(preset.amount)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer border ${
                  budget === preset.amount
                    ? "bg-[#022c22] text-[#ecfdf5] border-[#022c22] shadow-xs"
                    : "bg-white text-emerald-900 border-emerald-200 hover:bg-emerald-100"
                }`}
              >
                {preset.label} ({formatRM(preset.amount)})
              </button>
            ))}
          </div>
        </div>

        {/* 2. Controls Grid: Days (1-14 custom), Departure Airport (KUL/PEN/KCH/KK/BKI), Pax (1-10 custom) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          {/* Days: Custom 1-14 */}
          <div className="space-y-2 bg-white p-4 rounded-2xl border border-emerald-200">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                Tempoh (1-14 Hari)
              </label>
              <span className="text-base font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-lg">
                {days} Hari
              </span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => onDaysChange(Math.max(1, days - 1))}
                aria-label="Kurangkan bilangan hari"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-100 text-emerald-900 font-bold hover:bg-emerald-200 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                min={1}
                max={14}
                value={days}
                onChange={(e) => onDaysChange(Math.max(1, Math.min(14, Number(e.target.value))))}
                aria-label="Bilangan hari perjalanan"
                className="flex-1 text-center py-1.5 text-lg font-black text-emerald-900 bg-emerald-50/50 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => onDaysChange(Math.min(14, days + 1))}
                aria-label="Tambah bilangan hari"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-100 text-emerald-900 font-bold hover:bg-emerald-200 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <input
              type="range"
              min={1}
              max={14}
              value={days}
              onChange={(e) => onDaysChange(Number(e.target.value))}
              className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />
          </div>

          {/* Departure Airport: KUL / PEN / KCH / KK / BKI */}
          <div className="space-y-2 bg-white p-4 rounded-2xl border border-emerald-200">
            <label className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              Berlepas Dari
            </label>
            <select
              value={origin}
              onChange={(e) => onOriginChange(e.target.value)}
              className="w-full py-2.5 px-3 text-sm font-bold rounded-xl bg-emerald-50/50 border border-emerald-200 text-emerald-950 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            >
              <option value="KUL">KUL - Kuala Lumpur (KLIA / KLIA2)</option>
              <option value="PEN">PEN - Pulau Pinang (Bayan Lepas)</option>
              <option value="KCH">KCH - Kuching International Airport</option>
              <option value="KK / BKI">BKI - Kota Kinabalu (Sabah)</option>
            </select>
            <p className="text-[11px] font-semibold text-emerald-700">
              Pengiraan penerbangan diselaras dari lapangan terbang pilihan.
            </p>
          </div>

          {/* Pax Counter: Custom 1-10 */}
          <div className="space-y-2 bg-white p-4 rounded-2xl border border-emerald-200">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-700" />
                Bilangan Pax (1-10)
              </label>
              <span className="text-base font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-lg">
                {pax} Orang
              </span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => onPaxChange(Math.max(1, pax - 1))}
                aria-label="Kurangkan bilangan pax"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-100 text-emerald-900 font-bold hover:bg-emerald-200 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                min={1}
                max={10}
                value={pax}
                onChange={(e) => onPaxChange(Math.max(1, Math.min(10, Number(e.target.value))))}
                aria-label="Bilangan orang"
                className="flex-1 text-center py-1.5 text-lg font-black text-emerald-900 bg-emerald-50/50 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => onPaxChange(Math.min(10, pax + 1))}
                aria-label="Tambah bilangan pax"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-100 text-emerald-900 font-bold hover:bg-emerald-200 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] font-semibold text-emerald-700">
              Bilik hotel dikira {Math.ceil(pax / 2)} buah bilik (kongsi 2 pax/bilik).
            </p>
          </div>
        </div>

        {/* 3. Vibe Filter Selection */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            Pilih Suasana / Vibe Percutian Anda
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {vibeOptions.map((v) => {
              const Icon = v.icon;
              const isSelected = vibe === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => onVibeChange(v.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer text-left ${
                    isSelected
                      ? "bg-[#022c22] text-[#ecfdf5] border-[#022c22] shadow-xs"
                      : "bg-white text-emerald-950 border-emerald-200 hover:bg-emerald-100/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-emerald-300" : "text-emerald-700"}`} />
                  <span className="truncate">{v.label}</span>
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
            className="w-full py-4 px-6 rounded-2xl bg-[#022c22] text-[#ecfdf5] hover:bg-[#064e3b] font-black text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-xl transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed border-2 border-emerald-400/30"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-emerald-300 border-t-transparent rounded-full animate-spin" />
                <span>Memproses Data OpenStreetMap &amp; Pasport MY...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5 text-emerald-300" />
                <span>Kira &amp; Paparkan Destinasi Ngam Bajet</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
