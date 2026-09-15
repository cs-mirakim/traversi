"use client";

import React, { useState } from "react";
import { CheckCircle2, TrendingDown, Quote, Award, Star, Copy, Check } from "lucide-react";
import { RecommendationResult } from "@/lib/mockDestinations";
import { formatRM, generateTripShareText } from "@/lib/utils";
import BreakdownBar from "./BreakdownBar";
import BadgeHalalVisa from "./BadgeHalalVisa";
import AuthPromptModal from "./AuthPromptModal";
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
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [cardCopied, setCardCopied] = useState(false);

  const { destination, totalCost, costBreakdown, budgetUsagePercent, remainingBudget, halal, visa } = result;
  const isTopPick = rank === 1;

  const rankHeaderConfig = {
    1: {
      bg: "bg-emerald-900 text-emerald-50 border-b border-emerald-800",
      badgeText: locale === "bm" ? "Pilihan #1 Optimum" : "Top #1 Best Match",
      scoreText: locale === "bm" ? "Skor 98%" : "98% Fit Score",
      iconColor: "text-amber-400",
    },
    2: {
      bg: "bg-stone-900 text-stone-100 border-b border-stone-800",
      badgeText: locale === "bm" ? "Pilihan #2 Nilai Hebat" : "Top #2 Great Value",
      scoreText: locale === "bm" ? "Penjimatan Tinggi" : "High Savings",
      iconColor: "text-stone-400",
    },
    3: {
      bg: "bg-stone-900 text-stone-100 border-b border-stone-800",
      badgeText: locale === "bm" ? "Pilihan #3 Paling Jimat" : "Top #3 Budget Saver",
      scoreText: locale === "bm" ? "Kos Terendah" : "Lowest Spend",
      iconColor: "text-stone-400",
    },
  }[rank] || {
    bg: "bg-stone-900 text-stone-100 border-b border-stone-800",
    badgeText: locale === "bm" ? `Pilihan #${rank}` : `Rank #${rank}`,
    scoreText: locale === "bm" ? "Disyorkan" : "Recommended",
    iconColor: "text-stone-400",
  };

  const handleCopySummary = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = generateTripShareText(result, budgetInput, daysInput, paxInput, locale);
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        setCardCopied(true);
        setTimeout(() => setCardCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLoggedIn) {
      toggleStar(destination.id);
    } else {
      setShowAuthPrompt(true);
    }
  };

  return (
    <>
      <div 
        className={`bg-white text-stone-900 rounded-3xl transition-all duration-200 overflow-hidden flex flex-col justify-between h-full group border ${
          isTopPick 
            ? "border-emerald-700 shadow-md ring-1 ring-emerald-700/20 relative" 
            : "border-stone-200 shadow-2xs hover:shadow-md hover:border-stone-300"
        }`}
      >
        {/* Uniform Top Header Ribbon across all 3 ranks */}
        <div className={`${rankHeaderConfig.bg} text-xs font-bold py-2 px-4 flex items-center justify-between shrink-0 tracking-tight`}>
          <span className="flex items-center gap-1.5">
            <Award className={`w-3.5 h-3.5 ${rankHeaderConfig.iconColor}`} />
            <span>{rankHeaderConfig.badgeText}</span>
          </span>
          <span className="text-[11px] font-semibold opacity-90">
            {rankHeaderConfig.scoreText}
          </span>
        </div>

        {/* Card Header Image */}
        <div className="relative h-48 w-full overflow-hidden bg-stone-100 shrink-0">
          <img
            src={destination.image}
            alt={`Pemandangan menarik di ${destination.city}, ${destination.country}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

          {/* Top Badges & Copy / Star Buttons */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-stone-900 shadow-xs backdrop-blur-xs border border-stone-200/60 flex items-center gap-1.5">
              <span>{destination.flag}</span>
              <span>{destination.country}</span>
            </span>

            <div className="flex items-center bg-white/95 backdrop-blur-xs p-1 rounded-xl shadow-xs border border-stone-200/60 gap-1">
              {/* Quick Copy Summary Button */}
              <button
                type="button"
                onClick={handleCopySummary}
                title={cardCopied ? (locale === "bm" ? "Ringkasan tersalin!" : "Summary copied!") : (locale === "bm" ? "Salin ringkasan trip" : "Copy trip summary")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  cardCopied
                    ? "bg-emerald-800 text-white"
                    : "hover:bg-stone-100 text-stone-700 hover:text-emerald-800"
                }`}
              >
                {cardCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              {/* Star Pin Button */}
              <button
                type="button"
                onClick={handleStarClick}
                title={isStarred(destination.id) ? (locale === "bm" ? "Nyah-pin destinasi" : "Unpin destination") : (locale === "bm" ? "Pin / Simpan ke profil" : "Pin / Save to profile")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  isStarred(destination.id)
                    ? "bg-amber-100 text-amber-900"
                    : "hover:bg-stone-100 text-stone-700 hover:text-amber-700"
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${isStarred(destination.id) ? "fill-amber-500 text-amber-500" : ""}`} />
              </button>
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
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-stone-950 tracking-tight">{formatRM(totalCost)}</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {budgetUsagePercent}% {locale === "bm" ? "Had Bajet" : "of Budget"}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-emerald-800 font-bold inline-flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <TrendingDown className="w-3.5 h-3.5 text-emerald-700" />
                <span>{locale === "bm" ? `Baki +${formatRM(remainingBudget)}` : `Left +${formatRM(remainingBudget)}`}</span>
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
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 flex items-start gap-2 h-14 overflow-hidden">
            <Quote className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
            <p className="line-clamp-2 leading-snug text-xs font-medium text-stone-700">
              {destination.aiReason}
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={() => onSelect(result)}
            className={`w-full mt-auto py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-[0.99] focus:outline-none ${
              isTopPick
                ? "bg-emerald-800 hover:bg-emerald-900 text-white"
                : "bg-stone-900 hover:bg-stone-800 text-white"
            }`}
          >
            {locale === "bm" ? `Buka Pecahan & Jadual ${daysInput} Hari` : `View ${daysInput}-Day Itinerary`}
          </button>
        </div>
      </div>

      {/* Auth Prompt Modal on Pin/Star Attempt */}
      <AuthPromptModal
        isOpen={showAuthPrompt}
        onClose={() => setShowAuthPrompt(false)}
      />
    </>
  );
}
