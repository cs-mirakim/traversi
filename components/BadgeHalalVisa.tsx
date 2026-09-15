"use client";

import React from "react";
import { ShieldCheck, UtensilsCrossed, Coins } from "lucide-react";
import { getCurrencyInfo } from "@/lib/currency";
import { useLanguage } from "@/context/LanguageContext";

interface BadgeHalalVisaProps {
  visaBadge?: string;
  visaNote?: string;
  halalScore?: "Mudah" | "Sederhana" | "Terhad";
  halalCount?: number;
  halalDescription?: string;
  currencyCode: string;
}

export default function BadgeHalalVisa({
  visaBadge = "Visa Free 30 Hari",
  visaNote = "Bebas visa untuk pasport Malaysia",
  halalScore = "Mudah",
  halalCount,
  halalDescription = "Premis halal mudah didapati",
  currencyCode,
}: BadgeHalalVisaProps) {
  const { locale } = useLanguage();
  const currency = getCurrencyInfo(currencyCode);

  const halalBadgeConfig = {
    Mudah: {
      label: halalCount 
        ? (locale === "bm" ? `Halal: ${halalCount}+ Premis OSM` : `Halal: ${halalCount}+ OSM Nodes`)
        : (locale === "bm" ? "Halal: Mudah" : "Halal: Easy"),
      bg: "bg-emerald-100",
      text: "text-emerald-950",
      border: "border-emerald-300",
    },
    Sederhana: {
      label: halalCount 
        ? (locale === "bm" ? `Halal: ${halalCount} Premis OSM` : `Halal: ${halalCount} OSM Nodes`)
        : (locale === "bm" ? "Halal: Sederhana" : "Halal: Moderate"),
      bg: "bg-amber-100",
      text: "text-amber-950",
      border: "border-amber-300",
    },
    Terhad: {
      label: halalCount 
        ? (locale === "bm" ? `Halal: ${halalCount} Premis (Terhad)` : `Halal: ${halalCount} Nodes (Limited)`)
        : (locale === "bm" ? "Halal: Terhad" : "Halal: Limited"),
      bg: "bg-rose-100",
      text: "text-rose-950",
      border: "border-rose-300",
    },
  }[halalScore] || {
    label: locale === "bm" ? "Halal: Mudah" : "Halal: Easy",
    bg: "bg-emerald-100",
    text: "text-emerald-950",
    border: "border-emerald-300",
  };

  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Status Visa dan Halal">
      {/* Visa Badge */}
      <div
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-white text-emerald-950 border border-emerald-300 shadow-2xs"
        title={visaNote}
      >
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
        <span>{visaBadge}</span>
      </div>

      {/* Halal Badge */}
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${halalBadgeConfig.bg} ${halalBadgeConfig.text} border ${halalBadgeConfig.border} shadow-2xs`}
        title={halalDescription}
      >
        <UtensilsCrossed className="w-3.5 h-3.5 shrink-0 text-emerald-800" />
        <span>{halalBadgeConfig.label}</span>
      </div>

      {/* Currency Badge */}
      <div
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-white text-emerald-950 border border-emerald-300 shadow-2xs"
        title={`Kadar tukaran anggaran: ${currency.name}`}
      >
        <Coins className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span>{currency.formattedRateText}</span>
      </div>
    </div>
  );
}
