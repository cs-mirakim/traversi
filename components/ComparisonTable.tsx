"use client";

import React from "react";
import { Check, X, Minus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ComparisonFeature {
  titleBm: string;
  titleEn: string;
  descBm: string;
  descEn: string;
  traversi: "yes" | "no" | "partial";
  skyscanner: "yes" | "no" | "partial";
  googleFlights: "yes" | "no" | "partial";
  traveloka: "yes" | "no" | "partial";
  klook: "yes" | "no" | "partial";
}

const COMPARISON_DATA: ComparisonFeature[] = [
  {
    titleBm: "1. Carian Tambang Penerbangan Global Masa Nyata",
    titleEn: "1. Real-Time Global Airfare Search",
    descBm: "Carian dan perbandingan tambang tiket syarikat penerbangan antarabangsa secara langsung.",
    descEn: "Live fare search and comparison across international flight carrier networks.",
    traversi: "yes",
    skyscanner: "yes",
    googleFlights: "yes",
    traveloka: "yes",
    klook: "partial",
  },
  {
    titleBm: "2. Carian Bajet Terbalik Mengikut Siling RM",
    titleEn: "2. Reverse-Budgeting by RM Spending Ceiling",
    descBm: "Masukkan jumlah baki wang poket; enjin mencadangkan destinasi yang muat kos percutian sebenar.",
    descEn: "Enter your spending limit; engine computes destinations fitting total realistic trip cost.",
    traversi: "yes",
    skyscanner: "partial",
    googleFlights: "partial",
    traveloka: "no",
    klook: "no",
  },
  {
    titleBm: "3. Kiraan Holistik 4 Dimensi (Tiket + Bilik Kongsi + Makan + Grab)",
    titleEn: "3. Holistic 4D Cost Modeling (Flight + Room + Food + Local Rides)",
    descBm: "Mengambil kira formula bilik hotel kongsi ceil(pax/2), kos makan harian, dan tambang pengangkutan.",
    descEn: "Includes twin-share room logic ceil(pax/2), daily halal dining, and local rideshare transportation.",
    traversi: "yes",
    skyscanner: "no",
    googleFlights: "no",
    traveloka: "partial",
    klook: "no",
  },
  {
    titleBm: "4. Semakan Syarat Visa & Akses Pasport Malaysia",
    titleEn: "4. Malaysian Passport Specific Visa Intelligence",
    descBm: "Semakan status Bebas Visa, eVisa, atau Visa Ketibaan (VoA) khusus untuk pemegang pasport Malaysia.",
    descEn: "Tailored Visa-Free, eVisa, or VoA validity status mapped directly to Malaysian passport holders.",
    traversi: "yes",
    skyscanner: "no",
    googleFlights: "no",
    traveloka: "partial",
    klook: "no",
  },
  {
    titleBm: "5. Audit Makanan Halal Tempatan (Geospatial / OpenStreetMap)",
    titleEn: "5. Local Halal Food Audit (Geospatial / OpenStreetMap)",
    descBm: "Kueri nod diet:halal di sekitar pusat bandar untuk memastikan kemudahan makanan halal.",
    descEn: "Real diet:halal geospatial node analysis around city center to verify Muslim-friendly dining ease.",
    traversi: "yes",
    skyscanner: "no",
    googleFlights: "no",
    traveloka: "partial",
    klook: "partial",
  },
  {
    titleBm: "6. Tempahan Terus Tiket & Baucar Penginapan Dalam Aplikasi (OTA)",
    titleEn: "6. Direct Commercial Booking & Ticketing Engine (OTA)",
    descBm: "Pembelian tiket penerbangan dan baucar hotel secara komersial terus dalam aplikasi.",
    descEn: "Direct transactional purchasing of flight e-tickets and accommodation vouchers in-app.",
    traversi: "no",
    skyscanner: "yes",
    googleFlights: "yes",
    traveloka: "yes",
    klook: "yes",
  },
  {
    titleBm: "7. Pas Tarikan Tempatan & Tiket Lawatan Harian (Tours & Passes)",
    titleEn: "7. Local Attraction Passes & Day Tour Tickets",
    descBm: "Jualan tiket taman tema, pas pengangkutan bandar (JR/MRT), dan pakej lawatan berpandu.",
    descEn: "Sales of theme park admissions, transit tourist passes, and localized day tour excursions.",
    traversi: "partial",
    skyscanner: "no",
    googleFlights: "no",
    traveloka: "yes",
    klook: "yes",
  },
];

export default function ComparisonTable() {
  const { locale } = useLanguage();

  const renderIndicator = (status: "yes" | "no" | "partial", isTraversi: boolean = false) => {
    if (status === "yes") {
      return (
        <div className="flex justify-center">
          <span
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${
              isTraversi
                ? "bg-emerald-800 text-white shadow-xs"
                : "bg-emerald-100 text-emerald-800"
            }`}
            title={locale === "bm" ? "Disokong Penuh" : "Fully Supported"}
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
          </span>
        </div>
      );
    }

    if (status === "partial") {
      return (
        <div className="flex justify-center">
          <span
            className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center transition-transform hover:scale-110"
            title={locale === "bm" ? "Sokongan Separa / Terhad" : "Partial / Limited"}
          >
            <Minus className="w-4 h-4 stroke-[2.5]" />
          </span>
        </div>
      );
    }

    return (
      <div className="flex justify-center">
        <span
          className="w-7 h-7 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center transition-transform hover:scale-110"
          title={locale === "bm" ? "Tidak Disokong" : "Not Supported"}
        >
          <X className="w-3.5 h-3.5 stroke-[2]" />
        </span>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Comparison Table */}
      <div className="w-full overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-sm">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50/90 text-xs text-stone-700">
              <th className="p-4 sm:px-6 font-bold w-[36%]">
                {locale === "bm" ? "Keupayaan & Ciri Sistem" : "System Capabilities"}
              </th>
              {/* Highlighted Traversi Column */}
              <th className="p-4 text-center bg-emerald-50 text-emerald-950 border-x border-emerald-200 w-[16%]">
                <div className="tracking-tight text-sm font-black text-emerald-950">TRAVERSI</div>
                <div className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">
                  {locale === "bm" ? "Perancang Bajet MY" : "MY Budget Engine"}
                </div>
              </th>
              <th className="p-3 text-center text-stone-700 font-bold w-[12%]">
                <div className="text-xs font-bold text-stone-900">Skyscanner</div>
                <div className="text-[10px] text-stone-500 font-medium">Metasearch</div>
              </th>
              <th className="p-3 text-center text-stone-700 font-bold w-[12%]">
                <div className="text-xs font-bold text-stone-900">Google Flights</div>
                <div className="text-[10px] text-stone-500 font-medium">Airfare Matrix</div>
              </th>
              <th className="p-3 text-center text-stone-700 font-bold w-[12%]">
                <div className="text-xs font-bold text-stone-900">Traveloka</div>
                <div className="text-[10px] text-stone-500 font-medium">Regional OTA</div>
              </th>
              <th className="p-3 text-center text-stone-700 font-bold w-[12%]">
                <div className="text-xs font-bold text-stone-900">Klook</div>
                <div className="text-[10px] text-stone-500 font-medium">Tours &amp; Passes</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-xs">
            {COMPARISON_DATA.map((row, idx) => (
              <tr 
                key={idx} 
                className="hover:bg-stone-50/60 transition-colors"
              >
                {/* Feature Name & Description */}
                <td className="p-4 sm:px-6">
                  <p className="font-bold text-stone-950 text-xs mb-1 leading-snug">
                    {locale === "bm" ? row.titleBm : row.titleEn}
                  </p>
                  <p className="text-stone-600 text-[11px] leading-relaxed font-medium">
                    {locale === "bm" ? row.descBm : row.descEn}
                  </p>
                </td>

                {/* Traversi Column (Highlighted) */}
                <td className="p-3 text-center bg-emerald-50/30 border-x border-emerald-200">
                  {renderIndicator(row.traversi, true)}
                </td>

                {/* Skyscanner */}
                <td className="p-3 text-center">
                  {renderIndicator(row.skyscanner)}
                </td>

                {/* Google Flights */}
                <td className="p-3 text-center">
                  {renderIndicator(row.googleFlights)}
                </td>

                {/* Traveloka */}
                <td className="p-3 text-center">
                  {renderIndicator(row.traveloka)}
                </td>

                {/* Klook */}
                <td className="p-3 text-center">
                  {renderIndicator(row.klook)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
