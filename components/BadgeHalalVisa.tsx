"use client";

import React from "react";
import { ShieldCheck, UtensilsCrossed, Coins } from "lucide-react";
import { getCurrencyInfo } from "@/lib/currency";

interface BadgeHalalVisaProps {
  visaStatusText: string;
  halalScore: "senang" | "sederhana" | "mencabar";
  halalDescription: string;
  currencyCode: string;
}

export default function BadgeHalalVisa({
  visaStatusText,
  halalScore,
  halalDescription,
  currencyCode,
}: BadgeHalalVisaProps) {
  const currency = getCurrencyInfo(currencyCode);

  const halalBadgeConfig = {
    senang: {
      label: "Halal: Senang Didapati",
      bg: "bg-emerald-50",
      text: "text-emerald-900",
      border: "border-emerald-300",
    },
    sederhana: {
      label: "Halal: Sederhana",
      bg: "bg-amber-50",
      text: "text-amber-900",
      border: "border-amber-300",
    },
    mencabar: {
      label: "Halal: Perlu Diteliti",
      bg: "bg-rose-50",
      text: "text-rose-900",
      border: "border-rose-300",
    },
  }[halalScore];

  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Status Visa dan Halal">
      {/* Visa Badge */}
      <div
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-stone-100 text-stone-900 border border-stone-300"
        title={visaStatusText}
      >
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
        <span>{visaStatusText}</span>
      </div>

      {/* Halal Badge */}
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${halalBadgeConfig.bg} ${halalBadgeConfig.text} border ${halalBadgeConfig.border}`}
        title={halalDescription}
      >
        <UtensilsCrossed className="w-3.5 h-3.5 shrink-0" />
        <span>{halalBadgeConfig.label}</span>
      </div>

      {/* Currency Badge */}
      <div
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-stone-100 text-stone-900 border border-stone-300"
        title={`Kadar tukaran anggaran: ${currency.name}`}
      >
        <Coins className="w-3.5 h-3.5 text-amber-800 shrink-0" />
        <span>{currency.formattedRateText}</span>
      </div>
    </div>
  );
}

