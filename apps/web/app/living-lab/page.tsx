import type { Metadata } from "next";
import LivingLabPage from "./LivingLabPage";

export const metadata: Metadata = {
  title: "Taurisol Living Lab — Montefrío, Andalusia",
  description:
    "A place to return to. A European model to build with. The Taurisol Living Lab begins in Montefrío, Andalusia — a repeatable, regenerative model for Europe.",
  alternates: {
    canonical: "https://www.taurisol.com/living-lab",
    languages: { fi: "https://www.taurisol.com/fi/living-lab" },
  },
};

export default function Page() {
  return <LivingLabPage lang="en" />;
}
