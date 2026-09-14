export interface CurrencyRate {
  code: string;
  symbol: string;
  name: string;
  ratePerMYR: number; // 1 MYR = X local currency
  formattedRateText: string; // e.g. "1 THB = RM0.13"
}

export const CURRENCY_RATES: Record<string, CurrencyRate> = {
  THB: {
    code: "THB",
    symbol: "฿",
    name: "Thai Baht",
    ratePerMYR: 7.72,
    formattedRateText: "1 THB ≈ RM0.13",
  },
  IDR: {
    code: "IDR",
    symbol: "Rp",
    name: "Indonesian Rupiah",
    ratePerMYR: 3550,
    formattedRateText: "10,000 IDR ≈ RM2.82",
  },
  VND: {
    code: "VND",
    symbol: "₫",
    name: "Vietnamese Dong",
    ratePerMYR: 5740,
    formattedRateText: "10,000 VND ≈ RM1.74",
  },
  SGD: {
    code: "SGD",
    symbol: "S$",
    name: "Singapore Dollar",
    ratePerMYR: 0.31,
    formattedRateText: "1 SGD ≈ RM3.25",
  },
  MYR: {
    code: "MYR",
    symbol: "RM",
    name: "Malaysian Ringgit",
    ratePerMYR: 1.0,
    formattedRateText: "Mata Wang Tempatan",
  },
};

export function getCurrencyInfo(code: string): CurrencyRate {
  return (
    CURRENCY_RATES[code] || {
      code,
      symbol: code,
      name: code,
      ratePerMYR: 1.0,
      formattedRateText: `1 ${code} ≈ RM1.00`,
    }
  );
}
