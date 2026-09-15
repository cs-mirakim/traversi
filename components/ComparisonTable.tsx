"use client";

import React from "react";
import { Check, X, ShieldCheck, Sparkles } from "lucide-react";

interface ComparisonFeature {
  title: string;
  description: string;
  traversi: boolean | string;
  skyscanner: boolean | string;
  googleFlights: boolean | string;
  traveloka: boolean | string;
  klook: boolean | string;
}

const COMPARISON_DATA: ComparisonFeature[] = [
  {
    title: "Anggaran Kos Penuh 4 Dimensi (Tiket + Hotel + Makan + Grab)",
    description: "Mengira kos realistik 4 perbelanjaan wajib dalam satu paparan angka perbelanjaan telus tanpa caj tersembunyi.",
    traversi: true,
    skyscanner: false,
    googleFlights: false,
    traveloka: false,
    klook: false,
  },
  {
    title: "Formula Bajet Terbalik (\"Reverse-Budgeting\")",
    description: "Pengguna hanya letak bajet poket, sistem yang tentukan destinasi mana yang muat bajet mengikut bilangan pax & hari.",
    traversi: true,
    skyscanner: false,
    googleFlights: false,
    traveloka: false,
    klook: false,
  },
  {
    title: "Semakan Pasport Malaysia & Akses Bebas Visa Dinamik",
    description: "Semakan automatik status visa dan tempoh hari sah khusus untuk pemegang pasport Malaysia (180+ negara).",
    traversi: true,
    skyscanner: false,
    googleFlights: false,
    traveloka: false,
    klook: false,
  },
  {
    title: "Skor Halal Berpusatkan OpenStreetMap (Overpass API)",
    description: "Mengesan bilangan premis makanan diet:halal sebenar di sekitar koordinat bandar destinasi secara geospatial.",
    traversi: true,
    skyscanner: false,
    googleFlights: false,
    traveloka: false,
    klook: false,
  },
  {
    title: "Mod Bajet Fleksibel (Per Pax vs Jumlah Kumpulan)",
    description: "Kiraan automatik sama ada perbelanjaan dikira bagi setiap individu atau perkongsian bilik hotel (twin sharing).",
    traversi: true,
    skyscanner: false,
    googleFlights: false,
    traveloka: false,
    klook: false,
  },
  {
    title: "Penjanaan Itinerari 4 Hari Realistik Belia",
    description: "Cadangan aktiviti harian berbaloi yang dipadankan dengan baki lebihan simpanan sebenar tanpa kejar jadual.",
    traversi: true,
    skyscanner: false,
    googleFlights: false,
    traveloka: false,
    klook: false,
  },
  {
    title: "100% Percuma & Dioptimumkan untuk Belia Malaysia",
    description: "Bebas tanpa sebarang caj tersembunyi, komisen ejen terselindung, atau bayaran langganan korporat.",
    traversi: true,
    skyscanner: "separa",
    googleFlights: "separa",
    traveloka: false,
    klook: false,
  },
];

export default function ComparisonTable() {
  return (
    <div className="w-full">
      {/* Table Container */}
      <div className="w-full overflow-x-auto rounded-3xl border-2 border-emerald-300/40 bg-[#ecfdf5] text-[#022c22] shadow-2xl">
        <table className="w-full text-left border-collapse min-w-[780px]">
          <thead>
            <tr className="border-b-2 border-emerald-200 bg-emerald-100/70 text-xs text-emerald-950">
              <th className="p-5 font-black w-[35%]">
                Ciri &amp; Keupayaan Sistem
              </th>
              {/* Highlighted Traversi Column */}
              <th className="p-5 font-black text-center bg-[#022c22] text-[#ecfdf5] border-x-2 border-emerald-700 w-[17%]">
                <div className="tracking-tight text-base font-black text-white">TRAVERSI</div>
                <div className="text-[11px] text-emerald-300 font-bold uppercase tracking-wider">Malaysia-First</div>
              </th>
              <th className="p-4 text-center text-emerald-950 font-bold w-[12%]">
                <div>Skyscanner</div>
                <div className="text-[10px] text-emerald-700 font-semibold">UK / Global</div>
              </th>
              <th className="p-4 text-center text-emerald-950 font-bold w-[12%]">
                <div>Google Flights</div>
                <div className="text-[10px] text-emerald-700 font-semibold">US / Global</div>
              </th>
              <th className="p-4 text-center text-emerald-950 font-bold w-[12%]">
                <div>Traveloka</div>
                <div className="text-[10px] text-emerald-700 font-semibold">Indonesia / SEA</div>
              </th>
              <th className="p-4 text-center text-emerald-950 font-bold w-[12%]">
                <div>Klook</div>
                <div className="text-[10px] text-emerald-700 font-semibold">Hong Kong / Global</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-200/80 text-xs">
            {COMPARISON_DATA.map((row, idx) => (
              <tr 
                key={idx} 
                className="hover:bg-white/60 transition-colors"
              >
                {/* Feature Name & Description */}
                <td className="p-5">
                  <p className="font-black text-[#022c22] text-sm mb-1 leading-snug">
                    {row.title}
                  </p>
                  <p className="text-emerald-800 text-xs leading-relaxed font-medium">
                    {row.description}
                  </p>
                </td>

                {/* Traversi Column (Highlighted) */}
                <td className="p-4 text-center bg-emerald-100/50 border-x-2 border-emerald-700/30">
                  <div className="w-8 h-8 mx-auto rounded-xl bg-[#022c22] text-emerald-300 flex items-center justify-center shadow-md border border-emerald-500/40">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                </td>

                {/* Skyscanner */}
                <td className="p-4 text-center">
                  {row.skyscanner === true ? (
                    <div className="w-6 h-6 mx-auto rounded-md bg-stone-200 text-stone-700 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  ) : row.skyscanner === "separa" ? (
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      Tiket Sahaja
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
                    <div className="w-6 h-6 mx-auto rounded-md bg-stone-200 text-stone-700 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  ) : row.googleFlights === "separa" ? (
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      Tiket Sahaja
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
                    <div className="w-6 h-6 mx-auto rounded-md bg-stone-200 text-stone-700 flex items-center justify-center">
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
                    <div className="w-6 h-6 mx-auto rounded-md bg-stone-200 text-stone-700 flex items-center justify-center">
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
    </div>
  );
}
