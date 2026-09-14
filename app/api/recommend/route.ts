import { NextResponse } from "next/server";
import {
  MOCK_DESTINATIONS,
  calculateDestinationCost,
  RecommendationResult,
  SearchQuery,
} from "@/lib/mockDestinations";

export async function POST(request: Request) {
  try {
    const body: SearchQuery = await request.json();
    const {
      budget = 2500,
      budgetMode = "total",
      days = 4,
      vibe = "all",
      pax = 1,
      origin = "KUL (KLIA)",
    } = body;

    // Effective budget calculation
    // If user specifies budget "per_pax", total spending power is budget * pax
    // If user specifies "total", total spending power is budget directly
    const effectiveBudget = budgetMode === "per_pax" ? budget * pax : budget;

    // Filter by vibe if specified
    const filteredByVibe =
      vibe === "all"
        ? MOCK_DESTINATIONS
        : MOCK_DESTINATIONS.filter(
            (d) =>
              d.vibe.includes(vibe as any) ||
              d.tagline.toLowerCase().includes(vibe.toLowerCase()) ||
              d.city.toLowerCase().includes(vibe.toLowerCase())
          );

    // If vibe filter is so strict that nothing matches, fallback gracefully to all destinations
    const pool = filteredByVibe.length > 0 ? filteredByVibe : MOCK_DESTINATIONS;

    // Calculate costs and budget metrics
    const results: RecommendationResult[] = pool.map((dest) => {
      const { totalCost, breakdown } = calculateDestinationCost(dest, days, pax);
      const isWithinBudget = totalCost <= effectiveBudget;
      const remainingBudget = Math.max(0, effectiveBudget - totalCost);
      const budgetUsagePercent = Math.round((totalCost / effectiveBudget) * 100);

      // Value score prioritizes destinations that fit nicely within 70% - 98% of budget
      // and have easy halal and visa free access
      let score = 100 - Math.abs(90 - budgetUsagePercent);
      if (dest.halalScore === "senang") score += 15;
      if (dest.visaFreeDays >= 30) score += 10;
      if (!isWithinBudget) score -= 200; // Heavily penalize over-budget

      return {
        destination: dest,
        totalCost,
        costBreakdown: breakdown,
        budgetUsagePercent,
        remainingBudget,
        isWithinBudget,
        valueScore: score,
      };
    });

    // Sort: within budget first, then by valueScore descending
    const sorted = results.sort((a, b) => {
      if (a.isWithinBudget && !b.isWithinBudget) return -1;
      if (!a.isWithinBudget && b.isWithinBudget) return 1;
      return b.valueScore - a.valueScore;
    });

    // Take top 3 recommendations
    const topRecommendations = sorted.slice(0, 3);

    return NextResponse.json({
      success: true,
      query: { budget, budgetMode, effectiveBudget, days, vibe, pax, origin },
      count: topRecommendations.length,
      recommendations: topRecommendations,
      allCount: sorted.filter((r) => r.isWithinBudget).length,
    });
  } catch (error) {
    console.error("Recommend API error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memproses cadangan bajet" },
      { status: 500 }
    );
  }
}
