import { NextResponse } from "next/server";
import {
  MOCK_DESTINATIONS,
  calculateDestinationCost,
  RecommendationResult,
  SearchQuery,
} from "@/lib/mockDestinations";
import { fetchOverpassHalalCount } from "@/lib/halal";
import { getVisaInfoForMalaysian } from "@/lib/countries";

export async function POST(request: Request) {
  try {
    const body: SearchQuery = await request.json();
    const {
      budget = 2500,
      budgetMode = "total",
      days = 4,
      vibe = "all",
      pax = 1,
      origin = "KUL",
    } = body;

    // Effective budget calculation
    const effectiveBudget = budgetMode === "per_pax" ? budget * pax : budget;

    // Filter by vibe if specified
    const filteredByVibe =
      !vibe || vibe === "all"
        ? MOCK_DESTINATIONS
        : MOCK_DESTINATIONS.filter(
            (d) =>
              d.vibe.includes(vibe) ||
              d.tagline.toLowerCase().includes(vibe.toLowerCase()) ||
              d.city.toLowerCase().includes(vibe.toLowerCase())
          );

    const pool = filteredByVibe.length > 0 ? filteredByVibe : MOCK_DESTINATIONS;

    // Compute costs and dynamic Halal / Visa data
    const promises = pool.map(async (dest) => {
      const { totalCost, breakdown } = calculateDestinationCost(dest, days, pax);
      const isWithinBudget = totalCost <= effectiveBudget;
      const remainingBudget = Math.max(0, effectiveBudget - totalCost);
      const budgetUsagePercent = Math.round((totalCost / effectiveBudget) * 100);

      // Async fetch halal and visa details in parallel
      const [halalData, visaData] = await Promise.all([
        fetchOverpassHalalCount(dest.city, dest.country),
        getVisaInfoForMalaysian(dest.country),
      ]);

      // Dynamic value score: rewards optimal budget usage (70% - 98%), easy halal access, and visa convenience
      let score = 100 - Math.abs(90 - budgetUsagePercent);
      if (halalData.score === "Mudah") score += 15;
      else if (halalData.score === "Sederhana") score += 5;

      if (visaData.visaFreeDays >= 30 || visaData.visaType === "domestic") score += 15;
      if (!isWithinBudget) score -= 250;

      const result: RecommendationResult = {
        destination: dest,
        totalCost,
        costBreakdown: breakdown,
        budgetUsagePercent,
        remainingBudget,
        isWithinBudget,
        valueScore: score,
        halal: {
          count: halalData.halalCount,
          score: halalData.score,
          description: halalData.description,
          source: halalData.source,
        },
        visa: {
          type: visaData.visaType,
          days: visaData.visaFreeDays,
          badge: visaData.statusBadge,
          note: visaData.passportNote,
          source: visaData.source,
        },
      };

      return result;
    });

    const results = await Promise.all(promises);

    // Sort: within budget first, then by valueScore descending
    const sorted = results.sort((a, b) => {
      if (a.isWithinBudget && !b.isWithinBudget) return -1;
      if (!a.isWithinBudget && b.isWithinBudget) return 1;
      return b.valueScore - a.valueScore;
    });

    // Pick top 3 recommendations
    const topRecommendations = sorted.slice(0, 3);

    return NextResponse.json({
      success: true,
      query: { budget, budgetMode, effectiveBudget, days, vibe, pax, origin },
      count: topRecommendations.length,
      recommendations: topRecommendations,
      totalWithinBudget: sorted.filter((r) => r.isWithinBudget).length,
    });
  } catch (error) {
    console.error("Recommend API error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memproses cadangan bajet" },
      { status: 500 }
    );
  }
}
