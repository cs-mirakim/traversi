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
  tier: "domestic" | "asean" | "global";
  flag: string;
  tagline: string;
  vibe: TravelVibe[];
  flightPriceReturnRM: number; // Return flight per pax
  hotelPerNightRM: number; // Per room/night (shares 2 pax)
  foodPerDayRM: number; // Per pax per day
  transportPerDayRM: number; // Per group per day
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

export interface CostBreakdown {
  flightTotalRM: number;
  hotelTotalRM: number;
  foodTotalRM: number;
  transportTotalRM: number;
  nights: number;
  rooms: number;
}

export interface RecommendationResult {
  destination: Destination;
  totalCost: number;
  costBreakdown: CostBreakdown;
  budgetUsagePercent: number;
  remainingBudget: number;
  isWithinBudget: boolean;
  valueScore: number;
  halal: {
    count: number;
    score: "Mudah" | "Sederhana" | "Terhad";
    description: string;
    source: string;
  };
  visa: {
    type: string;
    days: number;
    badge: string;
    note: string;
    source: string;
  };
}

export interface SearchQuery {
  budget: number;
  budgetMode?: "total" | "per_pax";
  days: number;
  pax: number;
  origin?: string;
  vibe?: TravelVibe;
}

export function calculateDestinationCost(
  dest: Destination,
  days: number,
  pax: number
): { totalCost: number; breakdown: CostBreakdown } {
  // Nights: (days - 1), min 0 for day trips
  const nights = Math.max(0, days - 1);
  // Hotel rooms: shared 2 per room
  const rooms = Math.ceil(pax / 2);

  const flightTotalRM = dest.flightPriceReturnRM * pax;
  const hotelTotalRM = rooms * dest.hotelPerNightRM * nights;
  const foodTotalRM = dest.foodPerDayRM * pax * days;
  // Grab / local transport sharing: 1 car per 2-4 pax
  const transportTotalRM = dest.transportPerDayRM * rooms * days;

  const totalCost = flightTotalRM + hotelTotalRM + foodTotalRM + transportTotalRM;

  return {
    totalCost,
    breakdown: {
      flightTotalRM,
      hotelTotalRM,
      foodTotalRM,
      transportTotalRM,
      nights,
      rooms,
    },
  };
}

