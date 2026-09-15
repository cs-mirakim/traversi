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
      `💡 *Ulasan Traversi:* "${destination.aiReason}"\n\n` +
      `🔗 Kira bajet trip korang di Traversi: https://traversi.my/kalkulator`;
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
    `💡 *Traversi Insight:* "${destination.aiReason}"\n\n` +
    `🔗 Plan your trip budget at Traversi: https://traversi.my/kalkulator`;
}
