import type { Metadata } from "next";
import PricingPage from "../../pricing/PricingPage";

export const metadata: Metadata = {
  title: "Hinnoittelu — Taurisol-jäsenyys",
  description:
    "Taurisol-jäsenyyden hinnoittelu — pitkäaikainen, hyväksynnänvarainen jäsenmalli yrityksille, yrittäjille ja ammattimaisille toimijoille, jotka palaavat Andalusiaan vuodesta toiseen.",
  alternates: {
    canonical: "https://taurisol.com/fi/pricing",
    languages: { en: "https://taurisol.com/pricing" },
  },
};

export default function Page() {
  return <PricingPage lang="fi" />;
}
