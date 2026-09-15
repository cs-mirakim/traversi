import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRM(amount: number): string {
  return new Intl.NumberFormat("ms-MY", {
    style: "currency",
    currency: "MYR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateTripShareText(
  result: any,
  budgetInput: number,
  daysInput: number,
  paxInput: number,
  locale: "bm" | "en" = "bm"
): string {
  const { destination, totalCost, costBreakdown, remainingBudget, halal, visa } = result;

  if (locale === "bm") {
    let itinerarySection = "";
    if (destination.itinerary && destination.itinerary.length > 0) {
      const daysSlice = destination.itinerary.slice(0, daysInput);
      itinerarySection = `\n\n📅 *Jadual Itinerari ${daysInput} Hari:*\n` +
        daysSlice.map((d: any) => {
          const acts = d.activities.map((a: string) => `   • ${a}`).join("\n");
          const food = d.foodSpot ? `\n   🍜 Port Halal: ${d.foodSpot}` : "";
          return `*Hari ${d.day}: ${d.title}* (Anggaran: ${formatRM(d.dailyBudgetRM * paxInput)})\n${acts}${food}`;
        }).join("\n\n");
    }

    return `✈️ *PELAN TRIP TRAVERSI: ${destination.city.toUpperCase()}, ${destination.country.toUpperCase()} (${daysInput} HARI)*\n\n` +
      `💰 *Ringkasan Bajet:* ${formatRM(totalCost)} (Had Bajet: ${formatRM(budgetInput)})\n` +
      `💵 *Baki Wang Saku:* +${formatRM(remainingBudget)} penjimatan\n` +
      `👥 *Kumpulan:* ${paxInput} Pax (${costBreakdown.rooms} Bilik Kongsi Berdua)\n\n` +
      `📊 *Pecahan 4 Dimensi Kos (Kumpulan):*\n` +
      `✈️ Tiket Penerbangan: ${formatRM(costBreakdown.flightTotalRM)}\n` +
      `🏨 Bilik Hotel (${costBreakdown.nights} Malam): ${formatRM(costBreakdown.hotelTotalRM)}\n` +
      `🍽️ Makanan Halal: ${formatRM(costBreakdown.foodTotalRM)}\n` +
      `🚗 Tambang Grab/Pengangkutan: ${formatRM(costBreakdown.transportTotalRM)}\n\n` +
      `🛡️ *Info Visa & Halal:*\n` +
      `🛂 Pasport Malaysia: ${visa?.badge || "Bebas Visa"}\n` +
      `🍜 Halal OSM: ${halal?.count ? `${halal.count}+ Premis Halal (Status: ${halal.score})` : `Status Halal: ${halal?.score || "Mudah"}`}\n\n` +
      `💡 *Ulasan Traversi:* "${destination.aiReason}"` +
      itinerarySection +
      `\n\n🔗 Kira bajet trip korang di Traversi: https://traversi.my/kalkulator`;
  }

  let itinerarySectionEn = "";
  if (destination.itinerary && destination.itinerary.length > 0) {
    const daysSlice = destination.itinerary.slice(0, daysInput);
    itinerarySectionEn = `\n\n📅 *${daysInput}-Day Itinerary Plan:*\n` +
      daysSlice.map((d: any) => {
        const acts = d.activities.map((a: string) => `   • ${a}`).join("\n");
        const food = d.foodSpot ? `\n   🍜 Halal Spot: ${d.foodSpot}` : "";
        return `*Day ${d.day}: ${d.title}* (Daily Est: ${formatRM(d.dailyBudgetRM * paxInput)})\n${acts}${food}`;
      }).join("\n\n");
  }

  return `✈️ *TRAVERSI TRIP PLAN: ${destination.city.toUpperCase()}, ${destination.country.toUpperCase()} (${daysInput} DAYS)*\n\n` +
    `💰 *Budget Summary:* ${formatRM(totalCost)} (Spending Limit: ${formatRM(budgetInput)})\n` +
    `💵 *Pocket Savings Left:* +${formatRM(remainingBudget)}\n` +
    `👥 *Travelers:* ${paxInput} Pax (${costBreakdown.rooms} Twin-Share Rooms)\n\n` +
    `📊 *4D Expense Breakdown:*\n` +
    `✈️ Return Airfare: ${formatRM(costBreakdown.flightTotalRM)}\n` +
    `🏨 Hotel Rooms (${costBreakdown.nights} Nights): ${formatRM(costBreakdown.hotelTotalRM)}\n` +
    `🍽️ Halal Meals: ${formatRM(costBreakdown.foodTotalRM)}\n` +
    `🚗 Local Rides/Transit: ${formatRM(costBreakdown.transportTotalRM)}\n\n` +
    `🛡️ *Visa & Halal Intelligence:*\n` +
    `🛂 Malaysian Passport: ${visa?.badge || "Visa-Free"}\n` +
    `🍜 Halal OSM: ${halal?.count ? `${halal.count}+ OSM Nodes (${halal.score})` : `Halal Status: ${halal?.score || "Easy"}`}\n\n` +
    `💡 *Traversi Insight:* "${destination.aiReason}"` +
    itinerarySectionEn +
    `\n\n🔗 Plan your trip budget at Traversi: https://traversi.my/kalkulator`;
}

export const CITY_AIRPORT_MAP: Record<string, string> = {
  langkawi: "LGK",
  penang: "PEN",
  kotakinabalu: "BKI",
  kuching: "KCH",
  hatyai: "HDY",
  krabi: "KBV",
  phuket: "HKT",
  bangkok: "BKK",
  chiangmai: "CNX",
  bali: "DPS",
  bandung: "BDO",
  yogyakarta: "YIA",
  jakarta: "CGK",
  hochiminh: "SGN",
  danang: "DAD",
  hanoi: "HAN",
  singapore: "SIN",
  taipei: "TPE",
  hongkong: "HKG",
  tokyo: "HND",
  osaka: "KIX",
  seoul: "ICN",
  perth: "PER",
  melbourne: "MEL",
  london: "LHR",
  istanbul: "IST",
  dubai: "DXB",
};

export function getBookingDeepLinks(
  destinationId: string,
  city: string,
  _country: string,
  pax: number = 1,
  rooms: number = 1
) {
  const normId = destinationId.toLowerCase().replace(/[^a-z]/g, "");
  const airportCode = CITY_AIRPORT_MAP[normId] || "KUL";

  const skyscannerFlightUrl = `https://www.skyscanner.net/transport/flights/kul/${airportCode.toLowerCase()}/?adultsv2=${pax}&cabinclass=economy`;
  const googleFlightsUrl = `https://www.google.com/travel/flights?q=Flights+from+KUL+to+${encodeURIComponent(city)}+for+${pax}+adults`;
  const agodaHotelUrl = `https://www.agoda.com/search?city=${encodeURIComponent(city)}&guests=${pax}&rooms=${rooms}`;
  const airbnbUrl = `https://www.airbnb.com/s/${encodeURIComponent(city)}/homes?adults=${pax}`;

  return {
    airportCode,
    skyscannerFlightUrl,
    googleFlightsUrl,
    agodaHotelUrl,
    airbnbUrl,
  };
}

