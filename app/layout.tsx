import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Traversi - Bajet Berapa Boleh Pergi Mana? | Travel DIY RM",
  description:
    "Sistem cadangan destinasi travel bajet untuk pelajar dan belia Malaysia. Masukkan bajet RM, dapatkan 3 destinasi lepas bajet siap pecahan tiket, hotel, makan & semakan halal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ms" className={`${plusJakarta.variable} font-sans antialiased scroll-smooth`}>
      <body className="min-h-screen bg-[#FBFBFA] text-stone-900">{children}</body>
    </html>
  );
}
