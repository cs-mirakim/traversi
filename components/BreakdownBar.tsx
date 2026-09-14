"use client";

import React from "react";
import { Plane, Building, Utensils, Car } from "lucide-react";
import { formatRM } from "@/lib/utils";

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
  // Safe percentages
  const safeTotal = total > 0 ? total : 1;
  const pFlight = Math.round((flight / safeTotal) * 100);
  const pHotel = Math.round((hotel / safeTotal) * 100);
  const pFood = Math.round((food / safeTotal) * 100);
  const pTransport = Math.max(2, 100 - pFlight - pHotel - pFood);

  return (
    <div className="w-full space-y-2">
      {/* Visual Multi-Segment Bar */}
      <div 
        className="h-3 w-full rounded-full bg-stone-100 overflow-hidden flex border border-stone-300"
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

      {/* Metric Pills / Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
        <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-50 border border-stone-200">
          <Plane className="w-3.5 h-3.5 text-sky-700 shrink-0" />
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-stone-700 leading-tight">Tiket Penerbangan</p>
            <p className="font-bold text-stone-950 truncate">{formatRM(flight)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-50 border border-stone-200">
          <Building className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-stone-700 leading-tight">Penginapan/Hotel</p>
            <p className="font-bold text-stone-950 truncate">{formatRM(hotel)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-50 border border-stone-200">
          <Utensils className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-stone-700 leading-tight">Makan Minum</p>
            <p className="font-bold text-stone-950 truncate">{formatRM(food)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-50 border border-stone-200">
          <Car className="w-3.5 h-3.5 text-stone-700 shrink-0" />
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-stone-700 leading-tight">Pengangkutan</p>
            <p className="font-bold text-stone-950 truncate">{formatRM(transport)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

