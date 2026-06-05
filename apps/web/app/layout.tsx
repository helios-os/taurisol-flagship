import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Taurisol — Make your Spain dream a reality",
  description:
    "A new way to spend part of your life in Andalusia — freedom, certainty and a place to return. Without ownership, rental or maintenance worries.",
  openGraph: {
    title: "Taurisol — Make your Spain dream a reality",
    description:
      "Freedom, certainty and a place to return. A new way to live part of your year in Andalusia.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorantGaramond.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
