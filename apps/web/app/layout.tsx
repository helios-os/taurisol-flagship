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

const TITLE = "Taurisol — A place to return to yourself";
const DESCRIPTION =
  "Taurisol is a small regenerative living concept in Andalusia — a place designed for energy independence, quiet rhythm and returning to yourself.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.taurisol.com"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.taurisol.com",
    siteName: "Taurisol",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/hero-andalusia.jpg",
        width: 1200,
        height: 630,
        alt: "Taurisol — Andalusian olive grove at golden hour",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/hero-andalusia.jpg"],
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
