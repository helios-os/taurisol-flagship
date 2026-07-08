import type { Metadata } from "next";
import LivingLabPage from "../../living-lab/LivingLabPage";

export const metadata: Metadata = {
  title: "Taurisol Living Lab — Montefrío, Andalusia",
  description:
    "Paikka, johon palata. Eurooppalainen malli, jota rakentaa yhdessä. Taurisol Living Lab alkaa Montefríosta, Andalusiasta — toistettava, regeneratiivinen malli Euroopalle.",
  alternates: {
    canonical: "https://taurisol.com/fi/living-lab",
    languages: { en: "https://taurisol.com/living-lab" },
  },
};

export default function Page() {
  return <LivingLabPage lang="fi" />;
}
