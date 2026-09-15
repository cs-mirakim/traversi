"use client";

import React, { useState, useEffect } from "react";
import { X, Calendar, DollarSign, Share2, Check, Quote, Utensils, Copy, Send } from "lucide-react";
import { RecommendationResult } from "@/lib/mockDestinations";
import { formatRM, generateTripShareText } from "@/lib/utils";
import BreakdownBar from "./BreakdownBar";
import BadgeHalalVisa from "./BadgeHalalVisa";
import { useLanguage } from "@/context/LanguageContext";

interface ItineraryModalProps {
  result: RecommendationResult | null;
  budgetInput: number;
  daysInput: number;
  paxInput: number;
  onClose: () => void;
}

export default function ItineraryModal({
  result,
  budgetInput,
  daysInput,
  paxInput,
  onClose,
}: ItineraryModalProps) {
  const { locale } = useLanguage();
  const [copied, setCopied] = useState(false);

  // Close on Escape key (R-32)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!result) return null;

  const { destination, totalCost, costBreakdown, budgetUsagePercent, remainingBudget } = result;

  const shareText = generateTripShareText(result, budgetInput, daysInput, paxInput, locale);

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCopySummary = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-destination-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Header Image Cover */}
        <div className="relative h-48 sm:h-56 w-full">
          <img
            src={destination.image}
            alt={`Pemandangan ${destination.city}, ${destination.country}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:outline-none"
            aria-label="Tutup Paparan"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Destination Header Title */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{destination.flag}</span>
              <span className="text-xs uppercase tracking-wider font-bold text-emerald-300">
                {destination.country}
              </span>
            </div>
            <h2 id="modal-destination-title" className="text-2xl sm:text-3xl font-black tracking-tight">
              {destination.city}
            </h2>
            <p className="text-xs sm:text-sm text-stone-200 line-clamp-1 font-medium">
              {destination.tagline}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[calc(85vh-14rem)] overflow-y-auto">
          {/* Toast Alert for Share */}
          {copied && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Ringkasan perjalanan telah disalin ke papan keratan! Sedia untuk ditampal ke WhatsApp.</span>
            </div>
          )}

          {/* Quick Metrics Bar */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-stone-700">Anggaran Kos Keseluruhan ({paxInput} Pax)</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-stone-950">{formatRM(totalCost)}</span>
                <span className="text-xs text-stone-700 font-semibold">/ Bajet {formatRM(budgetInput)}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">
                {budgetUsagePercent}% Daripada Bajet
              </span>
              <p className="text-xs text-emerald-800 font-bold mt-1">
                Baki Simpanan: +{formatRM(remainingBudget)}
              </p>
            </div>
          </div>

          {/* Badges */}
          <div>
            <BadgeHalalVisa
              visaBadge={result.visa?.badge}
              visaNote={result.visa?.note}
              halalScore={result.halal?.score}
              halalCount={result.halal?.count}
              halalDescription={result.halal?.description}
              currencyCode={destination.currencyCode}
            />
          </div>

          {/* Cost Breakdown */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-800" />
              Pecahan Bajet Perjalanan ({daysInput} Hari, {paxInput} Pax &bull; {costBreakdown.rooms} Bilik)
            </h3>
            <BreakdownBar
              flight={costBreakdown.flightTotalRM}
              hotel={costBreakdown.hotelTotalRM}
              food={costBreakdown.foodTotalRM}
              transport={costBreakdown.transportTotalRM}
              total={totalCost}
            />
          </div>

          {/* Local Insight Quote */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-800 flex items-start gap-3">
            <Quote className="w-4 h-4 text-emerald-800 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-stone-950 block mb-0.5">Kenapa Padan Dengan Bajet Anda:</span>
              <p className="text-stone-700 leading-relaxed font-medium">{destination.aiReason}</p>
            </div>
          </div>

          {/* Day by Day Plan */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-800" />
              Cadangan Itinerari Harian
            </h3>

            <div className="space-y-3">
              {destination.itinerary.slice(0, daysInput).map((item) => (
                <div
                  key={item.day}
                  className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs hover:border-stone-300 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-stone-900 text-white">
                      Hari {item.day}
                    </span>
                    <span className="text-xs font-bold text-stone-800">
                      Anggaran Harian: {formatRM(item.dailyBudgetRM * paxInput)}
                    </span>
                  </div>

                  <h4 className="font-bold text-stone-950 text-sm mb-2">{item.title}</h4>

                  <ul className="space-y-1.5 mb-3">
                    {item.activities.map((act, idx) => (
                      <li key={idx} className="text-xs text-stone-700 flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-800 mt-1.5 shrink-0" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>

                  {item.foodSpot && (
                    <div className="pt-2 border-t border-stone-100 text-xs text-stone-700 flex items-center gap-2">
                      <Utensils className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                      <span className="font-bold text-stone-950">Cadangan Port Halal:</span>
                      <span className="truncate font-medium">{item.foodSpot}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* 1. Direct WhatsApp Share */}
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{locale === "bm" ? "Kongsi ke WhatsApp" : "Share to WhatsApp"}</span>
            </button>

            {/* 2. Copy Budget Summary */}
            <button
              type="button"
              onClick={handleCopySummary}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-stone-800 bg-white border border-stone-300 hover:bg-stone-50 shadow-2xs transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{locale === "bm" ? "Tersalin!" : "Copied!"}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>{locale === "bm" ? "Salin Ringkasan" : "Copy Summary"}</span>
                </>
              )}
            </button>
          </div>

          {/* 3. Close Modal */}
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 transition-colors cursor-pointer"
          >
            {locale === "bm" ? "Tutup" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}

