"use client";

import React from "react";
import { Plane, Building, Utensils, Car } from "lucide-react";
import { formatRM } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface BreakdownBarProps {
  flight: number;
  hotel: number;
  food: number;
  transport: number;
  total: number;
}

export default function BreakdownBar({
  flight,
  hotel,
  food,
  transport,
  total,
}: BreakdownBarProps) {
  const { locale } = useLanguage();

  // Safe percentages
  const safeTotal = total > 0 ? total : 1;
  const pFlight = Math.round((flight / safeTotal) * 100);
  const pHotel = Math.round((hotel / safeTotal) * 100);
  const pFood = Math.round((food / safeTotal) * 100);
  const pTransport = Math.max(2, 100 - pFlight - pHotel - pFood);

  return (
    <div className="w-full space-y-2.5">
      {/* Visual Multi-Segment Bar */}
      <div 
        className="h-2.5 w-full rounded-full bg-stone-100 overflow-hidden flex border border-stone-200"
        role="progressbar"
        aria-label="Pecahan Agihan Bajet"
      >
        <div
          style={{ width: `${pFlight}%` }}
          className="h-full bg-sky-700 transition-all duration-500"
          title={`Penerbangan: ${formatRM(flight)} (${pFlight}%)`}
        />
        <div
          style={{ width: `${pHotel}%` }}
          className="h-full bg-amber-600 transition-all duration-500"
          title={`Penginapan: ${formatRM(hotel)} (${pHotel}%)`}
        />
        <div
          style={{ width: `${pFood}%` }}
          className="h-full bg-emerald-700 transition-all duration-500"
          title={`Makanan: ${formatRM(food)} (${pFood}%)`}
        />
        <div
          style={{ width: `${pTransport}%` }}
          className="h-full bg-stone-600 transition-all duration-500"
          title={`Pengangkutan: ${formatRM(transport)} (${pTransport}%)`}
        />
      </div>

      {/* Metric Pills in Clean 2x2 Grid with Zero Overflow */}
      <div className="grid grid-cols-2 gap-1.5 text-xs">
        {/* 1. Flight */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="w-5 h-5 rounded-md bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
              <Plane className="w-3 h-3" />
            </div>
            <span className="text-[11px] font-medium text-stone-600 truncate">
              {locale === "bm" ? "Tiket Terbang" : "Flight Fare"}
            </span>
          </div>
          <span className="font-bold text-xs text-stone-950 ml-1.5 shrink-0">{formatRM(flight)}</span>
        </div>

        {/* 2. Hotel */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="w-5 h-5 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Building className="w-3 h-3" />
            </div>
            <span className="text-[11px] font-medium text-stone-600 truncate">
              {locale === "bm" ? "Bilik Hotel" : "Hotel Room"}
            </span>
          </div>
          <span className="font-bold text-xs text-stone-950 ml-1.5 shrink-0">{formatRM(hotel)}</span>
        </div>

        {/* 3. Meals */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
              <Utensils className="w-3 h-3" />
            </div>
            <span className="text-[11px] font-medium text-stone-600 truncate">
              {locale === "bm" ? "Makan Halal" : "Halal Meals"}
            </span>
          </div>
          <span className="font-bold text-xs text-stone-950 ml-1.5 shrink-0">{formatRM(food)}</span>
        </div>

        {/* 4. Transport */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="w-5 h-5 rounded-md bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
              <Car className="w-3 h-3" />
            </div>
            <span className="text-[11px] font-medium text-stone-600 truncate">
              {locale === "bm" ? "Tambang Grab" : "Local Rides"}
            </span>
          </div>
          <span className="font-bold text-xs text-stone-950 ml-1.5 shrink-0">{formatRM(transport)}</span>
        </div>
      </div>
    </div>
  );
}
