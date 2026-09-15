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

  let displayVisaBadge = visaBadge;
  let displayVisaNote = visaNote;
  if (locale === "en") {
    displayVisaBadge = displayVisaBadge
      .replace(/(\d+)\s*Hari/gi, "$1 Days")
      .replace(/Bebas Visa/gi, "Visa Free")
      .replace(/Warganegara \(MyKad\)/gi, "Citizen (MyKad)")
      .replace(/eVisa Diperlukan/gi, "eVisa Required")
      .replace(/Visa On Arrival/gi, "Visa On Arrival");

    displayVisaNote = displayVisaNote
      .replace(/Bebas visa untuk pasport Malaysia/gi, "Visa-free for Malaysian passport holders")
      .replace(/Kebenaran K-ETA diperlukan secara online/gi, "Online K-ETA authorization required")
      .replace(/Permohonan eVisa online/gi, "Online eVisa application required");
  }

  const halalBadgeConfig = {
    Mudah: {
      label: halalCount 
        ? (locale === "bm" ? `Halal: ${halalCount}+ OSM` : `Halal: ${halalCount}+ OSM`)
        : (locale === "bm" ? "Halal: Mudah" : "Halal: Easy"),
      bg: "bg-emerald-50",
      text: "text-emerald-900",
      border: "border-emerald-200",
    },
    Sederhana: {
      label: halalCount 
        ? (locale === "bm" ? `Halal: ${halalCount} OSM` : `Halal: ${halalCount} OSM`)
        : (locale === "bm" ? "Halal: Sederhana" : "Halal: Moderate"),
      bg: "bg-amber-50",
      text: "text-amber-900",
      border: "border-amber-200",
    },
    Terhad: {
      label: halalCount 
        ? (locale === "bm" ? `Halal: ${halalCount} (Terhad)` : `Halal: ${halalCount} (Limited)`)
        : (locale === "bm" ? "Halal: Terhad" : "Halal: Limited"),
      bg: "bg-rose-50",
      text: "text-rose-900",
      border: "border-rose-200",
    },
  }[halalScore] || {
    label: locale === "bm" ? "Halal: Mudah" : "Halal: Easy",
    bg: "bg-emerald-50",
    text: "text-emerald-900",
    border: "border-emerald-200",
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 min-h-[3.25rem] content-start" role="group" aria-label="Status Visa dan Halal">
      {/* Visa Badge */}
      <div
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-50 text-stone-800 border border-stone-200 shadow-2xs"
        title={displayVisaNote}
      >
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
        <span>{displayVisaBadge}</span>
      </div>

      {/* Halal Badge */}
      <div
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${halalBadgeConfig.bg} ${halalBadgeConfig.text} border ${halalBadgeConfig.border} shadow-2xs`}
        title={halalDescription}
      >
        <UtensilsCrossed className="w-3.5 h-3.5 shrink-0 text-emerald-800" />
        <span>{halalBadgeConfig.label}</span>
      </div>

      {/* Currency Badge */}
      <div
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-50 text-stone-800 border border-stone-200 shadow-2xs"
        title={locale === "bm" ? `Kadar tukaran anggaran: ${currency.name}` : `Estimated exchange rate: ${currency.name}`}
      >
        <Coins className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span>{currency.formattedRateText}</span>
      </div>
    </div>
  );
}

