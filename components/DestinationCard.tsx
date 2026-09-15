"use client";

import React from "react";
import { CheckCircle2, TrendingDown, Quote, Award, Star } from "lucide-react";
import { RecommendationResult } from "@/lib/mockDestinations";
import { formatRM } from "@/lib/utils";
import BreakdownBar from "./BreakdownBar";
import BadgeHalalVisa from "./BadgeHalalVisa";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

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
  const { locale } = useLanguage();
  const { isLoggedIn, toggleStar, isStarred } = useAuth();
  const { destination, totalCost, costBreakdown, budgetUsagePercent, remainingBudget, halal, visa } = result;
  const isTopPick = rank === 1;

  return (
    <div 
      className={`bg-white text-stone-900 rounded-3xl transition-all duration-200 overflow-hidden flex flex-col group border ${
        isTopPick 
          ? "border-emerald-700 shadow-lg ring-1 ring-emerald-700/30 relative" 
          : "border-stone-200 shadow-xs hover:shadow-md hover:border-stone-300"
      }`}
    >
      {/* Top Pick Ribbon if Rank 1 */}
      {isTopPick && (
        <div className="bg-emerald-800 text-white text-xs font-bold py-1 px-3.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>{locale === "bm" ? "Pilihan #1 Paling Optimum" : "Top #1 Recommended Fit"}</span>
          </span>
          <span className="text-emerald-100 text-[10px] font-semibold">
            {locale === "bm" ? "Skor Nilai Tertinggi" : "Highest Value Score"}
          </span>
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
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

        {/* Top Badges & Star Button */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/95 text-stone-900 shadow-xs">
            {destination.flag} {destination.country}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (isLoggedIn) {
                  toggleStar(destination.id);
                } else {
                  window.location.href = "/login";
                }
              }}
              title={isStarred(destination.id) ? "Nyah-tanda bintang" : "Simpan / Pin destinasi"}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer shadow-xs ${
                isStarred(destination.id)
                  ? "bg-amber-400 text-stone-950 hover:bg-amber-300"
                  : "bg-white/90 text-stone-600 hover:bg-white hover:text-amber-600"
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${isStarred(destination.id) ? "fill-current" : ""}`} />
            </button>

            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-800 text-white shadow-xs flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>{budgetUsagePercent}% {locale === "bm" ? "Bajet" : "Budget"}</span>
            </span>
          </div>
        </div>

        {/* City Title */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="text-xl sm:text-2xl font-black tracking-tight drop-shadow-xs">
            {destination.city}
          </h3>
          <p className="text-xs text-stone-200 line-clamp-1 font-medium drop-shadow-xs">
            {destination.tagline}
          </p>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Budget Comparison Section */}
        <div className="flex items-baseline justify-between border-b border-stone-100 pb-3">
          <div>
            <span className="text-xs font-semibold text-stone-600 block">
              {locale === "bm" 
                ? `Anggaran Lengkap (${paxInput} Pax • ${daysInput} Hari)` 
                : `Total Estimate (${paxInput} Pax • ${daysInput} Days)`}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-stone-950">{formatRM(totalCost)}</span>
              <span className="text-xs text-stone-600 font-semibold">/ {formatRM(budgetInput)}</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-emerald-800 font-bold inline-flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-700" />
              <span>{locale === "bm" ? `Baki ${formatRM(remainingBudget)}` : `Left ${formatRM(remainingBudget)}`}</span>
            </span>
            <p className="text-[11px] text-stone-500 font-medium mt-0.5">
              {locale === "bm" ? "Lebihan wang poket" : "Pocket savings"}
            </p>
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
        <div className="space-y-1.5 bg-stone-50 p-3 rounded-2xl border border-stone-200">
          <div className="flex items-center justify-between text-xs font-bold text-stone-800">
            <span>{locale === "bm" ? "Pecahan 4 Dimensi Kos:" : "4D Expense Breakdown:"}</span>
            <span className="text-[11px] text-stone-600 font-medium">
              {costBreakdown.rooms} {locale === "bm" ? "Bilik" : "Rooms"} ({costBreakdown.nights} {locale === "bm" ? "Malam" : "Nights"})
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
        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 flex items-start gap-2">
          <Quote className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
          <p className="line-clamp-2 leading-relaxed text-xs font-medium text-stone-700">
            {destination.aiReason}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onSelect(result)}
          className={`w-full mt-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-[0.99] focus:outline-none ${
            isTopPick
              ? "bg-emerald-800 hover:bg-emerald-900 text-white"
              : "bg-stone-900 hover:bg-stone-800 text-white"
          }`}
        >
          {locale === "bm" ? `Buka Pecahan & Jadual ${daysInput} Hari` : `View ${daysInput}-Day Itinerary`}
        </button>
      </div>
    </div>
  );
}
