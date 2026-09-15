"use client";

import React from "react";
import { Check, X, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ComparisonFeature {
  titleBm: string;
  titleEn: string;
  descBm: string;
  descEn: string;
  traversi: { type: "yes" | "no" | "partial"; labelBm: string; labelEn: string };
  skyscanner: { type: "yes" | "no" | "partial"; labelBm: string; labelEn: string };
  googleFlights: { type: "yes" | "no" | "partial"; labelBm: string; labelEn: string };
  traveloka: { type: "yes" | "no" | "partial"; labelBm: string; labelEn: string };
  klook: { type: "yes" | "no" | "partial"; labelBm: string; labelEn: string };
}

const COMPARISON_DATA: ComparisonFeature[] = [
  {
    titleBm: "1. Carian Tambang Penerbangan Global Masa Nyata",
    titleEn: "1. Real-Time Global Airfare Search",
    descBm: "Carian harga tiket penerbangan daripada pelbagai syarikat penerbangan antarabangsa.",
    descEn: "Search and compare live flight fares across international carrier networks.",
    traversi: { type: "yes", labelBm: "Amadeus API", labelEn: "Amadeus API" },
    skyscanner: { type: "yes", labelBm: "Metasearch Penuh", labelEn: "Full Metasearch" },
    googleFlights: { type: "yes", labelBm: "Matriks Kalendar", labelEn: "Fast Matrix" },
    traveloka: { type: "yes", labelBm: "Inventori SEA", labelEn: "SEA Inventory" },
    klook: { type: "partial", labelBm: "Tiket Terpilih", labelEn: "Selected Flights" },
  },
  {
    titleBm: "2. Formula Bajet Terbalik (\"Reverse-Budgeting\") Mengikut Siling RM",
    titleEn: "2. Reverse-Budgeting by RM Spending Ceiling",
    descBm: "Hanya masukkan jumlah bajet poket, sistem yang mencadangkan destinasi yang muat kos keseluruhan.",
    descEn: "Simply enter your available cash ceiling; engine computes destinations fitting total realistic trip cost.",
    traversi: { type: "yes", labelBm: "Kiraan Penuh 4D", labelEn: "Full 4D Fit" },
    skyscanner: { type: "partial", labelBm: "Tiket Sahaja (Explore)", labelEn: "Flights Only (Explore)" },
    googleFlights: { type: "partial", labelBm: "Tiket Sahaja (Explore)", labelEn: "Flights Only (Explore)" },
    traveloka: { type: "no", labelBm: "Wajib Pilih Bandar", labelEn: "City Required" },
    klook: { type: "no", labelBm: "Wajib Pilih Tarikan", labelEn: "Attraction Required" },
  },
  {
    titleBm: "3. Kiraan Holistik 4 Dimensi (Tiket + Hotel Kongsi + Makan + Grab)",
    titleEn: "3. Holistic 4D Cost Modeling (Flight + Room + Food + Local Rides)",
    descBm: "Mengambil kira formula bilik hotel kongsi berdua ceil(pax/2), kos makan harian, dan pengangkutan bandar.",
    descEn: "Includes twin-share room logic ceil(pax/2), daily halal dining, and local rideshare transportation.",
    traversi: { type: "yes", labelBm: "Formula Holistik 4D", labelEn: "Holistic 4D Math" },
    skyscanner: { type: "no", labelBm: "Tiket & Hotel Asing", labelEn: "Separate Bookings" },
    googleFlights: { type: "no", labelBm: "Tiket Sahaja", labelEn: "Flights Only" },
    traveloka: { type: "partial", labelBm: "Pakej Tiket+Hotel", labelEn: "Flight+Hotel Combo" },
    klook: { type: "no", labelBm: "Aktiviti Sahaja", labelEn: "Activities Only" },
  },
  {
    titleBm: "4. Semakan Syarat Visa & Akses Khusus Pasport Malaysia",
    titleEn: "4. Malaysian Passport Specific Visa Intelligence",
    descBm: "Semakan status Bebas Visa, eVisa, atau Visa Semasa Ketibaan (VoA) khusus untuk warganegara Malaysia.",
    descEn: "Tailored Visa-Free, eVisa, or VoA validity status mapped directly to Malaysian passport holders.",
    traversi: { type: "yes", labelBm: "180+ Data Pasport MY", labelEn: "180+ MY Passport Data" },
    skyscanner: { type: "no", labelBm: "Tiada Maklumat", labelEn: "Not Available" },
    googleFlights: { type: "no", labelBm: "Tiada Maklumat", labelEn: "Not Available" },
    traveloka: { type: "partial", labelBm: "Peringatan Am", labelEn: "General Notice" },
    klook: { type: "no", labelBm: "Tiada Maklumat", labelEn: "Not Available" },
  },
  {
    titleBm: "5. Audit Makanan Halal Tempatan (Geospatial / OpenStreetMap)",
    titleEn: "5. Local Halal Food Audit (Geospatial / OpenStreetMap)",
    descBm: "Kueri nod diet:halal di sekitar bandar destinasi untuk memudahkan pelancong Muslim merancang perbelanjaan.",
    descEn: "Real diet:halal geospatial node analysis around city center to verify Muslim-friendly dining ease.",
    traversi: { type: "yes", labelBm: "Kueri Overpass OSM", labelEn: "OSM Overpass Query" },
    skyscanner: { type: "no", labelBm: "Tiada Penapis", labelEn: "Not Available" },
    googleFlights: { type: "no", labelBm: "Tiada Penapis", labelEn: "Not Available" },
    traveloka: { type: "partial", labelBm: "Penapis Hotel Sahaja", labelEn: "Hotel Filter Only" },
    klook: { type: "partial", labelBm: "Pakej Terpilih", labelEn: "Selected Tours" },
  },
  {
    titleBm: "6. Tempahan Terus Tiket & Pas Lawatan (Commercial OTA Engine)",
    titleEn: "6. Direct Commercial Booking & Ticketing Engine (OTA)",
    descBm: "Pembelian tiket sah dan pengeluaran baucar penginapan terus dalam sistem.",
    descEn: "Direct transactional purchasing of flight e-tickets and accommodation vouchers in-app.",
    traversi: { type: "no", labelBm: "Bukan OTA (Perancang Sahaja)", labelEn: "Planner Only (Non-OTA)" },
    skyscanner: { type: "yes", labelBm: "Pautan Syarikat/OTA", labelEn: "Airline / OTA Redirect" },
    googleFlights: { type: "yes", labelBm: "Tempah Terus Syarikat", labelEn: "Book via Airline" },
    traveloka: { type: "yes", labelBm: "OTA Penuh Terintegrasi", labelEn: "Full Integrated OTA" },
    klook: { type: "yes", labelBm: "Peneraju Tiket & Pas", labelEn: "Pass & Ticket Leader" },
  },
  {
    titleBm: "7. Pas Tarikan Tempatan & Tiket Lawatan Harian (Attractions & Tours)",
    titleEn: "7. Local Attraction Passes & Day Tour Tickets",
    descBm: "Jualan pas tiket taman tema, pengangkutan awam bandar (JR/MRT pass), dan aktiviti berpandu.",
    descEn: "Sales of theme park admissions, transit tourist passes, and localized day tour excursions.",
    traversi: { type: "partial", labelBm: "Cadangan Jadual AI", labelEn: "AI Suggested Plans" },
    skyscanner: { type: "no", labelBm: "Tiada", labelEn: "Not Available" },
    googleFlights: { type: "no", labelBm: "Tiada", labelEn: "Not Available" },
    traveloka: { type: "yes", labelBm: "Traveloka Xperience", labelEn: "Traveloka Xperience" },
    klook: { type: "yes", labelBm: "Katalog Global Terbesar", labelEn: "Largest Global Catalog" },
  },
];

export default function ComparisonTable() {
  const { locale } = useLanguage();

  const renderBadge = (item: { type: "yes" | "no" | "partial"; labelBm: string; labelEn: string }, isTraversi: boolean = false) => {
    const label = locale === "bm" ? item.labelBm : item.labelEn;

    if (item.type === "yes") {
      return (
        <div className="flex flex-col items-center gap-1">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-2xs ${
            isTraversi 
              ? "bg-emerald-800 text-white shadow-emerald-900/10" 
              : "bg-emerald-50 text-emerald-950 border border-emerald-300"
          }`}>
            <Check className="w-3.5 h-3.5 stroke-[2.5] shrink-0" />
            <span>{label}</span>
          </span>
        </div>
      );
    }

    if (item.type === "partial") {
      return (
        <div className="flex flex-col items-center gap-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-950 border border-amber-300 text-[11px] font-bold shadow-2xs">
            <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>{label}</span>
          </span>
        </div>
      );
    }

    // "no"
    return (
      <div className="flex flex-col items-center gap-1">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 text-stone-600 border border-stone-200 text-[11px] font-medium">
          <X className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span>{label}</span>
        </span>
      </div>
    );
  };

  return (
    <div className="w-full space-y-4">
      {/* Explicit Petunjuk Simbol / Legend Card */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
            {locale === "bm" ? "Petunjuk Simbol:" : "Legend:"}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-medium">
          {/* Yes */}
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-950 border border-emerald-300 px-2.5 py-1 rounded-lg text-[11px] font-bold">
            <Check className="w-3.5 h-3.5 text-emerald-700" />
            <span>{locale === "bm" ? "Disokong Penuh" : "Fully Supported"}</span>
          </div>

          {/* Partial */}
          <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-950 border border-amber-300 px-2.5 py-1 rounded-lg text-[11px] font-bold">
            <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>{locale === "bm" ? "Sokongan Separa / Terhad" : "Partial / Limited"}</span>
          </div>

          {/* No */}
          <div className="inline-flex items-center gap-1.5 bg-stone-100 text-stone-600 border border-stone-200 px-2.5 py-1 rounded-lg text-[11px] font-medium">
            <X className="w-3.5 h-3.5 text-stone-400" />
            <span>{locale === "bm" ? "Tidak Disokong / Tiada" : "Not Supported"}</span>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="w-full overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-sm">
        <table className="w-full text-left border-collapse min-w-[860px]">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50/90 text-xs text-stone-700">
              <th className="p-4 font-bold w-[34%]">
                {locale === "bm" ? "Ciri & Keupayaan Sistem" : "System Capabilities"}
              </th>
              {/* Highlighted Traversi Column */}
              <th className="p-4 font-black text-center bg-emerald-50 text-emerald-950 border-x border-emerald-200 w-[18%]">
                <div className="tracking-tight text-sm font-black text-emerald-950">TRAVERSI</div>
                <div className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">
                  {locale === "bm" ? "Perancang Bajet MY" : "MY Budget Engine"}
                </div>
              </th>
              <th className="p-3 text-center text-stone-700 font-bold w-[12%]">
                <div className="text-xs font-bold text-stone-900">Skyscanner</div>
                <div className="text-[10px] text-stone-500 font-medium">Global Metasearch</div>
              </th>
              <th className="p-3 text-center text-stone-700 font-bold w-[12%]">
                <div className="text-xs font-bold text-stone-900">Google Flights</div>
                <div className="text-[10px] text-stone-500 font-medium">Airfare Matrix</div>
              </th>
              <th className="p-3 text-center text-stone-700 font-bold w-[12%]">
                <div className="text-xs font-bold text-stone-900">Traveloka</div>
                <div className="text-[10px] text-stone-500 font-medium">Southeast Asia OTA</div>
              </th>
              <th className="p-3 text-center text-stone-700 font-bold w-[12%]">
                <div className="text-xs font-bold text-stone-900">Klook</div>
                <div className="text-[10px] text-stone-500 font-medium">Tours & Activities</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-xs">
            {COMPARISON_DATA.map((row, idx) => (
              <tr 
                key={idx} 
                className="hover:bg-stone-50/70 transition-colors"
              >
                {/* Feature Name & Description */}
                <td className="p-4">
                  <p className="font-bold text-stone-900 text-xs mb-1 leading-snug">
                    {locale === "bm" ? row.titleBm : row.titleEn}
                  </p>
                  <p className="text-stone-600 text-[11px] leading-relaxed font-medium">
                    {locale === "bm" ? row.descBm : row.descEn}
                  </p>
                </td>

                {/* Traversi Column (Highlighted) */}
                <td className="p-3 text-center bg-emerald-50/40 border-x border-emerald-200">
                  {renderBadge(row.traversi, true)}
                </td>

                {/* Skyscanner */}
                <td className="p-3 text-center">
                  {renderBadge(row.skyscanner)}
                </td>

                {/* Google Flights */}
                <td className="p-3 text-center">
                  {renderBadge(row.googleFlights)}
                </td>

                {/* Traveloka */}
                <td className="p-3 text-center">
                  {renderBadge(row.traveloka)}
                </td>

                {/* Klook */}
                <td className="p-3 text-center">
                  {renderBadge(row.klook)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