export const MOCK_DESTINATIONS: Destination[] = [
  // TIER 1: DOMESTIK (RM800 - RM1,500)
  {
    id: "langkawi",
    city: "Langkawi",
    country: "Malaysia",
    tier: "domestic",
    flag: "🇲🇾",
    tagline: "Pulau bebas cukai, pantai tenang & kereta sewa murah",
    vibe: ["beach", "nature", "healing", "budget"],
    flightPriceReturnRM: 160,
    hotelPerNightRM: 120,
    foodPerDayRM: 50,
    transportPerDayRM: 60,
    currencyCode: "MYR",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1000&q=80",
    aiReason: "Penerbangan domestik sangat jimat, bebas cukai, sewa kereta pulau murah, dan 100% makanan halal mudah didapati.",
    itinerary: [
      {
        day: 1,
        title: "Tiba di Langkawi & Sunset Pantai Cenang",
        activities: ["Ambil kereta sewa di Lapangan Terbang Langkawi", "Check-in resort bajet Pantai Cenang", "Santai lepak pantai waktu senja"],
        foodSpot: "Laksa Ikan Sekoq & Pasembur Padu tepi pantai",
        dailyBudgetRM: 60,
      },
      {
        day: 2,
        title: "Langkawi SkyCab & Jambatan Gantung",
        activities: ["Naik kereta kabel SkyCab ke puncak Gunung Mat Cincang", "Jalan atas SkyBridge kaca", "Bergambar di Oriental Village"],
        foodSpot: "Nasi Campur Gulai Panas Telaga Harbour",
        dailyBudgetRM: 90,
      },
      {
        day: 3,
        title: "Island Hopping Tasik Dayang Bunting",
        activities: ["Naik bot laju ke Tasik Dayang Bunting", "Beri makan helang di Pulau Singa Besar", "Mandi pantai pasir putih Pulau Beras Basah"],
        foodSpot: "Ikan Bakar Petai & Tomyam Udang Cenang",
        dailyBudgetRM: 95,
      },
      {
        day: 4,
        title: "Shopping Bebas Cukai Kuah & Balik",
        activities: ["Beli coklat bebas cukai & pinggan mangkuk di Kuah", "Singgah Dataran Lang bergambar mercu tanda helang", "Pulang melalui airport"],
        foodSpot: "Roti Canai Black Pepper Pekan Kuah",
        dailyBudgetRM: 45,
      },
    ],
  },
  {
    id: "penang",
    city: "Penang",
    country: "Malaysia",
    tier: "domestic",
    flag: "🇲🇾",
    tagline: "Syurga makanan jalanan, seni jalanan & warisan UNESCO",
    vibe: ["foodie", "heritage", "city", "budget"],
    flightPriceReturnRM: 130,
    hotelPerNightRM: 130,
    foodPerDayRM: 55,
    transportPerDayRM: 35,
    currencyCode: "MYR",
    image: "https://images.unsplash.com/photo-1598887142487-3c854d51d2c7?auto=format&fit=crop&w=1000&q=80",
    aiReason: "Pilihan terbaik untuk food trip bajet pelajar dan belia. Makanan padu berpatutan dan mural George Town boleh jalan kaki percuma.",
    itinerary: [
      {
        day: 1,
        title: "Jejak Mural George Town & Heritage Trail",
        activities: ["Check-in hotel butik George Town", "Sewa basikal atau jalan kaki cari seni jalanan", "Singgah Chew Jetty rumah atas air"],
        foodSpot: "Nasi Kandar Deen Jelutong / Beratur",
        dailyBudgetRM: 65,
      },
      {
        day: 2,
        title: "Bukit Bendera & The Habitat",
        activities: ["Naik keretapi funicular ke puncak Penang Hill", "Hirup udara sejuk dan pemandangan jambatan Pulau Pinang", "Lawat Kek Lok Si"],
        foodSpot: "Char Koay Teow halal telur masin & Cendol Penang",
        dailyBudgetRM: 85,
      },
      {
        day: 3,
        title: "Batu Ferringhi & Taman Negara Penang",
        activities: ["Hiking ringan ke Pantai Kerachut tengok penyu", "Aktiviti sukan air di Batu Ferringhi", "Pasar malam tepi pantai"],
        foodSpot: "Mee Udang Bukit Tambun / Pasembur Menara Padang Kota",
        dailyBudgetRM: 75,
      },
      {
        day: 4,
        title: "Kafe Estetik Armenian Street & Pulang",
        activities: ["Lepak kafe kopi artisanal Armenian Street", "Beli jeruk Madu Pak Ali", "Perjalanan pulang"],
        foodSpot: "Roti Canai Transfer Road & Teh Tarik Pandan",
        dailyBudgetRM: 50,
      },
    ],
  },
  {
    id: "kotakinabalu",
    city: "Kota Kinabalu",
    country: "Malaysia",
    tier: "domestic",
    flag: "🇲🇾",
    tagline: "Sunset Tanjung Aru nombor satu dunia & seafood segar murah",
    vibe: ["nature", "beach", "healing", "foodie"],
    flightPriceReturnRM: 280,
    hotelPerNightRM: 140,
    foodPerDayRM: 55,
    transportPerDayRM: 50,
    currencyCode: "MYR",
    image: "https://images.unsplash.com/photo-1571216332002-282dce467b32?auto=format&fit=crop&w=1000&q=80",
    aiReason: "Penerbangan terus AirAsia kerap ada promosi. Seafood segar pasar malam sangat murah dan air laut pulau sekitarnya jernih membiru.",
    itinerary: [
      {
        day: 1,
        title: "Tiba di KK & Sunset Epik Pantai Tanjung Aru",
        activities: ["Mendarat di KKIA & check-in hotel bandar", "Minum air kelapa pandan sambil tengok matahari terbenam Tanjung Aru", "Pasar Malam Sinsuran"],
        foodSpot: "Sayap Ayam Madu Bakar Tanjung Aru",
        dailyBudgetRM: 65,
      },
      {
        day: 2,
        title: "Tunku Abdul Rahman Marine Park Snorkeling",
        activities: ["Naik bot dari Jesselton Point ke Pulau Manukan & Sapi", "Berenang dan snorkeling tengok karang laut", "Parasailing santai"],
        foodSpot: "Makan tengah hari bungkusan tepi pantai",
        dailyBudgetRM: 95,
      },
      {
        day: 3,
        title: "Trip Harian Kundasang & Desa Cattle Dairy Farm",
        activities: ["Pemanduan ke Kundasang melihat Gunung Kinabalu megah", "Minum susu lembu segar & gelato di Desa Dairy Farm", "Singgah Pekan Nabalu beli kraf"],
        foodSpot: "Sayur manis Sabah & ayam pansuh tempatan",
        dailyBudgetRM: 90,
      },
      {
        day: 4,
        title: "Pasar Kraftangan Filipina & Borong Mutiara",
        activities: ["Beli cenderamata mutiara asli Sabah & kraftangan etnik", "Singgah Pasar Ikan Masin beli amplang & ikan bilis mata biru", "Penerbangan pulang"],
        foodSpot: "Tuaran Mee halal & Kopi Tenom panas",
        dailyBudgetRM: 50,
      },
    ],
  },
  {
    id: "kuching",
    city: "Kuching",
    country: "Malaysia",
    tier: "domestic",
    flag: "🇲🇾",
    tagline: "Bandar perpaduan, tebing sungai bersejarah & laksa Sarawak asli",
    vibe: ["heritage", "nature", "foodie", "budget"],
    flightPriceReturnRM: 240,
    hotelPerNightRM: 120,
    foodPerDayRM: 45,
    transportPerDayRM: 40,
    currencyCode: "MYR",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1000&q=80",
    aiReason: "Kos sara hidup rendah, bandar bersih selamat, bot penambang seringgit, dan budaya warisan Borneo yang sangat kaya.",
    itinerary: [
      {
        day: 1,
        title: "Kuching Waterfront & Jambatan Darul Hana",
        activities: ["Check-in berdekatan Main Bazaar", "Jalan santai di Kuching Waterfront waktu petang", "Tengok pertunjukan air pancut muzikal jambatan"],
        foodSpot: "Mee Kolok Daging Sapi Halal & Kek Lapis Dayang Salhah",
        dailyBudgetRM: 50,
      },
      {
        day: 2,
        title: "Borneo Cultures Museum & Budaya Etnik",
        activities: ["Lawat muzium kedua terbesar di Asia Tenggara", "Bergambar di Kubu Margherita", "Naik sampan tambang tradisi seberang Sungai Sarawak"],
        foodSpot: "Laksa Sarawak asli kuah pekat beraroma",
        dailyBudgetRM: 70,
      },
      {
        day: 3,
        title: "Semenggoh Wildlife Centre Jumpa Orangutan",
        activities: ["Tengok sesi makan orangutan separuh liar di hutan rimba Semenggoh", "Singgah Kampung Budaya Sarawak (SCV)", "Santai di Pantai Damai"],
        foodSpot: "Nasi Goreng Dabai & Ayam Pansoh buluh",
        dailyBudgetRM: 85,
      },
      {
        day: 4,
        title: "Beli Kek Lapis Basah Sarawak & Balik",
        activities: ["Borong pelbagai perisa Kek Lapis Sarawak segar", "Singgah Tugu Kucing ikonik bergambar", "Perjalanan ke Lapangan Terbang Kuching"],
        foodSpot: "Roti Canai Kuah Kari Kambing Sarawak",
        dailyBudgetRM: 45,
      },
    ],
  },
  {
    id: "redang",
    city: "Pulau Redang",
    country: "Malaysia",
    tier: "domestic",
    flag: "🇲🇾",
    tagline: "Air laut jernih kristal, penyu jinak & pasir putih sehalus tepung",
    vibe: ["beach", "nature", "healing"],
    flightPriceReturnRM: 210,
    hotelPerNightRM: 180,
    foodPerDayRM: 60,
    transportPerDayRM: 45,
    currencyCode: "MYR",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    aiReason: "Pakej pantai domestik bertaraf antarabangsa. Tak perlu pasport, makanan laut halal segar, dan air laut paling jernih di Semenanjung.",
    itinerary: [
      {
        day: 1,
        title: "Ketibaan di Jeti Merang & Masuk Pulau",
        activities: ["Bot laju dari Jeti Merang ke Pasir Panjang Redang", "Check-in resort tepi laut", "Mandi laut petang di hadapan resort"],
        foodSpot: "Ikan Celup Tepung (ICT) Terengganu & Keropok Lekor",
        dailyBudgetRM: 65,
      },
      {
        day: 2,
        title: "Snorkeling Bersama Penyu & Taman Laut",
        activities: ["Sesi snorkeling bersama penyu di Turtle Bay", "Lawat Taman Laut Marine Park Redang", "Bola tampar pantai waktu senja"],
        foodSpot: "Bufet BBQ makanan laut halal tepi pantai",
        dailyBudgetRM: 90,
      },
      {
        day: 3,
        title: "Jungle Trekking Teluk Dalam & Kayak Kaca",
        activities: ["Trekking denai hutan ke Teluk Dalam", "Sewa kayak lutsinar bergambar atas air jernih", "Lepak muzik santai waktu malam"],
        foodSpot: "Nasi Dagang Terengganu Gulai Ikan Tongkol",
        dailyBudgetRM: 80,
      },
      {
        day: 4,
        title: "Matahari Terbit Laut China Selatan & Pulang",
        activities: ["Bangun awal rakam matahari terbit merah jambu", "Bot laju pulang ke jeti", "Singgah Pasar Payang borong batik"],
        foodSpot: "Sata & Otak-otak Terengganu panas",
        dailyBudgetRM: 50,
      },
    ],
  },

  // TIER 2: ASEAN (RM1,500 - RM3,000)
  {
    id: "krabi",
    city: "Krabi",
    country: "Thailand",
    tier: "asean",
    flag: "🇹🇭",
    tagline: "Pantai batu kapur megah & komuniti Muslim Ao Nang mesra",
    vibe: ["beach", "nature", "healing", "foodie"],
    flightPriceReturnRM: 360,
    hotelPerNightRM: 130,
    foodPerDayRM: 55,
    transportPerDayRM: 40,
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
    id: "bangkok",
    city: "Bangkok",
    country: "Thailand",
    tier: "asean",
    flag: "🇹🇭",
    tagline: "Pusat membeli-belah belia, pasar malam hipster & MRT moden",
    vibe: ["city", "shopping", "foodie", "budget"],
    flightPriceReturnRM: 390,
    hotelPerNightRM: 140,
    foodPerDayRM: 60,
    transportPerDayRM: 35,
    currencyCode: "THB",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1000&q=80",
    aiReason: "Penerbangan kerap, kos pengangkutan BTS/MRT murah, dan kawasan Phaya Thai/Pratunam penuh dengan makanan halal sedap.",
    itinerary: [
      {
        day: 1,
        title: "Tiba di Don Mueang & Pasar Pratunam",
        activities: ["Check-in hotel kawasan Pratunam/Phaya Thai", "Beli baju trending fesyen borong Platinum Mall", "Lepak pasar malam tepi terusan"],
        foodSpot: "Khao Mok Gai (Nasi Briyani Ayam Thai) Phaya Thai",
        dailyBudgetRM: 75,
      },
      {
        day: 2,
        title: "Chatuchak Weekend Market & IconSiam",
        activities: ["Pusing pasar terbesar dunia Chatuchak", "Naik bot sungai Chao Phraya ke kompleks mewah IconSiam", "Tonton pertunjukan air pancut"],
        foodSpot: "Aiskrim Kelapa Chatuchak & Boat Noodle Halal",
        dailyBudgetRM: 95,
      },
      {
        day: 3,
        title: "Siam Paragon, CentralWorld & MBK Center",
        activities: ["Shopping barang kraf dan gajet di MBK Halal Floor", "Bergambar di Dataran Seni BACC", "Pasar Malam Jodd Fairs Rama 9"],
        foodSpot: "Tomyum kung mangkuk besar & Nasi Lemba Siam",
        dailyBudgetRM: 90,
      },
      {
        day: 4,
        title: "Beli Snek Big C Rajdamri & Pulang",
        activities: ["Borong keropok rumpai laut & teh Thai di Big C Supercentre", "Perjalanan ke lapangan terbang", "Penerbangan pulang ke Malaysia"],
        foodSpot: "Pulut Mangga Manis Thai Airport",
        dailyBudgetRM: 55,
      },
    ],
  },
  {
    id: "bali",
    city: "Bali",
    country: "Indonesia",
    tier: "asean",
    flag: "🇮🇩",
    tagline: "Vila peribadi kolam renang, sawah padi Ubud & kafe estetik",
    vibe: ["nature", "beach", "healing", "foodie"],
    flightPriceReturnRM: 450,
    hotelPerNightRM: 150,
    foodPerDayRM: 50,
    transportPerDayRM: 60,
    currencyCode: "IDR",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",
    aiReason: "Nilai tukaran wang IDR berpihak pada Ringgit. Sewa vila peribadi sangat berpatutan jika kongsi kawan, dan makanan Padang Muslim merata-rata.",
    itinerary: [
      {
        day: 1,
        title: "Mendarat di Ngurah Rai & Check-in Seminyak",
        activities: ["Ambil kereta sewa pandu sendiri / supir", "Check-in vila estetik dengan kolam renang", "Matahari terbenam di Pantai Kuta/Seminyak"],
        foodSpot: "Nasi Padang Garuda & Bebek Bengil Halal",
        dailyBudgetRM: 75,
      },
      {
        day: 2,
        title: "Sawah Bertingkat Tegallalang & Ubud Healing",
        activities: ["Buaian ikonik Bali Swing menghadap lembah", "Jalan santai teres padi Tegallalang", "Meneroka pasar seni kraf Ubud"],
        foodSpot: "Ayam Betutu Khas Gilimanuk Halal 100%",
        dailyBudgetRM: 90,
      },
      {
        day: 3,
        title: "Nusa Penida Day Trip & Kelingking Beach",
        activities: ["Naik bot laju ke pulau Nusa Penida", "Bergambar tebing T-Rex Kelingking Cliff", "Snorkeling di Crystal Bay"],
        foodSpot: "Ikan Bakar Jimbaran Halal tepi pantai waktu petang",
        dailyBudgetRM: 120,
      },
      {
        day: 4,
        title: "Pura Tanah Lot & Borong Krisna Oleh-Oleh",
        activities: ["Melawat mercu tanda kuil atas batu karang Tanah Lot", "Beli kacang disco & baju barong di Krisna Oleh-Oleh", "Pulang ke airport"],
        foodSpot: "Bakso Sapi Beranak Halal",
        dailyBudgetRM: 50,
      },
    ],
  },
  {
    id: "dalat",
    city: "Dalat",
    country: "Vietnam",
    tier: "asean",
    flag: "🇻🇳",
    tagline: "Bandar musim bunga pergunungan sejuk, air terjun & kafe awan",
    vibe: ["nature", "healing", "heritage", "budget"],
    flightPriceReturnRM: 480,
    hotelPerNightRM: 110,
    foodPerDayRM: 45,
    transportPerDayRM: 40,
    currencyCode: "VND",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80",
    aiReason: "Suhu sejuk 15-22°C sepanjang tahun seperti Cameron Highlands versi moden Eropah, hotel murah, dan pemandangan lembah memukau.",
    itinerary: [
      {
        day: 1,
        title: "Tiba di Dalat & Tasik Xuan Huong",
        activities: ["Penerbangan ke Lien Khuong & naik bas ke pusat Dalat", "Jalan petang di keliling Tasik Xuan Huong", "Night Market Dalat berjaket"],
        foodSpot: "Restoran Halal Al-Huda Dalat & Kopi Tetes Vietnam",
        dailyBudgetRM: 60,
      },
      {
        day: 2,
        title: "Air Terjun Datanla & Alpine Coaster",
        activities: ["Naik roller coaster menuruni hutan ke air terjun Datanla", "Lawat Crazy House binaan arkitek unik dunia", "Stesen Keretapi Antik Dalat"],
        foodSpot: "Banh Mi Sayur Rangup & Buah Strawberi Segar",
        dailyBudgetRM: 85,
      },
      {
        day: 3,
        title: "Kafe Atas Awan Cau Dat & Bukit Teh",
        activities: ["Bangun 5 pagi layan 'cloud hunting' di bukit Cau Dat", "Bergambar di kincir angin gergasi ladang teh", "Taman Bunga Hydrangea"],
        foodSpot: "Pho Daging Sapi Halal Dalat",
        dailyBudgetRM: 80,
      },
      {
        day: 4,
        title: "Gereja Merah Domaine de Marie & Pulang",
        activities: ["Bergambar di gereja merah jambu gaya Perancis", "Beli kerepek buah nangka & kopi artik", "Perjalanan ke airport pulang"],
        foodSpot: "Kopi Alpukat (Avocado Coffee) terkenal",
        dailyBudgetRM: 50,
      },
    ],
  },
  {
    id: "hochiminh",
    city: "Ho Chi Minh City",
    country: "Vietnam",
    tier: "asean",
    flag: "🇻🇳",
    tagline: "Syurga kain pasang cotton, Malaysian Street & kopi jalanan",
    vibe: ["shopping", "city", "foodie", "budget"],
    flightPriceReturnRM: 370,
    hotelPerNightRM: 120,
    foodPerDayRM: 50,
    transportPerDayRM: 30,
    currencyCode: "VND",
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80",
    aiReason: "Destinasi kegemaran rakyat Malaysia untuk borong kain, telekung, dan jubah sulung murah di Pasar Ben Thanh dengan lorong makanan halal meluas.",
    itinerary: [
      {
        day: 1,
        title: "Tiba di Saigon & Malaysian Street (District 1)",
        activities: ["Check-in hotel kawasan Ben Thanh", "Meneroka jalan Nguyen An Ninh (Malaysian Street)", "Tukar duit VND di kedai emas Ha Tam"],
        foodSpot: "Nasi Ayam Kampung Halal Saigon & Teh Tarik",
        dailyBudgetRM: 65,
      },
      {
        day: 2,
        title: "Shopping Pasar Ben Thanh & Cu Chi Tunnels",
        activities: ["Tawar menawar kain cotton dan telekung di Ben Thanh", "Trip petang ke terowong bersejarah perang Cu Chi", "Kafe estetik Cafe Apartment"],
        foodSpot: "Pho Muslim Halal Daging Lembut Nguyen Trai",
        dailyBudgetRM: 95,
      },
      {
        day: 3,
        title: "Sungai Mekong Delta & Kampung Muslim Cham",
        activities: ["Naik sampan dayung terusan pokok nipah Mekong Delta", "Lawat komuniti Muslim Cham dan masjid bersejarah", "Beli gula kelapa"],
        foodSpot: "Ikan Siakap Stim & Sayur Goreng Halal Mekong",
        dailyBudgetRM: 90,
      },
      {
        day: 4,
        title: "Post Office Antik, Katedral Notre Dame & Balik",
        activities: ["Bergambar depan Pejabat Pos binaan Gustave Eiffel", "Beli kopi drip Vietnam dan snek kacang gajus", "Penerbangan balik KLIA"],
        foodSpot: "Banh Cuon Halal & Kopi Telur Vietnam",
        dailyBudgetRM: 55,
      },
    ],
  },
  {
    id: "phuket",
    city: "Phuket",
    country: "Thailand",
    tier: "asean",
    flag: "🇹🇭",
    tagline: "Pulau lagenda Phi Phi, pantai Patong meriah & Pekan Lama Portugis",
    vibe: ["beach", "nature", "heritage", "foodie"],
    flightPriceReturnRM: 380,
    hotelPerNightRM: 140,
    foodPerDayRM: 60,
    transportPerDayRM: 45,
    currencyCode: "THB",
    image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1000&q=80",
    aiReason: "Pulau percutian ikonik dengan populasi Muslim selatan Thai yang ramai. Restoran halal bersepah di kawasan Patong dan Bang Tao.",
    itinerary: [
      {
        day: 1,
        title: "Tiba di Phuket & Senja di Promthep Cape",
        activities: ["Check-in hotel berdekatan Patong / Karon", "Lihat pemandangan tanjung Promthep Cape paling selatan", "Jalan di Patong Night Market"],
        foodSpot: "Tomyum Poktek & Ketam Masak Kari Kuning Halal",
        dailyBudgetRM: 75,
      },
      {
        day: 2,
        title: "Phi Phi Islands & Maya Bay Snorkeling",
        activities: ["Speedboat ke kepulauan Phi Phi", "Mandi laut cetek di Maya Bay lokasi penggambaran The Beach", "Snorkeling di Pileh Lagoon"],
        foodSpot: "Bufet makan tengah hari halal di Phi Phi Don",
        dailyBudgetRM: 125,
      },
      {
        day: 3,
        title: "Phuket Old Town Bangunan Sino-Portuguese",
        activities: ["Jalan kaki bergambar kedai warisan berwarna-warni", "Singgah muzium Baba Nyonya Phuket", "Shopping cenderamata unik"],
        foodSpot: "Roti Mataba & Kari Daging Kambing Muslim Phuket",
        dailyBudgetRM: 85,
      },
      {
        day: 4,
        title: "Big Buddha Hill & Beli Gajus Sri Bhurapa",
        activities: ["Pemandangan 360 darjah seluruh pulau dari puncak bukit", "Beli kacang gajus pelbagai perisa kilang tempatan", "Pulang ke airport"],
        foodSpot: "Ayam Goreng Hat Yai rangup & Pulut Kuning",
        dailyBudgetRM: 55,
      },
    ],
  },
  {
    id: "lombok",
    city: "Lombok",
    country: "Indonesia",
    tier: "asean",
    flag: "🇮🇩",
    tagline: "Pulau Seribu Masjid, air terjun Sendang Gile & Gili Trawangan",
    vibe: ["nature", "beach", "healing"],
    flightPriceReturnRM: 420,
    hotelPerNightRM: 130,
    foodPerDayRM: 45,
    transportPerDayRM: 50,
    currencyCode: "IDR",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80",
    aiReason: "95% penduduk Muslim dengan jolokan Pulau Seribu Masjid. 100% makanan terjamin halal, pantai tenang tanpa kesesakan keterlaluan.",
    itinerary: [
      {
        day: 1,
        title: "Tiba di Bandara Lombok & Sunset Pantai Senggigi",
        activities: ["Tiba di lapangan terbang Praya", "Check-in resort persisiran pantai Senggigi", "Melihat matahari terbenam berlatarkan Gunung Agung"],
        foodSpot: "Ayam Taliwang Pedas Berapi & Plecing Kangkung",
        dailyBudgetRM: 60,
      },
      {
        day: 2,
        title: "Gili Trawangan Island Life & Basikal",
        activities: ["Bot ke Gili Trawangan (pulau bebas kenderaan bermotor)", "Sewa basikal keliling pulau", "Snorkeling berenang dengan penyu laut"],
        foodSpot: "Sate Ikan Tanjung & Jus Avokado Coklat",
        dailyBudgetRM: 95,
      },
      {
        day: 3,
        title: "Air Terjun Sendang Gile & Kaki Gunung Rinjani",
        activities: ["Trekking nyaman ke air terjun di kaki Gunung Rinjani", "Lawat perkampungan tradisional Sasak Sade", "Melihat tenunan kain songket"],
        foodSpot: "Nasi Balap Puyung pedas lazat",
        dailyBudgetRM: 85,
      },
      {
        day: 4,
        title: "Pantai Kuta Mandalika & Litar MotoGP",
        activities: ["Bergambar di Bukit Merese berpasir lada", "Tengok litar antarabangsa Mandalika Circuit", "Pulang ke lapangan terbang"],
        foodSpot: "Bebek Goreng Sambal Ijo",
        dailyBudgetRM: 50,
      },
    ],
  },

  // TIER 3: GLOBAL (RM3,000+)
  {
    id: "istanbul",
    city: "Istanbul",
    country: "Turkey",
    tier: "global",
    flag: "🇹🇷",
    tagline: "Pertemuan Eropah & Asia, Selat Bosphorus & masjid Uthmaniyyah",
    vibe: ["heritage", "city", "foodie", "shopping"],
    flightPriceReturnRM: 1650,
    hotelPerNightRM: 190,
    foodPerDayRM: 75,
    transportPerDayRM: 40,
    currencyCode: "TRY",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=80",
    aiReason: "Negara majoriti Muslim tanpa isu halal, bebas visa 90 hari, nilai mata wang Lira berpatutan, dan gabungan sejarah dunia yang agung.",
    itinerary: [
      {
        day: 1,
        title: "Tiba di Istanbul & Hagia Sophia Megah",
        activities: ["Menaiki trem bandar ke Sultanahmet", "Melangkah masuk ke monumen keajaiban Hagia Sophia", "Solat di Masjid Biru (Blue Mosque)"],
        foodSpot: "Kebab Daging Arang & Roti Simit Bijan Segar",
        dailyBudgetRM: 85,
      },
      {
        day: 2,
        title: "Grand Bazaar & Pelayaran Selat Bosphorus",
        activities: ["Membeli-belah teh epal dan rempah di Grand Bazaar", "Naik cruise feri awam menyeberang benua Eropah ke Asia", "Menara Galata"],
        foodSpot: "Balik Ekmek (Roti Ikan Bakar) bawah Jambatan Galata",
        dailyBudgetRM: 105,
      },
      {
        day: 3,
        title: "Istana Topkapi & Jalan Istiklal Taksim",
        activities: ["Melihat artifak peninggalan Rasulullah di Istana Topkapi", "Naik trem merah antik sepanjang Jalan Istiklal Taksim", "Beli manisan baklava"],
        foodSpot: "Kofte Sultanahmet & Teh Turki Tulen",
        dailyBudgetRM: 95,
      },
      {
        day: 4,
        title: "Bukit Camlica Asia & Kopi Pasir Turki",
        activities: ["Melawat Masjid Besar Camlica di bahagian Asia Istanbul", "Hirup kopi pasir tradisi menghadap panorama selat", "Penerbangan balik"],
        foodSpot: "Kunefe Keju Panas Meleleh & Turkish Delight Hafiz Mustafa",
        dailyBudgetRM: 75,
      },
    ],
  },
  {
    id: "tokyo",
    city: "Tokyo",
    country: "Japan",
    tier: "global",
    flag: "🇯🇵",
    tagline: "Lintasan Shibuya, anime Akihabara & tradisi Asakusa bersih",
    vibe: ["city", "shopping", "foodie", "heritage"],
    flightPriceReturnRM: 1450,
    hotelPerNightRM: 240,
    foodPerDayRM: 90,
    transportPerDayRM: 55,
    currencyCode: "JPY",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80",
    aiReason: "Sistem keretapi paling efisien dunia, keselamatan tinggi, bebas visa 90 hari, dan perkembangan kedai ramen halal rasmi sangat pesat.",
    itinerary: [
      {
        day: 1,
        title: "Lintasan Shibuya & Patung Hachiko",
        activities: ["Melintas Shibuya Scramble paling sibuk di dunia", "Bergambar bersama tugu anjing setia Hachiko", "Menikmati pemandangan dari Shibuya Sky"],
        foodSpot: "Halal Ramen Ayam-Ya / Honolu Ramen Shibuya",
        dailyBudgetRM: 110,
      },
      {
        day: 2,
        title: "Kuil Purba Senso-ji Asakusa & Skytree",
        activities: ["Jalan di jalan kedai kraf Nakamise-dori", "Melihat tanglung gergasi Kaminarimon Kuil Senso-ji", "Bergambar di Tokyo Skytree"],
        foodSpot: "Tempura Halal Asakusa & Manisan Matcha Halal",
        dailyBudgetRM: 125,
      },
      {
        day: 3,
        title: "Pusat Elektronik Akihabara & Taman Ueno",
        activities: ["Pusing kedai gajet dan figura anime di Akihabara", "Jalan santai di tasik Teratai Taman Ueno", "Shopping Ameyoko Market"],
        foodSpot: "Kushikatsu Daging Halal & Bento Shinjuku",
        dailyBudgetRM: 120,
      },
      {
        day: 4,
        title: "Tokyo Camii Mosque & Harajuku Takeshita",
        activities: ["Melawat Masjid Tokyo Camii reka bentuk Turki indah", "Melihat fesyen jalanan Harajuku Takeshita Street", "Penerbangan balik Haneda/Narita"],
        foodSpot: "Krep Manis Halal Harajuku & Teh Hijau Ais",
        dailyBudgetRM: 85,
      },
    ],
  },
  {
    id: "seoul",
    city: "Seoul",
    country: "South Korea",
    tier: "global",
    flag: "🇰🇷",
    tagline: "Istana Gyeongbokgung baju Hanbok, Myeongdong & K-Pop",
    vibe: ["city", "shopping", "heritage", "foodie"],
    flightPriceReturnRM: 1380,
    hotelPerNightRM: 220,
    foodPerDayRM: 85,
    transportPerDayRM: 50,
    currencyCode: "KRW",
    image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1000&q=80",
    aiReason: "Pengangkutan subway mudah dengan kad T-Money. Sewa baju Hanbok masuk istana percuma, dan kawasan Itaewon menjadi hab Muslim utama.",
    itinerary: [
      {
        day: 1,
        title: "Tiba di Incheon & Street Food Myeongdong",
        activities: ["Naik keretapi AREX ke pusat Seoul", "Check-in hotel Myeongdong", "Shopping kosmetik dan snek jalanan Myeongdong"],
        foodSpot: "Ayam Goreng Korea Halal Kkanbu & Tteokbokki Halal",
        dailyBudgetRM: 100,
      },
      {
        day: 2,
        title: "Sewa Hanbok & Istana Gyeongbokgung",
        activities: ["Sewa pakaian tradisional Hanbok", "Masuk percuma ke Istana Besar Gyeongbokgung", "Jalan lorong rumah tradisional Bukchon Hanok Village"],
        foodSpot: "Samgyetang (Sup Ayam Ginseng) Halal",
        dailyBudgetRM: 115,
      },
      {
        day: 3,
        title: "Itaewon Mosque & N Seoul Tower Namsan",
        activities: ["Melawat Masjid Pusat Seoul di bukit Itaewon", "Makan makanan halal pelbagai negara di Itaewon", "Naik kereta kabel ke N Seoul Tower kunci cinta"],
        foodSpot: "BBQ Daging Lembu Halal Eid Restaurant Itaewon",
        dailyBudgetRM: 130,
      },
      {
        day: 4,
        title: "Hongdae Busking Youth Street & Pulang",
        activities: ["Layan persembahan jalanan belia universiti Hongdae", "Shopping baju fesyen berpatutan di Hongdae", "Balik ke Incheon Airport"],
        foodSpot: "Gimbap Sayur Segar & Roti Telur Gyeran-ppang",
        dailyBudgetRM: 75,
      },
    ],
  },
  {
    id: "taipei",
    city: "Taipei",
    country: "Taiwan",
    tier: "global",
    flag: "🇹🇼",
    tagline: "Pasar malam Shilin, Menara Taipei 101 & laluan tren Jiufen",
    vibe: ["city", "foodie", "shopping", "nature"],
    flightPriceReturnRM: 980,
    hotelPerNightRM: 190,
    foodPerDayRM: 65,
    transportPerDayRM: 40,
    currencyCode: "TWD",
    image: "https://images.unsplash.com/photo-1508248467877-aec1b08de376?auto=format&fit=crop&w=1000&q=80",
    aiReason: "Inisiatif Taiwan Muslim-Friendly sangat berjaya dengan pensijilan halal ketat di pasar malam dan stesen utama, serta bebas visa 30 hari.",
    itinerary: [
      {
        day: 1,
        title: "Tiba di Taoyuan & Mercu Tanda Taipei 101",
        activities: ["Ambil MRT Lapangan Terbang ke Taipei Main Station", "Bergambar di menara ikonik Taipei 101", "Daki Bukit Gajah (Elephant Mountain) waktu senja"],
        foodSpot: "Restoran Halal Briyani Chang / Halal Beef Noodle Muslim Chung Shan",
        dailyBudgetRM: 80,
      },
      {
        day: 2,
        title: "Pekan Lama Jiufen & Lepas Tanglung Shifen",
        activities: ["Naik tren ke Shifen tulis hajat atas tanglung kertas", "Meneroka lorong berbumbung merah Jiufen ilham anime Spirited Away", "Hirup teh oolong"],
        foodSpot: "Cendawan Bakar Kicap Rangup & Taro Ball Manis",
        dailyBudgetRM: 100,
      },
      {
        day: 3,
        title: "Masjid Besar Taipei & Pasar Malam Shilin",
        activities: ["Solat di Taipei Grand Mosque dibina tahun 1960", "Melawat Memorial Hall Chiang Kai-shek", "Cari zon makanan halal di Shilin Night Market"],
        foodSpot: "Ayam Gunting Rangup Halal & Jus Mangga Ais Taiwan",
        dailyBudgetRM: 95,
      },
      {
        day: 4,
        title: "Muzium Istana Nasional & Shopping Ximending",
        activities: ["Melihat artifak purba di National Palace Museum", "Beli biskut nanas halal bersijil di Ximending", "Penerbangan pulang"],
        foodSpot: "Dumpling Halal Steamed Dumplings & Kopi Boba Tulen",
        dailyBudgetRM: 65,
      },
    ],
  },
  {
    id: "dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    tier: "global",
    flag: "🇦🇪",
    tagline: "Burj Khalifa, safari padang pasir emas & metro automatik",
    vibe: ["city", "shopping", "heritage", "foodie"],
    flightPriceReturnRM: 1850,
    hotelPerNightRM: 260,
    foodPerDayRM: 90,
    transportPerDayRM: 55,
    currencyCode: "AED",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
    aiReason: "100% makanan halal di seluruh negara, keselamatan bertaraf dunia, visa percuma semasa ketibaan, dan pengalaman moden futuristik.",
    itinerary: [
      {
        day: 1,
        title: "Tiba di Dubai & Air Pancut Burj Khalifa",
        activities: ["Naik Dubai Metro dari Terminal 3", "Check-in hotel berdekatan Deira / Downtown", "Tonton pertunjukan air pancut muzikal Dubai Fountain"],
        foodSpot: "Shawarma Daging Asli Arab & Jus Delima Segar",
        dailyBudgetRM: 95,
      },
      {
        day: 2,
        title: "Desert Safari Padang Pasir & BBQ Camp",
        activities: ["Aktiviti meredah bukit pasir 4x4 Dune Bashing", "Menunggang unta waktu senja di padang pasir", "Makan malam BBQ di kem padang pasir"],
        foodSpot: "Bufet Kambing Mandi & Roti Khubz Panas",
        dailyBudgetRM: 140,
      },
      {
        day: 3,
        title: "Kawasan Bersejarah Al Fahidi & Gold Souk",
        activities: ["Jalan di lorong warisan kubu lama Al Fahidi", "Naik bot kayu tradisional Abra seberang Dubai Creek seringgit", "Cuci mata di Pasar Emas Gold Souk"],
        foodSpot: "Nasi Briyani Daging Unta / Kebab Kasar",
        dailyBudgetRM: 85,
      },
      {
        day: 4,
        title: "Pantai JBR Dubai Marina & Beli Kurma Coklat",
        activities: ["Lepak pantai moden JBR dengan latar kapal layar", "Borong kurma bersalut badam & coklat Bateel", "Penerbangan pulang"],
        foodSpot: "Kopi Arab Gahwa bersama buah kurma segar",
        dailyBudgetRM: 70,
      },
    ],
  },
];
