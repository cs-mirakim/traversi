/**
 * Amadeus Flight API Wrapper (Placeholder with mock rates)
 * Team member Paan can connect test environment keys
 */

export interface FlightOffer {
  origin: string;
  destination: string;
  priceRM: number;
  airline: string;
  durationHours: string;
}

export async function getFlightPrice(
  origin: string = "KUL",
  destinationIATA: string
): Promise<FlightOffer> {
  // Pre-cached realistic estimates for Malaysian travelers
  const mockPrices: Record<string, number> = {
    KBV: 380, // Krabi
    DAD: 490, // Da Nang
    DPS: 550, // Bali
    DMK: 420, // Bangkok
    BKI: 320, // Kota Kinabalu
    HDY: 280, // Hat Yai
    JOG: 480, // Yogyakarta
    DLI: 520, // Dalat
  };

  return {
    origin,
    destination: destinationIATA,
    priceRM: mockPrices[destinationIATA] || 450,
    airline: "AirAsia / Batik Air",
    durationHours: "1j 30m - 3j 00m",
  };
}
