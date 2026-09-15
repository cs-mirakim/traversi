"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ComparisonFeature {
  titleBm: string;
  titleEn: string;
  descBm: string;
  descEn: string;
  traversi: boolean | string;
  skyscanner: boolean | string;
  googleFlights: boolean | string;
  traveloka: boolean | string;
  klook: boolean | string;
}

const COMPARISON_DATA: ComparisonFeature[] = [
  {
    titleBm: "Anggaran Kos Penuh 4 Dimensi (Tiket + Hotel + Makan + Grab)",
    titleEn: "Full 4D Cost Breakdown (Flights + Hotel + Meals + Transport)",
    descBm: "Mengira kos realistik 4 perbelanjaan wajib dalam satu paparan angka perbelanjaan telus tanpa caj tersembunyi.",
    descEn: "Calculates realistic costs across all 4 mandatory expense categories in a single transparent figure.",
    traversi: true,
    skyscanner: false,
    googleFlights: false,
    traveloka: false,
    klook: false,
  },
  {
    titleBm: "Formula Bajet Terbalik (\"Reverse-Budgeting\")",
    titleEn: "Reverse-Budgeting Formula",
    descBm: "Pengguna hanya letak bajet poket, sistem yang tentukan destinasi mana yang muat bajet mengikut bilangan pax & hari.",
    descEn: "User simply enters available budget; the engine determines which destinations fit within group size and duration.",
    traversi: true,
    skyscanner: false,
    googleFlights: false,
    traveloka: false,
    klook: false,
  },
  {
    titleBm: "Semakan Pasport Malaysia & Akses Bebas Visa Dinamik",
    titleEn: "Dynamic Malaysian Passport Visa Regulations",
    descBm: "Semakan automatik status visa dan tempoh hari sah khusus untuk pemegang pasport Malaysia (180+ negara).",
    descEn: "Automated visa requirements and valid duration specifically for Malaysian passport holders (180+ countries).",
    traversi: true,
    skyscanner: false,
    googleFlights: false,
    traveloka: false,
    klook: false,
  },
  {
    titleBm: "Skor Halal Berpusatkan OpenStreetMap (Overpass API)",
    titleEn: "Geospatial Halal Audit via OpenStreetMap (Overpass API)",
    descBm: "Mengesan bilangan premis makanan diet:halal sebenar di sekitar koordinat bandar destinasi secara geospatial.",
    descEn: "Detects real diet:halal nodes within the destination city coordinates directly via geospatial queries.",
    traversi: true,
    skyscanner: false,
    googleFlights: false,
    traveloka: false,
    klook: false,
  },
  {
    titleBm: "Mod Bajet Fleksibel (Per Pax vs Jumlah Kumpulan)",
    titleEn: "Flexible Budgeting (Per Person vs Group Total)",
    descBm: "Kiraan automatik sama ada perbelanjaan dikira bagi setiap individu atau perkongsian bilik hotel (twin sharing).",
    descEn: "Automatic computation per individual or shared room basis (twin sharing) for the entire travel group.",
    traversi: true,
    skyscanner: false,
    googleFlights: false,
    traveloka: false,
    klook: false,
  },
  {
    titleBm: "Penjanaan Itinerari 4 Hari Realistik Belia",
    titleEn: "Realistic 4-Day Youth Itinerary Generation",
    descBm: "Cadangan aktiviti harian berbaloi yang dipadankan dengan baki lebihan simpanan sebenar tanpa jadual padat.",
    descEn: "Curated daily activity recommendations matched with remaining pocket savings at an enjoyable pace.",
    traversi: true,
    skyscanner: false,
    googleFlights: false,
    traveloka: false,
    klook: false,
  },
  {
    titleBm: "100% Percuma & Dioptimumkan untuk Belia Malaysia",
    titleEn: "100% Free & Built for Malaysian Youth",
    descBm: "Bebas tanpa sebarang caj komisen terselindung, bayaran langganan, atau harga berbeza.",
    descEn: "Free with zero hidden fees, markups, or subscription requirements.",
    traversi: true,
    skyscanner: "separa",
    googleFlights: "separa",
    traveloka: false,
    klook: false,
  },
];

