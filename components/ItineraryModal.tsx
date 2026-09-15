import React, { useState, useEffect } from "react";
import { X, Calendar, DollarSign, Check, Quote, Utensils, Copy, Plane, Hotel, ExternalLink, Sparkles } from "lucide-react";
import { RecommendationResult } from "@/lib/mockDestinations";
import { formatRM, generateTripShareText, getBookingDeepLinks } from "@/lib/utils";
import BreakdownBar from "./BreakdownBar";
import BadgeHalalVisa from "./BadgeHalalVisa";
import { useLanguage } from "@/context/LanguageContext";

interface ItineraryModalProps {
  result: RecommendationResult | null;
  budgetInput: number;
  daysInput: number;
  paxInput: number;
  onClose: () => void;
}

export default function ItineraryModal({
  result,
  budgetInput,
  daysInput,
  paxInput,
  onClose,
}: ItineraryModalProps) {
  const { locale } = useLanguage();
  const [copied, setCopied] = useState(false);

  // Close on Escape key (R-32)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!result) return null;

  const { destination, totalCost, costBreakdown, budgetUsagePercent, remainingBudget } = result;

  const shareText = generateTripShareText(result, budgetInput, daysInput, paxInput, locale);

  const bookingLinks = getBookingDeepLinks(
    destination.id,
    destination.city,
    destination.country,
    paxInput,
    costBreakdown.rooms
  );

  const handleCopySummary = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-destination-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Header Image Cover */}
        <div className="relative h-48 sm:h-56 w-full">
          <img
            src={destination.image}
            alt={`Pemandangan ${destination.city}, ${destination.country}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:outline-none"
            aria-label="Tutup Paparan"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Destination Header Title */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{destination.flag}</span>
              <span className="text-xs uppercase tracking-wider font-bold text-emerald-300">
                {destination.country}
              </span>
            </div>
            <h2 id="modal-destination-title" className="text-2xl sm:text-3xl font-black tracking-tight">
              {destination.city}
            </h2>
            <p className="text-xs sm:text-sm text-stone-200 line-clamp-1 font-medium">
              {destination.tagline}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[calc(85vh-14rem)] overflow-y-auto">
          {/* Toast Alert for Share */}
          {copied && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                {locale === "bm" 
                  ? "Itinerari lengkap telah disalin ke papan keratan! Sedia untuk dikongsi." 
                  : "Full itinerary copied to clipboard! Ready to share."}
              </span>
            </div>
          )}

          {/* Quick Metrics Bar */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-stone-600">
                {locale === "bm" ? `Anggaran Kos Keseluruhan (${paxInput} Pax)` : `Total Estimated Cost (${paxInput} Pax)`}
              </p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-stone-950 tracking-tight">{formatRM(totalCost)}</span>
                <span className="text-xs text-stone-600 font-semibold">/ {locale === "bm" ? "Had Bajet" : "Budget Limit"} {formatRM(budgetInput)}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">
                {budgetUsagePercent}% {locale === "bm" ? "Daripada Had Bajet" : "of Budget Limit"}
              </span>
              <p className="text-xs text-emerald-800 font-bold mt-1">
                {locale === "bm" ? `Baki Wang Poket: +${formatRM(remainingBudget)}` : `Pocket Savings: +${formatRM(remainingBudget)}`}
              </p>
            </div>
          </div>

          {/* Badges */}
          <div>
            <BadgeHalalVisa
              visaBadge={result.visa?.badge}
              visaNote={result.visa?.note}
              halalScore={result.halal?.score}
              halalCount={result.halal?.count}
              halalDescription={result.halal?.description}
              currencyCode={destination.currencyCode}
            />
          </div>

          {/* Cost Breakdown */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-800" />
              {locale === "bm"
                ? `Pecahan Bajet Perjalanan (${daysInput} Hari, ${paxInput} Pax • ${costBreakdown.rooms} Bilik)`
                : `Trip Expense Breakdown (${daysInput} Days, ${paxInput} Pax • ${costBreakdown.rooms} Rooms)`}
            </h3>
            <BreakdownBar
              flight={costBreakdown.flightTotalRM}
              hotel={costBreakdown.hotelTotalRM}
              food={costBreakdown.foodTotalRM}
              transport={costBreakdown.transportTotalRM}
              total={totalCost}
            />
          </div>

          {/* Direct Booking Deep Links Section (Live Demo & Affiliate Monetization) */}
          <div className="p-4 rounded-2xl bg-stone-900 text-white border border-stone-800 space-y-3.5 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <h3 className="text-sm font-bold text-stone-100">
                  {locale === "bm" ? "Pautan Tempahan Pintar (Deep-Link)" : "Smart Booking Deep Links"}
                </h3>
              </div>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 border border-stone-700">
                {locale === "bm" ? "Rakan Tempahan Rasmi" : "Partner Integrations"}
              </span>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed font-normal">
              {locale === "bm"
                ? `Buka carian tiket & penginapan terus ke platform rasmi yang telah siap diisi dengan ${paxInput} pax dan kod penerbangan KUL ✈️ ${bookingLinks.airportCode}:`
                : `Open pre-filled flight and stay searches directly on verified booking platforms for ${paxInput} travelers (KUL ✈️ ${bookingLinks.airportCode}):`}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {/* Flight Deep Link 1: Skyscanner */}
              <a
                href={bookingLinks.skyscannerFlightUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-stone-800 hover:bg-stone-700/90 border border-stone-700 transition-all text-xs font-semibold text-white group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                    <Plane className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-stone-100">Skyscanner Flights</span>
                    <span className="text-[11px] text-stone-400 font-normal">KUL ➔ {bookingLinks.airportCode} ({paxInput} Pax)</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-white transition-colors" />
              </a>

              {/* Flight Deep Link 2: Google Flights */}
              <a
                href={bookingLinks.googleFlightsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-stone-800 hover:bg-stone-700/90 border border-stone-700 transition-all text-xs font-semibold text-white group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                    <Plane className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-stone-100">Google Flights</span>
                    <span className="text-[11px] text-stone-400 font-normal">{destination.city} ({formatRM(destination.flightPriceReturnRM * paxInput)})</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-white transition-colors" />
              </a>

              {/* Hotel Deep Link 1: Agoda */}
              <a
                href={bookingLinks.agodaHotelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-stone-800 hover:bg-stone-700/90 border border-stone-700 transition-all text-xs font-semibold text-white group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <Hotel className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-stone-100">Agoda Hotels</span>
                    <span className="text-[11px] text-stone-400 font-normal">{costBreakdown.rooms} {locale === "bm" ? "Bilik" : "Rooms"} • {destination.city}</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-white transition-colors" />
              </a>

              {/* Hotel Deep Link 2: Airbnb */}
              <a
                href={bookingLinks.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-stone-800 hover:bg-stone-700/90 border border-stone-700 transition-all text-xs font-semibold text-white group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                    <Hotel className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-stone-100">Airbnb Homestay</span>
                    <span className="text-[11px] text-stone-400 font-normal">{destination.city} ({paxInput} Pax)</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-white transition-colors" />
              </a>
            </div>

            <div className="pt-1 text-[11px] text-stone-400 border-t border-stone-800 flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span>
                {locale === "bm"
                  ? "Pautan affiliate menjana komisen 3%–7% untuk Traversi tanpa sebarang surcaj tambahan kepada anda."
                  : "Affiliate links generate 3%–7% commission for Traversi with zero extra markup to travelers."}
              </span>
            </div>
          </div>

          {/* Local Insight Quote */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-800 flex items-start gap-3">
            <Quote className="w-4 h-4 text-emerald-800 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-stone-950 block mb-0.5">
                {locale === "bm" ? "Kenapa Padan Dengan Bajet Anda:" : "Why This Fits Your Budget:"}
              </span>
              <p className="text-stone-700 leading-relaxed font-medium">{destination.aiReason}</p>
            </div>
          </div>

          {/* Day by Day Plan */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-800" />
              {locale === "bm" ? `Cadangan Itinerari ${daysInput} Hari` : `Suggested ${daysInput}-Day Itinerary`}
            </h3>

            <div className="space-y-3">
              {destination.itinerary.slice(0, daysInput).map((item) => (
                <div
                  key={item.day}
                  className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:border-stone-300 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-stone-900 text-white">
                      {locale === "bm" ? `Hari ${item.day}` : `Day ${item.day}`}
                    </span>
                    <span className="text-xs font-bold text-stone-800">
                      {locale === "bm" ? "Anggaran Harian:" : "Daily Est:"} {formatRM(item.dailyBudgetRM * paxInput)}
                    </span>
                  </div>

                  <h4 className="font-bold text-stone-950 text-sm mb-2">{item.title}</h4>

                  <ul className="space-y-1.5 mb-3">
                    {item.activities.map((act, idx) => (
                      <li key={idx} className="text-xs text-stone-700 flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-800 mt-1.5 shrink-0" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>

                  {item.foodSpot && (
                    <div className="pt-2 border-t border-stone-100 text-xs text-stone-700 flex items-center gap-2">
                      <Utensils className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                      <span className="font-bold text-stone-950">
                        {locale === "bm" ? "Cadangan Port Halal:" : "Suggested Halal Spot:"}
                      </span>
                      <span className="truncate font-medium">{item.foodSpot}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
          {/* Copy Budget Summary */}
          <button
            type="button"
            onClick={handleCopySummary}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-stone-800 bg-white border border-stone-300 hover:bg-stone-100 shadow-2xs transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-700" />
                <span className="text-emerald-900 font-bold">{locale === "bm" ? "Tersalin ke Papan Keratan!" : "Copied to Clipboard!"}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-stone-600" />
                <span>{locale === "bm" ? "Salin Ringkasan & Itinerari" : "Copy Itinerary Summary"}</span>
              </>
            )}
          </button>

          {/* Close Modal */}
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 transition-colors cursor-pointer"
          >
            {locale === "bm" ? "Tutup" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}


