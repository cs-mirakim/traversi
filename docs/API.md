# API.md - Traversi Endpoints

## POST /api/recommend
Input:
```json
{
  "budget": 2500,
  "days": 4,
  "pax": 1,
  "from": "KUL",
  "vibe": ["Beach", "Halal Food"]
}
```

Logic:
1. Check Supabase destinations_cache
2. If miss, hit Amadeus flight price + Gemini estimate hotel/food/transport per city
3. Overpass halal count + passport-visa-api visa check
4. Calculate total = flight*pax + ceil(pax/2)*hotel*(days-1) + food*pax*days + transport*ceil(pax/2)*days
5. Filter total <= budget, sort best value
6. Save to searches table for trending
7. Return top 3

Output:
```json
{
  "destinations": [
    {
      "city": "Bali (Ubud & Kuta)",
      "country": "Indonesia",
      "countryCode": "ID",
      "iata": "DPS",
      "total": 1430,
      "budget": 2500,
      "saving": 1070,
      "breakdown": { "flight": 550, "hotel": 480, "food": 200, "transport": 200 },
      "visa": { "type": "visa-free", "days": 30 },
      "halal": { "count": 85, "score": "Senang Didapati", "sentiment": "Banyak nasi padang halal RM8-12" },
      "currency": "10,000 IDR = RM2.82",
      "reason": "Paling fleksibel untuk santai alam di Ubud atau pantai di Canggu",
      "image": "/images/bali.jpg",
      "bookingLinks": {
        "flight": "https://www.airasia.com/flights/KUL/DPS",
        "hotel": "https://www.booking.com/city/id/bali.html",
        "skyscanner": "https://www.skyscanner.com.my/routes/kulm/dps/kuala-lumpur-to-denpasar.html"
      }
    }
  ]
}
```

## GET /api/flight?origin=KUL&destination=DPS
Wrapper Amadeus test + cache Supabase flight_cache. Return price RM. Save cache 7 days.

## POST /api/estimate
Input: { city: "Bali" }
Gemini prompt: "Estimate hotel per night, food per day, transport per day for backpacker in Bali in RM, return JSON"
Return: { hotel: 120, food: 50, transport: 40 }

## GET /api/trending
Return top 5 searches from searches table group by city count.

## Halal Logic
GET https://overpass-api.de/api/interpreter?data=[out:json];node["diet:halal"="yes"](around:5000, lat, lon);out count;

## Visa Logic
Use salamwaddah/passport-visa-api:
```php
$passport = Passport::make('my')->get();
$visaFree = $passport->listVisaFree(); // 180 countries
```

## Bilingual
locales/bm.json & en.json manual, not auto translate.
BM santai: "Kau ada RM2500, boleh pergi Bali 4 hari, siap makan halal senang cari"
EN: "With RM2500, you can explore Bali for 4 days with easy halal access"
