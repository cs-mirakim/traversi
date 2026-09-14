/**
 * REST Countries & Passport Malaysia Visa Logic Helper
 */

export interface CountryVisaInfo {
  country: string;
  visaRequired: boolean;
  visaFreeDays: number;
  passportNote: string;
}

export const MALAYSIAN_PASSPORT_VISA_RULES: Record<string, CountryVisaInfo> = {
  Thailand: {
    country: "Thailand",
    visaRequired: false,
    visaFreeDays: 30,
    passportNote: "Visa Free 30 Hari untuk pelancong Malaysia",
  },
  Vietnam: {
    country: "Vietnam",
    visaRequired: false,
    visaFreeDays: 30,
    passportNote: "Visa Free 30 Hari untuk passport Malaysia",
  },
  Indonesia: {
    country: "Indonesia",
    visaRequired: false,
    visaFreeDays: 30,
    passportNote: "Visa Free 30 Hari untuk negara anggota ASEAN",
  },
  Malaysia: {
    country: "Malaysia",
    visaRequired: false,
    visaFreeDays: 90,
    passportNote: "Domestik - Boleh guna Kad Pengenalan (MyKad)",
  },
};

export function getVisaInfoForMalaysian(country: string): CountryVisaInfo {
  return (
    MALAYSIAN_PASSPORT_VISA_RULES[country] || {
      country,
      visaRequired: false,
      visaFreeDays: 30,
      passportNote: "Semak keperluan visa terkini",
    }
  );
}
