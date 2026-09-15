import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Traversi - Travel Versi Anda | Reverse-Budgeting Malaysia",
  description:
    "Sistem kalkulator bajet terbalik untuk belia Malaysia. Masukkan had bajet RM, sistem paparkan destinasi muat bajet siap pecahan 4 dimensi kos, semakan pasport, dan halal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ms" className={`${plusJakarta.variable} font-sans antialiased scroll-smooth`}>
      <body className="min-h-screen bg-[#fcfdfd] text-[#0f172a]">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