export default function ComparisonTable() {
  const { locale } = useLanguage();

  return (
    <div className="w-full overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-sm">
      <table className="w-full text-left border-collapse min-w-[780px]">
        <thead>
          <tr className="border-b border-stone-200 bg-stone-50/80 text-xs text-stone-700">
            <th className="p-5 font-bold w-[35%]">
              {locale === "bm" ? "Ciri & Keupayaan Sistem" : "System Capabilities"}
            </th>
            {/* Highlighted Traversi Column */}
            <th className="p-5 font-black text-center bg-emerald-50 text-emerald-950 border-x border-emerald-200 w-[17%]">
              <div className="tracking-tight text-base font-black text-emerald-950">TRAVERSI</div>
              <div className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">
                {locale === "bm" ? "Edisi Malaysia" : "Malaysia-First"}
              </div>
            </th>
            <th className="p-4 text-center text-stone-700 font-bold w-[12%]">
              <div>Skyscanner</div>
              <div className="text-[10px] text-stone-500 font-medium">UK / Global</div>
            </th>
            <th className="p-4 text-center text-stone-700 font-bold w-[12%]">
              <div>Google Flights</div>
              <div className="text-[10px] text-stone-500 font-medium">US / Global</div>
            </th>
            <th className="p-4 text-center text-stone-700 font-bold w-[12%]">
              <div>Traveloka</div>
              <div className="text-[10px] text-stone-500 font-medium">SEA</div>
            </th>
            <th className="p-4 text-center text-stone-700 font-bold w-[12%]">
              <div>Klook</div>
              <div className="text-[10px] text-stone-500 font-medium">Global</div>
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
              <td className="p-5">
                <p className="font-bold text-stone-900 text-sm mb-1 leading-snug">
                  {locale === "bm" ? row.titleBm : row.titleEn}
                </p>
                <p className="text-stone-600 text-xs leading-relaxed font-medium">
                  {locale === "bm" ? row.descBm : row.descEn}
                </p>
              </td>

              {/* Traversi Column (Highlighted) */}
              <td className="p-4 text-center bg-emerald-50/60 border-x border-emerald-200">
                <div className="w-7 h-7 mx-auto rounded-lg bg-emerald-800 text-white flex items-center justify-center shadow-xs">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              </td>

              {/* Skyscanner */}
              <td className="p-4 text-center">
                {row.skyscanner === true ? (
                  <div className="w-6 h-6 mx-auto rounded-md bg-stone-100 text-stone-700 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                ) : row.skyscanner === "separa" ? (
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {locale === "bm" ? "Tiket Sahaja" : "Flights Only"}
                  </span>
                ) : (
                  <div className="w-6 h-6 mx-auto rounded-md bg-stone-100 text-stone-400 flex items-center justify-center">
                    <X className="w-3.5 h-3.5" />
                  </div>
                )}
              </td>

              {/* Google Flights */}
              <td className="p-4 text-center">
                {row.googleFlights === true ? (
                  <div className="w-6 h-6 mx-auto rounded-md bg-stone-100 text-stone-700 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                ) : row.googleFlights === "separa" ? (
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {locale === "bm" ? "Tiket Sahaja" : "Flights Only"}
                  </span>
                ) : (
                  <div className="w-6 h-6 mx-auto rounded-md bg-stone-100 text-stone-400 flex items-center justify-center">
                    <X className="w-3.5 h-3.5" />
                  </div>
                )}
              </td>

              {/* Traveloka */}
              <td className="p-4 text-center">
                {row.traveloka === true ? (
                  <div className="w-6 h-6 mx-auto rounded-md bg-stone-100 text-stone-700 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <div className="w-6 h-6 mx-auto rounded-md bg-stone-100 text-stone-400 flex items-center justify-center">
                    <X className="w-3.5 h-3.5" />
                  </div>
                )}
              </td>

              {/* Klook */}
              <td className="p-4 text-center">
                {row.klook === true ? (
                  <div className="w-6 h-6 mx-auto rounded-md bg-stone-100 text-stone-700 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <div className="w-6 h-6 mx-auto rounded-md bg-stone-100 text-stone-400 flex items-center justify-center">
                    <X className="w-3.5 h-3.5" />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
