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
  const { destination, totalCost, costBreakdown, budgetUsagePercent, remainingBudget, halal, visa } = result;
  const isTopPick = rank === 1;

  return (
    <div 
      className={`bg-[#ecfdf5] text-[#022c22] rounded-3xl transition-all duration-200 overflow-hidden flex flex-col group border-2 ${
        isTopPick 
          ? "border-emerald-500 shadow-xl ring-2 ring-emerald-400/40 relative" 
          : "border-emerald-200/80 shadow-md hover:shadow-lg hover:border-emerald-300"
      }`}
    >
      {/* Top Pick Ribbon if Rank 1 */}
      {isTopPick && (
        <div className="bg-[#022c22] text-[#ecfdf5] text-xs font-black py-1.5 px-4 flex items-center justify-between border-b border-emerald-800">
          <span className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-300" />
            Pilihan #1 Paling Optimum
          </span>
          <span className="text-emerald-200 text-[11px] font-bold">Skor Nilai &amp; Penjimatan Tertinggi</span>
        </div>
      )}

      {/* Card Header Image */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-emerald-950">
        <img
          src={destination.image}
          alt={`Pemandangan menarik di ${destination.city}, ${destination.country}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] via-[#022c22]/40 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-xl text-xs font-black bg-white/95 text-[#022c22] shadow-sm">
            {destination.flag} {destination.country}
          </span>

          <span className="px-3 py-1 rounded-xl text-xs font-black bg-[#022c22] text-emerald-300 border border-emerald-400/50 shadow-sm flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            {budgetUsagePercent}% Bajet
          </span>
        </div>

        {/* City Title */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-sm">
            {destination.city}
          </h3>
          <p className="text-xs text-emerald-100 line-clamp-1 font-medium drop-shadow-sm">
            {destination.tagline}
          </p>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        {/* Budget Comparison Section */}
        <div className="flex items-baseline justify-between border-b border-emerald-900/10 pb-3">
          <div>
            <span className="text-xs font-bold text-emerald-800 block">
              Anggaran Lengkap ({paxInput} Pax &bull; {daysInput} Hari)
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-[#022c22]">{formatRM(totalCost)}</span>
              <span className="text-xs text-emerald-700 font-bold">/ Had {formatRM(budgetInput)}</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-emerald-800 font-black inline-flex items-center gap-1 bg-emerald-200/60 px-2.5 py-1 rounded-lg">
              <TrendingDown className="w-3.5 h-3.5" />
              Baki {formatRM(remainingBudget)}
            </span>
            <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">Lebihan wang poket</p>
          </div>
        </div>

        {/* Dynamic Halal & Visa Badges */}
        <BadgeHalalVisa
          visaBadge={visa?.badge}
          visaNote={visa?.note}
          halalScore={halal?.score}
          halalCount={halal?.count}
          halalDescription={halal?.description}
          currencyCode={destination.currencyCode}
        />

        {/* Breakdown Bar */}
        <div className="space-y-1.5 bg-white p-3.5 rounded-2xl border border-emerald-200">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
            <span>Pecahan 4 Dimensi Kos:</span>
            <span className="text-[11px] text-emerald-700 font-semibold">
              {costBreakdown.rooms} Bilik Hotel ({costBreakdown.nights} Malam)
            </span>
          </div>
          <BreakdownBar
            flight={costBreakdown.flightTotalRM}
            hotel={costBreakdown.hotelTotalRM}
            food={costBreakdown.foodTotalRM}
            transport={costBreakdown.transportTotalRM}
            total={totalCost}
          />
        </div>

        {/* Local Insight Quote */}
        <div className="p-3.5 rounded-2xl bg-white border border-emerald-200 text-xs text-[#022c22] flex items-start gap-2.5">
          <Quote className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
          <p className="line-clamp-2 leading-relaxed text-xs font-medium text-emerald-950">
            {destination.aiReason}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onSelect(result)}
          className={`w-full mt-2 py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-[0.99] focus:outline-none ${
            isTopPick
              ? "bg-[#022c22] hover:bg-[#064e3b] text-[#ecfdf5] border border-emerald-500/40"
              : "bg-white hover:bg-emerald-100 text-[#022c22] border-2 border-emerald-300"
          }`}
        >
          Buka Pecahan &amp; Jadual {daysInput} Hari
        </button>
      </div>
    </div>
  );
}
