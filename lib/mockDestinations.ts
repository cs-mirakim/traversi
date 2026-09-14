export type TravelVibe = 
  | "all" 
  | "beach" 
  | "city" 
  | "nature" 
  | "shopping" 
  | "heritage" 
  | "foodie" 
  | "healing" 
  | "budget";

export interface Destination {
  id: string;
  city: string;
  country: string;
  flag: string;
  tagline: string;
  vibe: TravelVibe[];
  flightPriceReturnRM: number; // Return flight per pax
  hotelPerNightRM: number; // Per room/night
  foodPerDayRM: number; // Per pax per day
  transportPerDayRM: number; // Per group per day
  visaFreeDays: number;
  visaStatusText: string;
  halalScore: "senang" | "sederhana" | "mencabar";
  halalDescription: string;
  currencyCode: string;
  image: string;
  aiReason: string;
  itinerary: {
    day: number;
    title: string;
    activities: string[];
    foodSpot: string;
    dailyBudgetRM: number;
  }[];
}

export const MOCK_DESTINATIONS: Destination[] = [
  {
    id: "krabi",
    city: "Krabi",
    country: "Thailand",
    flag: "🇹🇭",
    tagline: "Pantai batu kapur & sunset Ao Nang paling syahdu",
    vibe: ["beach", "nature", "healing", "foodie"],
    flightPriceReturnRM: 380,
    hotelPerNightRM: 140,
    foodPerDayRM: 60,
    transportPerDayRM: 40,
    visaFreeDays: 30,
    visaStatusText: "Visa Free 30 Hari (Passport MY)",
    halalScore: "senang",
    halalDescription: "Banyak kedai Muslim Thai di Ao Nang & pasar malam",
    currencyCode: "THB",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1000&q=80",
    aiReason: "Penerbangan AirAsia dari KL sangat berpatutan, hotel tepi pantai mampu milik, dan tomyum halal mudah didapati di merata tempat.",
    itinerary: [
      {
        day: 1,
        title: "Tiba di Krabi & Sunset di Ao Nang Beach",
        activities: ["Check-in hotel bajet berdekatan Ao Nang", "Lepak santai pantai Ao Nang waktu senja", "Jalan di Ao Nang Night Market"],
        foodSpot: "Tomyum Seafood & Roti Canai Pisang di Warung Muslim Ao Nang",
        dailyBudgetRM: 70,
      },
      {
        day: 2,
        title: "Island Hopping 4 Islands & Snorkeling",
        activities: ["Naik longtail boat ke Railay Beach & Phra Nang Cave", "Snorkeling di Chicken Island & Koh Poda", "Berehat di perairan cetek Thale Waek"],
        foodSpot: "Pek makan tengah hari halal disediakan atas bot",
        dailyBudgetRM: 110,
      },
      {
        day: 3,
        title: "Emerald Pool & Hot Springs Waterfall",
        activities: ["Sewa motor/skuter pusing perkampungan Krabi", "Mandi kolam semula jadi Emerald Pool", "Rendam air panas semula jadi"],
        foodSpot: "Nasi padu Pad Thai Udang di gerai tempatan tepi jalan",
        dailyBudgetRM: 85,
      },
      {
        day: 4,
        title: "Tiger Cave Temple & Shopping Buah Tangan",
        activities: ["Tengok pemandangan dari Tiger Cave Temple", "Beli cenderamata & kacang gajus di Krabi Town", "Penerbangan pulang ke KLIA"],
        foodSpot: "Kopi ais Thai & Mango Sticky Rice sebelum ke airport",
        dailyBudgetRM: 50,
      },
    ],
  },
  {
    id: "danang",
    city: "Da Nang & Hoi An",
    country: "Vietnam",
    flag: "🇻🇳",
    tagline: "Bandar tanglung purba & jambatan naga megah",
    vibe: ["city", "beach", "shopping", "heritage", "foodie", "budget"],
    flightPriceReturnRM: 490,
    hotelPerNightRM: 130,
    foodPerDayRM: 55,
    transportPerDayRM: 35,
    visaFreeDays: 30,
    visaStatusText: "Visa Free 30 Hari (Passport MY)",
    halalScore: "sederhana",
    halalDescription: "Terdapat beberapa restoran Halal/Indian & seafood mesra Muslim",
    currencyCode: "VND",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=80",
    aiReason: "Nilai mata wang Dong yang sangat murah membolehkan anda nikmati kopi Vietnam premium, homestay estetik di Hoi An dan Grab yang jimat gila.",
    itinerary: [
      {
        day: 1,
        title: "Jambatan Naga & Pantai My Khe",
        activities: ["Tiba di Da Nang, check-in hotel pantai", "Santai di Pantai My Khe", "Saksikan Dragon Bridge hembus api (hujung minggu)"],
        foodSpot: "Halal Oasis Restaurant Da Nang (Pho & Nasi Goreng)",
        dailyBudgetRM: 65,
      },
      {
        day: 2,
        title: "Pesona Tanglung Hoi An Ancient Town",
        activities: ["Perjalanan 40 minit ke Hoi An", "Kayuh basikal menyusuri rumah kuning purba", "Naik sampan sungai Hoai sambil pasang lilin tanglung"],
        foodSpot: "Restoran Halal Baba's Kitchen Hoi An",
        dailyBudgetRM: 90,
      },
      {
        day: 3,
        title: "Bana Hills & Golden Hand Bridge",
        activities: ["Naik kereta kabel terpanjang di dunia ke Bana Hills", "Bergambar di Golden Bridge tangan gergasi", "French Village ala Eropah"],
        foodSpot: "Pilihan buffet vegetarian atau makanan pek mesra Muslim",
        dailyBudgetRM: 140,
      },
      {
        day: 4,
        title: "Marble Mountains & Coffee Hopping",
        activities: ["Mendaki gua batu kapur Marble Mountain", "Nikmati Coconut Coffee di Cong Caphe", "Penerbangan balik KL"],
        foodSpot: "Vietnamese drip coffee & banh mi sayur",
        dailyBudgetRM: 50,
      },
    ],
  },
  {
    id: "bali",
    city: "Bali (Ubud & Kuta)",
    country: "Indonesia",
    flag: "🇮🇩",
    tagline: "Sawah padi bertingkat, air terjun mistik & pantai meluncur",
    vibe: ["nature", "beach", "city", "healing", "heritage"],
    flightPriceReturnRM: 550,
    hotelPerNightRM: 160,
    foodPerDayRM: 50,
    transportPerDayRM: 50,
    visaFreeDays: 30,
    visaStatusText: "Visa Free 30 Hari (Passport MY)",
    halalScore: "senang",
    halalDescription: "Banyak kedai Nasi Padang Halal, Ayam Betutu Halal & Warung Muslim",
    currencyCode: "IDR",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",
    aiReason: "Pilihan paling fleksibel untuk santai alam semula jadi di Ubud atau pantai di Canggu. Makanan halal nasi padang serendah RM8-12 sepinggan.",
    itinerary: [
      {
        day: 1,
        title: "Tiba di Bali & Menuju ke Ubud",
        activities: ["Mendarat di Denpasar, Grab terus ke kawasan hijau Ubud", "Check-in villa bajet dengan kolam renang", "Jalan-jalan di Ubud Art Market"],
        foodSpot: "Warung Makan Muslim Ibu Mangku Ubud",
        dailyBudgetRM: 60,
      },
      {
        day: 2,
        title: "Tegalalang Rice Terrace & Air Terjun Tibumana",
        activities: ["Bergambar di sawah padi teres Tegalalang", "Mandi di Air Terjun Tibumana yang sejuk", "Cuba kopi Luwak di ladang tempatan"],
        foodSpot: "Bebek Tepi Sawah / Nasi Padang Minang",
        dailyBudgetRM: 90,
      },
      {
        day: 3,
        title: "Pindah ke Seminyak & Sunset Uluwatu",
        activities: ["Check-out ke kawasan pantai selatan", "Lawatan ke Pura Uluwatu atas tebing tinggi", "Tonton Tari Kecak waktu matahari terbenam"],
        foodSpot: "Ikan bakar Jimbaran Halal tepi pantai",
        dailyBudgetRM: 120,
      },
      {
        day: 4,
        title: "Pantai Kuta & Beli Cenderamata Krisna",
        activities: ["Tengok orang meluncur di Pantai Kuta", "Borong ole-ole di Pusat Oleh-Oleh Krisna", "Pulang ke KLIA"],
        foodSpot: "Bakso Sapi Halal & Es Cendol di Kuta",
        dailyBudgetRM: 50,
      },
    ],
  },
  {
    id: "bangkok",
    city: "Bangkok",
    country: "Thailand",
    flag: "🇹🇭",
    tagline: "Syurga fesyen murah, pasar malam & cafe hopping",
    vibe: ["city", "shopping", "foodie", "heritage"],
    flightPriceReturnRM: 420,
    hotelPerNightRM: 150,
    foodPerDayRM: 65,
    transportPerDayRM: 30,
    visaFreeDays: 30,
    visaStatusText: "Visa Free 30 Hari (Passport MY)",
    halalScore: "senang",
    halalDescription: "Kawasan Pratunam & Phaya Thai dipenuhi restoran halal & street food",
    currencyCode: "THB",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1000&q=80",
    aiReason: "Pilihan nombor 1 untuk kaki shopping bajet. MRT/BTS sangat murah dan pasar malam seperti Jodd Fairs ada zon khas makanan halal sedap!",
    itinerary: [
      {
        day: 1,
        title: "Tiba di Don Mueang & Jodd Fairs Night Market",
        activities: ["Naik keretapi ke Pratunam", "Check-in hotel berdekatan BTS", "Serbu Jodd Fairs Night Market"],
        foodSpot: "Zon Halal Jodd Fairs: Iga Bakar Lembu, Thai Milk Tea & Mango Sticky Rice",
        dailyBudgetRM: 75,
      },
      {
        day: 2,
        title: "Shopping Platinum Mall & Chatuchak Weekend Market",
        activities: ["Beli baju borong di Platinum Fashion Mall", "Sambung tawaf 8,000 gerai di Chatuchak Market", "Urutan kaki tradisional Thai"],
        foodSpot: "Samyad Halal Food & Restoran Cikgu Saman Chatuchak",
        dailyBudgetRM: 100,
      },
      {
        day: 3,
        title: "Chao Phraya River Cruise & ICONSIAM",
        activities: ["Naik bot awam Chao Phraya (cuma RM3)", "Melawat mall mewah bertaraf dunia ICONSIAM", "Tengok pasar terapung indoor SookSiam"],
        foodSpot: "Gerai Halal Berasap SookSiam ICONSIAM",
        dailyBudgetRM: 85,
      },
      {
        day: 4,
        title: "Big C Supercenter & Pulang",
        activities: ["Beli snek Thai halal (biskut, kerepek rumpai laut) di Big C", "Transit airport guna Airport Rail Link", "Penerbangan balik KL"],
        foodSpot: "Kuey Teow Tomyum Daging di airport sebelum berlepas",
        dailyBudgetRM: 55,
      },
    ],
  },
  {
    id: "dalat",
    city: "Dalat",
    country: "Vietnam",
    flag: "🇻🇳",
    tagline: "Kota cinta tanah tinggi, cuaca sejuk 16°C & bukit bunga",
    vibe: ["nature", "healing", "city", "budget"],
    flightPriceReturnRM: 520,
    hotelPerNightRM: 120,
    foodPerDayRM: 50,
    transportPerDayRM: 35,
    visaFreeDays: 30,
    visaStatusText: "Visa Free 30 Hari (Passport MY)",
    halalScore: "sederhana",
    halalDescription: "Ada beberapa restoran Muslim Melayu/Cham dan banyak makanan laut segar",
    currencyCode: "VND",
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80",
    aiReason: "Cuaca sejuk macam Cameron Highlands tapi jauh lebih tenang dan pemandangan ala Switzerland dengan kos penginapan yang luar biasa murah.",
    itinerary: [
      {
        day: 1,
        title: "Tiba di Kota Bunga Sejuk Dalat",
        activities: ["Mendarat di Lien Khuong Airport, bas transit ke bandar", "Check-in homestay bukit berkabus", "Jalan santai Tasik Xuan Huong"],
        foodSpot: "Restoran Halal Ali Dalat (Nasi Kari & Sayur Segar)",
        dailyBudgetRM: 60,
      },
      {
        day: 2,
        title: "Datanla Alpine Coaster & Clay Tunnel",
        activities: ["Naik coaster meluncur laju celah hutan pinus ke air terjun Datanla", "Melawat Terowong Arca Tanah Liat", "Bergambar di Rumah Pelik Crazy House"],
        foodSpot: "Ubi manis bakar & jagung sejuk di pasar petang",
        dailyBudgetRM: 85,
      },
      {
        day: 3,
        title: "Ladang Bunga Hydrangea & Cafe Atas Awan",
        activities: ["Sewa motor ke ladang hydrangea seluas mata memandang", "Lepak di cafe kontemporari pemandangan kabus bukit", "Membeli artichoke tea tempatan"],
        foodSpot: "Restoran Muslim Halal Kampung Cham",
        dailyBudgetRM: 70,
      },
      {
        day: 4,
        title: "Dalat Railway Station & Pulang",
        activities: ["Bergambar stesen keretapi lama gaya French Art Deco", "Beli strawberi segar di Dalat Market", "Perjalanan pulang ke KL"],
        foodSpot: "Kopi telur vegetarian tempatan & roti bakar",
        dailyBudgetRM: 45,
      },
    ],
  },
  {
    id: "hatyai",
    city: "Hat Yai",
    country: "Thailand",
    flag: "🇹🇭",
    tagline: "Perjalanan bajet paling jimat melalui tren ETS & syurga makanan",
    vibe: ["city", "shopping", "foodie", "budget"],
    flightPriceReturnRM: 280, // Boleh naik tren ETS atau flight murah
    hotelPerNightRM: 110,
    foodPerDayRM: 55,
    transportPerDayRM: 30,
    visaFreeDays: 30,
    visaStatusText: "Visa Free 30 Hari (Passport MY)",
    halalScore: "senang",
    halalDescription: "Sangat mesra Muslim, majoriti peniaga boleh berbahasa Melayu",
    currencyCode: "THB",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1000&q=80",
    aiReason: "Destinasi jimat gila untuk bajet bawah RM1,500. Boleh naik ETS dari KL Sentral ke Padang Besar atau flight, makanan halal melimpah ruah!",
    itinerary: [
      {
        day: 1,
        title: "Tiba di Hat Yai & Lee Gardens Plaza",
        activities: ["Check-in hotel tengah bandar Hat Yai", "Jalan-jalan sekitar Lee Gardens", "Nikmati urutan refleksologi kaki murah"],
        foodSpot: "Dim Sum Chabura Halal & Pulut Ayam Hat Yai Rangup",
        dailyBudgetRM: 50,
      },
      {
        day: 2,
        title: "Khlong Hae Floating Market & Pasar Greenway",
        activities: ["Pasar terapung bot tradisional Khlong Hae", "Shopping baju vintage di Greenway Night Market", "Naik cable car Hat Yai Municipal Park"],
        foodSpot: "Mi celup Thai halal & air kelapa pandan di Floating Market",
        dailyBudgetRM: 75,
      },
      {
        day: 3,
        title: "Pantai Samila & Patung Duyung Emas",
        activities: ["Tuk-tuk ke Pantai Samila Songkhla", "Bergambar di Golden Mermaid & Old Town Songkhla", "Beli kacang gajus dan asam celagi di Pasar Kim Yong"],
        foodSpot: "Kerabu maggi seafood & tomyum poktek di tepi laut Songkhla",
        dailyBudgetRM: 65,
      },
      {
        day: 4,
        title: "Sarapan Dimsum Terkenal & Pulang",
        activities: ["Serbu sarapan dimsum halal pagi-pagi", "Beli baki jajan Thai di 7-Eleven", "Naik tren/penerbangan pulang"],
        foodSpot: "Salma Halal Restaurant (Roti Canai Kari Daging Thai)",
        dailyBudgetRM: 40,
      },
    ],
  },
  {
    id: "yogyakarta",
    city: "Yogyakarta",
    country: "Indonesia",
    flag: "🇮🇩",
    tagline: "Candi purba Prambanan, lava tour Gunung Merapi & seni jalanan",
    vibe: ["heritage", "nature", "foodie", "budget"],
    flightPriceReturnRM: 480,
    hotelPerNightRM: 110,
    foodPerDayRM: 45,
    transportPerDayRM: 40,
    visaFreeDays: 30,
    visaStatusText: "Visa Free 30 Hari (Passport MY)",
    halalScore: "senang",
    halalDescription: "Hampir semua kedai halal, kota budaya Jawa yang sangat ramah",
    currencyCode: "IDR",
    image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1000&q=80",
    aiReason: "Salah satu destinasi paling kaya dengan nilai sejarah dan budaya di ASEAN dengan kos sara hidup antara terendah di Indonesia.",
    itinerary: [
      {
        day: 1,
        title: "Tiba di Jogja & Jalan Malioboro",
        activities: ["Mendarat di YIA, naik keretapi bandar ke Stesen Tugu", "Jalan kaki di Jalan Malioboro yang meriah dengan pemuzik jalanan", "Check-in hotel warisan"],
        foodSpot: "Gudeg Yu Djum & Ayam Goreng Kalasan Halal",
        dailyBudgetRM: 55,
      },
      {
        day: 2,
        title: "Candi Borobudur / Prambanan & Sunset",
        activities: ["Lawatan ke Candi Hindu terbesar Prambanan", "Bergambar di Tebing Breksi", "Tonton pertunjukan Ramayana Ballet"],
        foodSpot: "Nasi Pecel Madiun & Es Doger tepi sawah",
        dailyBudgetRM: 95,
      },
      {
        day: 3,
        title: "Jeep Lava Tour Merapi & Gua Pindul",
        activities: ["Menaiki 4x4 Jeep menerjah laluan pasir lava Merapi", "Cave tubing menyusuri sungai bawah tanah Gua Pindul", "Santai petang di Bukit Bintang Jogja"],
        foodSpot: "Bakmi Jawa Goreng & Wedang Jahe panas",
        dailyBudgetRM: 110,
      },
      {
        day: 4,
        title: "Kraton Jogja & Membeli Batik",
        activities: ["Melawat Istana Kraton Ngayogyakarta", "Beli kain batik asli dan cenderamata perak di Pasar Beringharjo", "Pulang ke Kuala Lumpur"],
        foodSpot: "Soto Ayam Ambengan & Kopi Jos Arang",
        dailyBudgetRM: 45,
      },
    ],
  },
  {
    id: "kotakinabalu",
    city: "Kota Kinabalu (Sabah)",
    country: "Malaysia",
    flag: "🇲🇾",
    tagline: "Gunung Kinabalu gah, pulau pasir putih & sunset Tanjung Aru",
    vibe: ["nature", "beach", "healing", "foodie"],
    flightPriceReturnRM: 320,
    hotelPerNightRM: 150,
    foodPerDayRM: 55,
    transportPerDayRM: 45,
    visaFreeDays: 90,
    visaStatusText: "Domestik (Guna IC / Kad Pengenalan)",
    halalScore: "senang",
    halalDescription: "100% halal dan mesra Muslim, makanan laut segar harga berpatutan",
    currencyCode: "MYR",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80",
    aiReason: "Tak perlukan passport antarabangsa! Cukup bawa IC untuk nikmati pemandangan Kundasang ala New Zealand dan sunset terbaik dunia di Tanjung Aru.",
    itinerary: [
      {
        day: 1,
        title: "Tiba di KK & Sunset Terhangat Tanjung Aru",
        activities: ["Mendarat di KKIA, sewa kereta bajet", "Check-in hotel bandar", "Saksikan salah satu sunset terindah dunia di Pantai Tanjung Aru"],
        foodSpot: "Air Kelapa Laut & Jagung Bakar tepi pantai Tanjung Aru",
        dailyBudgetRM: 60,
      },
      {
        day: 2,
        title: "Jelajah Sejuk Kundasang & Desa Dairy Farm",
        activities: ["Pandu ke Kundasang menatap Gunung Kinabalu", "Melawat Desa Cattle Dairy Farm minum susu lembu segar", "Bercuti di Canopy Walkway Poring Hot Spring"],
        foodSpot: "Sayur Sabah manis goreng belacan & Ikan Bakar Kundasang",
        dailyBudgetRM: 85,
      },
      {
        day: 3,
        title: "Pulau Manukan & Sapi Island Hopping",
        activities: ["Naik bot dari Jesselton Point ke Pulau Manukan & Sapi", "Snorkeling air jernih melihat ikan nemo", "Parasailing / aktiviti air sukan"],
        foodSpot: "Pek BBQ makanan laut segar di pulau",
        dailyBudgetRM: 110,
      },
      {
        day: 4,
        title: "Pasar Filipina & Beli Mutiara Asli",
        activities: ["Beli mutiara Sabah & kraftangan di Pasar Filipina", "Borong keropok amplang & udang kering di Pasar Besar", "Penerbangan pulang ke Semenanjung"],
        foodSpot: "Tuaran Mee Halal & Kopi Tenom asli",
        dailyBudgetRM: 55,
      },
    ],
  },
];

