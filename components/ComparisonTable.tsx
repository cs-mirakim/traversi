"use client";

import React from "react";
import { Check, X } from "lucide-react";

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
    description: "Mengira kos realistik 4 perbelanjaan wajib dalam satu paparan angka perbelanjaan telus.",
    traversi: true,
    skyscanner: false,
    googleFlights: false,
    traveloka: false,
    klook: false,
  },
  {
    title: "Formula Bajet Terbalik (\"Reverse-Budgeting\")",
    description: "Pengguna hanya letak bajet poket, sistem yang tentukan destinasi mana yang lepas bajet.",
    traversi: true,
    skyscanner: false,
    googleFlights: false,
    traveloka: false,
    klook: false,
  },
  {
    title: "Semakan Pasport Malaysia & Akses Bebas Visa",
    description: "Amaran automatik status visa dan had tempoh hari sah khusus untuk warganegara Malaysia.",
    traversi: true,
    skyscanner: false,
    googleFlights: false,
    traveloka: false,
    klook: false,
  },
  {
    title: "Skor & Panduan Port Makanan Halal Tempatan",
    description: "Pengesanan kemudahan mencari premis makanan halal serta cadangan port spesifik di setiap bandar.",
    traversi: true,
    skyscanner: false,
    googleFlights: false,
    traveloka: false,
    klook: false,
  },
  {
    title: "Mod Bajet Fleksibel (Per Pax @ Jumlah Kumpulan)",
    description: "Kiraan automatik sama ada perbelanjaan dikira bagi setiap individu atau kos kongsi kumpulan.",
    traversi: true,
    skyscanner: false,
    googleFlights: false,
    traveloka: false,
    klook: false,
  },
  {
    title: "Penjanaan Itinerari Harian Mengikut Baki Poket",
    description: "Cadangan aktiviti harian bersesuaian yang dipadankan dengan baki lebihan simpanan sebenar.",
    traversi: true,
    skyscanner: false,
    googleFlights: false,
    traveloka: false,
    klook: false,
  },
  {
    title: "100% Percuma & Dioptimumkan untuk Belia Malaysia",
    description: "Bebas tanpa caj komisen tiket terselindung atau kos tersembunyi agensi pelancongan.",
    traversi: true,
    skyscanner: "separa",
    googleFlights: "separa",
    traveloka: false,
    klook: false,
  },
];

export default function ComparisonTable() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header Badge & Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-950 mb-2 border border-emerald-300">
            <span>Penanda Aras Ekosistem</span>
            <span className="text-emerald-700">•</span>
            <span className="text-emerald-800 font-medium normal-case tracking-normal">Audit Platform Perjalanan 2026</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight">
            Perbandingan Traversi Berbanding Platform Komersial
          </h2>
        </div>

        <div className="shrink-0">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-2xs">
            TRAVERSI: Malaysia-First
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto rounded-2xl border border-stone-300 bg-white shadow-sm">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50/80 text-xs text-stone-800">
              <th className="p-4 sm:p-5 font-bold w-[34%]">
                Ciri &amp; Keupayaan Sistem
              </th>
              {/* Highlighted Traversi Column */}
              <th className="p-4 sm:p-5 font-black text-center bg-emerald-50 text-emerald-950 border-x border-emerald-200 w-[16%]">
                <div className="tracking-tight text-sm font-black">TRAVERSI</div>
                <div className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">Malaysia</div>
              </th>
              <th className="p-3 sm:p-4 text-center text-stone-700 font-bold w-[12%]">
                <div>Skyscanner</div>
                <div className="text-[10px] text-stone-700 font-medium">UK / Global</div>
              </th>
              <th className="p-3 sm:p-4 text-center text-stone-700 font-bold w-[12%]">
                <div>Google Flights</div>
                <div className="text-[10px] text-stone-700 font-medium">US</div>
              </th>
              <th className="p-3 sm:p-4 text-center text-stone-700 font-bold w-[13%]">
                <div>Traveloka</div>
                <div className="text-[10px] text-stone-700 font-medium">SEA</div>
              </th>
              <th className="p-3 sm:p-4 text-center text-stone-700 font-bold w-[13%]">
                <div>Klook</div>
                <div className="text-[10px] text-stone-700 font-medium">Global</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 text-xs">
            {COMPARISON_DATA.map((row, idx) => (
              <tr 
                key={idx} 
                className="hover:bg-stone-50/60 transition-colors"
              >
                {/* Feature Name & Description */}
                <td className="p-4 sm:p-5">
                  <p className="font-bold text-stone-950 text-sm mb-1 leading-snug">
                    {row.title}
                  </p>
                  <p className="text-stone-700 text-xs leading-relaxed font-medium">
                    {row.description}
                  </p>
                </td>

                {/* Traversi Column (Highlighted) */}
                <td className="p-4 text-center bg-emerald-50/70 border-x border-emerald-200">
                  <div className="w-7 h-7 mx-auto rounded-lg bg-emerald-800 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </td>

                {/* Skyscanner */}
                <td className="p-4 text-center">
                  {row.skyscanner === true ? (
                    <div className="w-6 h-6 mx-auto rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  ) : row.skyscanner === "separa" ? (
                    <span className="inline-block text-[11px] font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                      Tiket Sahaja
                    </span>
                  ) : (
                    <div className="w-6 h-6 mx-auto text-stone-400 flex items-center justify-center">
                      <X className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  )}
                </td>

                {/* Google Flights */}
                <td className="p-4 text-center">
                  {row.googleFlights === true ? (
                    <div className="w-6 h-6 mx-auto rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  ) : row.googleFlights === "separa" ? (
                    <span className="inline-block text-[11px] font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                      Tiket Sahaja
                    </span>
                  ) : (
                    <div className="w-6 h-6 mx-auto text-stone-400 flex items-center justify-center">
                      <X className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  )}
                </td>

                {/* Traveloka */}
                <td className="p-4 text-center">
                  {row.traveloka === true ? (
                    <div className="w-6 h-6 mx-auto rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 mx-auto text-stone-400 flex items-center justify-center">
                      <X className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  )}
                </td>

                {/* Klook */}
                <td className="p-4 text-center">
                  {row.klook === true ? (
                    <div className="w-6 h-6 mx-auto rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 mx-auto text-stone-400 flex items-center justify-center">
                      <X className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
