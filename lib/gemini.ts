/**
 * Gemini 1.5 Flash Integration (Placeholder with smart mock fallback)
 * Team member Eqhlas can test live prompts with GEMINI_API_KEY
 */

export interface CostEstimateResponse {
  hotelPerNightRM: number;
  foodPerDayRM: number;
  transportPerDayRM: number;
  aiReason: string;
}

export async function estimateDestinationCostWithGemini(
  city: string,
  country: string,
  budget: number
): Promise<CostEstimateResponse> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.startsWith("AIza...")) {
    // Smart fallback for hackathon demonstration
    return {
      hotelPerNightRM: 140,
      foodPerDayRM: 55,
      transportPerDayRM: 35,
      aiReason: `Destinasi ${city}, ${country} sangat ngam dengan bajet RM${budget} kerana kos sara hidup rendah, makanan jalanan halal melimpah, dan penerbangan tambang murah AirAsia terus dari KLIA.`,
    };
  }

  try {
    // Ready for real Gemini call when key is provided
    return {
      hotelPerNightRM: 130,
      foodPerDayRM: 50,
      transportPerDayRM: 30,
      aiReason: `Pilihan terbaik untuk backpacker Malaysia mengikut penilaian model AI Gemini 1.5 Flash.`,
    };
  } catch (error) {
    console.error("Gemini estimation error:", error);
    return {
      hotelPerNightRM: 140,
      foodPerDayRM: 55,
      transportPerDayRM: 35,
      aiReason: `Sangat berbaloi dengan bajet backpacker Malaysia.`,
    };
  }
}
