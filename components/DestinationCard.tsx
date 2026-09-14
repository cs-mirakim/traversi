"use client";

import React from "react";
import { CheckCircle2, TrendingDown, Quote, Award } from "lucide-react";
import { RecommendationResult } from "@/lib/mockDestinations";
import { formatRM } from "@/lib/utils";
import BreakdownBar from "./BreakdownBar";
import BadgeHalalVisa from "./BadgeHalalVisa";

interface DestinationCardProps {
  result: RecommendationResult;
  budgetInput: number;
  daysInput: number;
  paxInput: number;
  rank?: number;
  onSelect: (result: RecommendationResult) => void;
}

export default function DestinationCard({
  result,
  budgetInput,
  daysInput,
  paxInput,
  rank = 1,
  onSelect,
}: DestinationCardProps) {
  const { destination, totalCost, costBreakdown, budgetUsagePercent, remainingBudget } = result;
  const isTopPick = rank === 1;

  return (
    <div 
      className={`bg-white rounded-2xl transition-all duration-200 overflow-hidden flex flex-col group ${
        isTopPick 
          ? "border-2 border-emerald-800 shadow-md ring-1 ring-emerald-800/20 relative" 
          : "border border-stone-200 shadow-xs hover:shadow-md"
      }`}
    >
      {/* Top Pick Ribbon if Rank 1 */}
      {isTopPick && (
        <div className="bg-emerald-800 text-white text-[11px] font-bold py-1 px-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            Pilihan #1 Paling Optimum
          </span>
          <span className="text-emerald-100 text-[10px]">Skor Penjimatan Tertinggi</span>
        </div>
      )}

      {/* Card Header Image */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100">
        <img
          src={destination.image}
          alt={`Pemandangan menarik di ${destination.city}, ${destination.country}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-white/95 text-stone-900 shadow-xs">
            {destination.flag} {destination.country}
          </span>

          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-800 text-white shadow-xs flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {budgetUsagePercent}% Bajet
          </span>
        </div>

        {/* City Title */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="text-xl sm:text-2xl font-black tracking-tight drop-shadow-xs">
            {destination.city}
          </h3>
          <p className="text-xs text-stone-200 line-clamp-1 drop-shadow-xs font-medium">
            {destination.tagline}
          </p>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Budget Comparison Section */}
        <div className="flex items-baseline justify-between border-b border-stone-100 pb-3">
          <div>
            <span className="text-xs font-semibold text-stone-700 block">
              Anggaran Penuh ({paxInput} Pax)
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-stone-950">{formatRM(totalCost)}</span>
              <span className="text-xs text-stone-700 font-medium">/ {formatRM(budgetInput)}</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-emerald-800 font-bold inline-flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" />
              Baki {formatRM(remainingBudget)}
            </span>
            <p className="text-[11px] text-stone-700 font-medium">Wang lebihan poket</p>
          </div>
        </div>

        {/* Badges */}
        <BadgeHalalVisa
          visaStatusText={destination.visaStatusText}
          halalScore={destination.halalScore}
          halalDescription={destination.halalDescription}
          currencyCode={destination.currencyCode}
        />

        {/* Breakdown Bar */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-stone-800 block">
            Pecahan Perbelanjaan ({daysInput} Hari):
          </span>
          <BreakdownBar
            flight={costBreakdown.flightTotal}
            hotel={costBreakdown.hotelTotal}
            food={costBreakdown.foodTotal}
            transport={costBreakdown.transportTotal}
            total={totalCost}
          />
        </div>

        {/* Local Insight Quote */}
        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 flex items-start gap-2.5">
          <Quote className="w-4 h-4 text-emerald-800 mt-0.5 shrink-0" />
          <p className="line-clamp-2 leading-relaxed text-[11px] font-medium text-stone-700">
            {destination.aiReason}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onSelect(result)}
          className={`w-full mt-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:outline-none ${
            isTopPick
              ? "bg-emerald-800 hover:bg-emerald-900 text-white shadow-emerald-900/20"
              : "bg-stone-900 hover:bg-stone-800 text-white"
          }`}
        >
          Lihat Pecahan &amp; Jadual {daysInput} Hari
        </button>
      </div>
    </div>
  );
}

