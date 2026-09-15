"use client";

import React, { useState } from "react";
import { Check, X, Minus, Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PlatformDetail {
  status: "yes" | "no" | "partial";
  reasonBm: string;
  reasonEn: string;
}

interface ComparisonFeature {
  titleBm: string;
  titleEn: string;
  descBm: string;
  descEn: string;
  traversi: PlatformDetail;
  skyscanner: PlatformDetail;
  googleFlights: PlatformDetail;
  traveloka: PlatformDetail;
  klook: PlatformDetail;
}

const COMPARISON_DATA: ComparisonFeature[] = [
  {
    titleBm: "1. Carian Tambang Penerbangan Global Masa Nyata",
    titleEn: "1. Real-Time Global Airfare Search",
    descBm: "Carian dan perbandingan tambang tiket syarikat penerbangan antarabangsa secara langsung.",
    descEn: "Live fare search and comparison across international flight carrier networks.",
    traversi: {
      status: "yes",
      reasonBm: "Integrasi terus Amadeus API untuk kueri harga tiket penerbangan secara langsung.",
      reasonEn: "Direct Amadeus API integration for live global airfare pricing queries.",
    },
    skyscanner: {
      status: "yes",
      reasonBm: "Enjin metasearch menyeluruh yang mengagregatkan ratusan syarikat penerbangan antarabangsa.",
      reasonEn: "Comprehensive metasearch engine aggregating hundreds of international airline fares.",
    },
    googleFlights: {
      status: "yes",
      reasonBm: "Matriks carian pantas berasaskan ITA Matrix dengan graf tren harga tiket termurah.",
      reasonEn: "Ultra-fast search powered by ITA Matrix with calendar price trends.",
    },
    traveloka: {
      status: "yes",
      reasonBm: "Inventori tiket terus dengan liputan kuat bagi syarikat penerbangan rantau Asia Tenggara.",
      reasonEn: "Direct ticketing inventory with strong coverage of Southeast Asian carriers.",
    },
    klook: {
      status: "partial",
      reasonBm: "Pilihan penerbangan terhad; tumpuan utama platform adalah tiket tarikan dan pas aktiviti.",
      reasonEn: "Limited flight search; platform primarily focuses on attractions and activity passes.",
    },
  },
  {
    titleBm: "2. Carian Bajet Terbalik Mengikut Siling RM",
    titleEn: "2. Reverse-Budgeting by RM Spending Ceiling",
    descBm: "Masukkan jumlah baki bajet poket; enjin mencadangkan destinasi yang muat keseluruhan kos.",
    descEn: "Enter your spending limit; engine computes destinations fitting total realistic trip cost.",
    traversi: {
      status: "yes",
      reasonBm: "Carian bajet terbalik 100%: anda letak had RM, enjin menapis destinasi yang muat kos hidup penuh.",
      reasonEn: "100% reverse-budgeting: set your RM limit, engine finds destinations fitting total real costs.",
    },
    skyscanner: {
      status: "partial",
      reasonBm: "Fungsi 'Explore Everywhere' hanya menapis harga tiket terbang, tanpa mengambil kira kos hotel & makan.",
      reasonEn: "'Explore Everywhere' only checks flight prices, ignoring on-the-ground room and meal expenses.",
    },
    googleFlights: {
      status: "partial",
      reasonBm: "Carian 'Explore' hanya menyaring harga tiket kapal terbang tanpa anggaran kos sara hidup destinasi.",
      reasonEn: "'Explore' tool filters airfares only, without estimating hotel, dining, and local ride expenses.",
    },
    traveloka: {
      status: "no",
      reasonBm: "Wajib memilih bandar destinasi secara manual terlebih dahulu sebelum boleh mencari harga.",
      reasonEn: "Requires picking a specific destination city before initiating any searches.",
    },
    klook: {
      status: "no",
      reasonBm: "Wajib mencari mengikut bandar atau nama tarikan khusus terlebih dahulu.",
      reasonEn: "Must search by explicit destination city or attraction name first.",
    },
  },
  {
    titleBm: "3. Kiraan Holistik 4 Dimensi (Tiket + Bilik Kongsi + Makan + Grab)",
    titleEn: "3. Holistic 4D Cost Modeling (Flight + Room + Food + Local Rides)",
    descBm: "Mengambil kira formula bilik hotel kongsi ceil(pax/2), kos makan harian, dan tambang pengangkutan.",
    descEn: "Includes twin-share room logic ceil(pax/2), daily halal dining, and local rideshare transportation.",
    traversi: {
      status: "yes",
      reasonBm: "Formula 4D holistik merangkumi tiket, bilik kongsi berdua ceil(pax/2), makanan halal & pengangkutan.",
      reasonEn: "4D math model covers flights, twin-share rooms ceil(pax/2), halal dining, and local rides.",
    },
    skyscanner: {
      status: "no",
      reasonBm: "Hanya membandingkan tiket kapal terbang dan hotel secara berasingan tanpa model kos kumpulan.",
      reasonEn: "Compares flights and hotels separately without combined group cost modeling.",
    },
    googleFlights: {
      status: "no",
      reasonBm: "Hanya memaparkan tambang penerbangan tanpa sebarang anggaran kos hidup harian di destinasi.",
      reasonEn: "Displays flight airfares only without on-the-ground living cost calculations.",
    },
    traveloka: {
      status: "partial",
      reasonBm: "Menyediakan pakej gabungan Tiket + Hotel, tetapi tiada unjuran kos makan dan pengangkutan bandar.",
      reasonEn: "Offers Flight + Hotel combos, but lacks daily meals and ground transport estimates.",
    },
    klook: {
      status: "no",
      reasonBm: "Tertumpu kepada jualan tiket aktiviti berasingan tanpa pemodelan bajet menyeluruh.",
      reasonEn: "Focuses on individual ticket sales rather than total trip budget simulation.",
    },
  },
  {
    titleBm: "4. Semakan Syarat Visa & Akses Pasport Malaysia",
    titleEn: "4. Malaysian Passport Specific Visa Intelligence",
    descBm: "Semakan status Bebas Visa, eVisa, atau Visa Ketibaan (VoA) khusus untuk pemegang pasport Malaysia.",
    descEn: "Tailored Visa-Free, eVisa, or VoA validity status mapped directly to Malaysian passport holders.",
    traversi: {
      status: "yes",
      reasonBm: "Pemadanan pintar status Bebas Visa, eVisa, & VoA bagi 180+ destinasi khusus pasport Malaysia.",
      reasonEn: "Smart mapping of Visa-Free, eVisa, & VoA rules across 180+ countries for MY passport.",
    },
    skyscanner: {
      status: "no",
      reasonBm: "Tiada semakan syarat visa automatik mengikut kewarganegaraan pasport pengguna.",
      reasonEn: "No automated visa requirement checks mapped to the traveler's passport.",
    },
    googleFlights: {
      status: "no",
      reasonBm: "Tiada paparan keperluan visa atau maklumat imigresen untuk pemegang pasport Malaysia.",
      reasonEn: "Does not display Malaysian immigration or passport visa requirements.",
    },
    traveloka: {
      status: "partial",
      reasonBm: "Sekadar memaparkan nota am mengenai pasport/visa tanpa integrasi pangkalan data rasmi.",
      reasonEn: "Shows generic travel advisory notice without integrated passport visa database.",
    },
    klook: {
      status: "no",
      reasonBm: "Tiada semakan automatik kelayakan visa untuk pengembara pasport Malaysia.",
      reasonEn: "No built-in visa verification system for Malaysian passport holders.",
    },
  },
  {
    titleBm: "5. Audit Makanan Halal Tempatan (Geospatial / OpenStreetMap)",
    titleEn: "5. Local Halal Food Audit (Geospatial / OpenStreetMap)",
    descBm: "Kueri nod diet:halal di sekitar pusat bandar untuk memastikan kemudahan makanan halal.",
    descEn: "Real diet:halal geospatial node analysis around city center to verify Muslim-friendly dining ease.",
    traversi: {
      status: "yes",
      reasonBm: "Kueri geospatial OpenStreetMap Overpass mengira nod sebenar diet:halal di pusat bandar.",
      reasonEn: "Geospatial Overpass OSM query calculates real diet:halal nodes around city center.",
    },
    skyscanner: {
      status: "no",
      reasonBm: "Tiada data geospatial atau penapis restoran makanan halal untuk destinasi.",
      reasonEn: "No geospatial dataset or halal dining intelligence for destinations.",
    },
    googleFlights: {
      status: "no",
      reasonBm: "Tiada penapis atau maklumat kemudahan makanan halal untuk pelancong Muslim.",
      reasonEn: "No halal restaurant filters or Muslim-friendly dining data available.",
    },
    traveloka: {
      status: "partial",
      reasonBm: "Hanya menyediakan penapis label halal pada senarai hotel penginapan terpilih.",
      reasonEn: "Provides halal/Muslim-friendly tags on select hotel listings only.",
    },
    klook: {
      status: "partial",
      reasonBm: "Pilihan terhad kepada pakej lawatan dan pas kulinari mesra Muslim terpilih sahaja.",
      reasonEn: "Limited to select Muslim-friendly tour packages and culinary passes.",
    },
  },
  {
    titleBm: "6. Tempahan Terus Tiket & Baucar Penginapan Dalam Aplikasi (OTA)",
    titleEn: "6. Direct Commercial Booking & Ticketing Engine (OTA)",
    descBm: "Pembelian tiket penerbangan dan baucar hotel secara komersial terus dalam aplikasi.",
    descEn: "Direct transactional purchasing of flight e-tickets and accommodation vouchers in-app.",
    traversi: {
      status: "no",
      reasonBm: "Traversi adalah enjin penasihat bajet pintar, bukan agensi tempahan tiket komersial (OTA).",
      reasonEn: "Traversi is a budget intelligence & planning engine, not a commercial OTA agency.",
    },
    skyscanner: {
      status: "yes",
      reasonBm: "Menyediakan pautan terus ke laman syarikat penerbangan atau ejen tiket rasmi.",
      reasonEn: "Provides direct redirects to airlines and verified travel booking portals.",
    },
    googleFlights: {
      status: "yes",
      reasonBm: "Pautan tempahan terus kepada laman web syarikat penerbangan tanpa sebarang caj perantara.",
      reasonEn: "Direct booking links straight to airlines with zero intermediary fees.",
    },
    traveloka: {
      status: "yes",
      reasonBm: "Agensi pelancongan dalam talian (OTA) berlesen penuh dengan gerbang pembayaran bersepadu.",
      reasonEn: "Full-service licensed OTA with integrated instant payment and ticketing.",
    },
    klook: {
      status: "yes",
      reasonBm: "Peneraju global tempahan terus e-tiket tarikan dan pas masuk segera.",
      reasonEn: "Global leader in direct instant-ticketing for attractions and transit passes.",
    },
  },
  {
    titleBm: "7. Pas Tarikan Tempatan & Tiket Lawatan Harian (Tours & Passes)",
    titleEn: "7. Local Attraction Passes & Day Tour Tickets",
    descBm: "Jualan tiket taman tema, pas pengangkutan bandar (JR/MRT), dan pakej lawatan berpandu.",
    descEn: "Sales of theme park admissions, transit tourist passes, and localized day tour excursions.",
    traversi: {
      status: "partial",
      reasonBm: "Menghasilkan cadangan itinerari 4 hari realistik yang dijana oleh Google Gemini AI.",
      reasonEn: "Synthesizes realistic 4-day itinerary plans powered by Google Gemini AI.",
    },
    skyscanner: {
      status: "no",
      reasonBm: "Tiada jualan tiket tarikan tempatan atau pakej lawatan harian.",
      reasonEn: "Does not sell attraction tickets or day excursion passes.",
    },
    googleFlights: {
      status: "no",
      reasonBm: "Hanya menumpukan kepada perbandingan jadual dan tambang tiket penerbangan.",
      reasonEn: "Strictly focused on airfare comparison and flight schedules.",
    },
    traveloka: {
      status: "yes",
      reasonBm: "Menawarkan produk Traveloka Xperience untuk aktiviti, tiket taman tema, dan spa.",
      reasonEn: "Offers Traveloka Xperience for theme park tickets, tours, and experiences.",
    },
    klook: {
      status: "yes",
      reasonBm: "Katalog tiket tarikan, pas transit kereta api, dan lawatan berpandu terbesar di dunia.",
      reasonEn: "World's largest catalog of attraction passes, rail cards, and guided tours.",
    },
  },
];

export default function ComparisonTable() {
  const { locale } = useLanguage();

  const renderCellWithTooltip = (
    platformName: string,
    detail: PlatformDetail,
    isTraversi: boolean = false
  ) => {
    const reason = locale === "bm" ? detail.reasonBm : detail.reasonEn;
    const statusTitle =
      detail.status === "yes"
        ? locale === "bm"
          ? "Disokong Penuh"
          : "Fully Supported"
        : detail.status === "partial"
        ? locale === "bm"
          ? "Sokongan Separa / Terhad"
          : "Partial / Limited"
        : locale === "bm"
        ? "Tidak Disokong"
        : "Not Supported";

    const badgeColor =
      detail.status === "yes"
        ? isTraversi
          ? "bg-emerald-800 text-white border border-emerald-900 shadow-xs"
          : "bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs"
        : detail.status === "partial"
        ? "bg-amber-50 text-amber-800 border border-amber-300 shadow-2xs"
        : "bg-stone-100 text-stone-600 border border-stone-300 shadow-2xs";

    return (
      <div className="relative group/tooltip flex justify-center items-center py-1">
        {/* Interactive Icon Button */}
        <button
          type="button"
          aria-label={`${platformName}: ${statusTitle}`}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 group-hover/tooltip:scale-115 group-hover/tooltip:shadow-md cursor-pointer ${badgeColor}`}
        >
          {detail.status === "yes" && <Check className="w-4 h-4 stroke-[2.5]" />}
          {detail.status === "partial" && <Minus className="w-4 h-4 stroke-[2.5]" />}
          {detail.status === "no" && <X className="w-3.5 h-3.5 stroke-[2.2]" />}
        </button>

        {/* Hover Explanatory Tooltip Popover */}
        <div className="pointer-events-none opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 ease-out absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-52 sm:w-60 p-3 rounded-2xl bg-stone-900 text-white text-[11px] shadow-2xl border border-stone-700/80 z-50">
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-stone-800">
            <span className="font-bold text-stone-200 text-xs">{platformName}</span>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                detail.status === "yes"
                  ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                  : detail.status === "partial"
                  ? "bg-amber-950 text-amber-300 border border-amber-800"
                  : "bg-stone-800 text-stone-300 border border-stone-700"
              }`}
            >
              {statusTitle}
            </span>
          </div>
          <p className="text-stone-300 leading-relaxed font-normal">{reason}</p>

          {/* Tooltip Downward Caret Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-solid border-t-stone-900 border-t-6 border-x-transparent border-x-6 border-b-0 w-0 h-0" />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full space-y-2.5">
      {/* Comparison Table */}
      <div className="w-full overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-sm">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50/90 text-xs text-stone-700">
              <th className="p-4 sm:px-6 font-bold w-[36%]">
                <div className="flex items-center gap-1.5">
                  <span>{locale === "bm" ? "Keupayaan & Ciri Sistem" : "System Capabilities"}</span>
                  <span className="text-[10px] font-medium text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200">
                    {locale === "bm" ? "Hover ikon untuk penerangan" : "Hover icons for details"}
                  </span>
                </div>
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
              <tr key={idx} className="hover:bg-stone-50/60 transition-colors">
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
                  {renderCellWithTooltip("Traversi", row.traversi, true)}
                </td>

                {/* Skyscanner */}
                <td className="p-3 text-center">
                  {renderCellWithTooltip("Skyscanner", row.skyscanner)}
                </td>

                {/* Google Flights */}
                <td className="p-3 text-center">
                  {renderCellWithTooltip("Google Flights", row.googleFlights)}
                </td>

                {/* Traveloka */}
                <td className="p-3 text-center">
                  {renderCellWithTooltip("Traveloka", row.traveloka)}
                </td>

                {/* Klook */}
                <td className="p-3 text-center">
                  {renderCellWithTooltip("Klook", row.klook)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
