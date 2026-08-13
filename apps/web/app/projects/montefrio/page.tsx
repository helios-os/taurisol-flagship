import type { Metadata } from "next";
import MontefrioPage from "./MontefrioPage";

export const metadata: Metadata = {
  title: "Montefrío Olive Garden — Taurisol Pre-Due Diligence",
  description:
    "Preliminary investment and development due diligence on Taurisol's first Proof of Concept candidate: 7.6 ha and 202 olive trees near Montefrío, Granada, Andalusia.",
  alternates: {
    canonical: "https://www.taurisol.com/projects/montefrio",
    languages: { fi: "https://www.taurisol.com/fi/projects/montefrio" },
  },
};

export default function Page() {
  return <MontefrioPage lang="en" />;
}