export interface SearchQuery {
  budget: number;
  budgetMode?: "per_pax" | "total";
  days: number;
  vibe: TravelVibe | string;
  pax: number;
  origin?: string;
}

export interface RecommendationResult {
  destination: Destination;
  totalCost: number;
  costBreakdown: {
    flightTotal: number;
    hotelTotal: number;
    foodTotal: number;
    transportTotal: number;
  };
  budgetUsagePercent: number;
  remainingBudget: number;
  isWithinBudget: boolean;
  valueScore: number;
}

export function calculateDestinationCost(
  dest: Destination,
  days: number,
  pax: number
): {
  totalCost: number;
  breakdown: {
    flightTotal: number;
    hotelTotal: number;
    foodTotal: number;
    transportTotal: number;
  };
} {
  const nights = Math.max(1, days - 1);
  const roomsNeeded = Math.ceil(pax / 2); // 2 pax per room

  const flightTotal = dest.flightPriceReturnRM * pax;
  const hotelTotal = dest.hotelPerNightRM * nights * roomsNeeded;
  const foodTotal = dest.foodPerDayRM * days * pax;
  const transportTotal = dest.transportPerDayRM * days;

  const totalCost = flightTotal + hotelTotal + foodTotal + transportTotal;

  return {
    totalCost,
    breakdown: {
      flightTotal,
      hotelTotal,
      foodTotal,
      transportTotal,
    },
  };
}
