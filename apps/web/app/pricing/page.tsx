import type { Metadata } from "next";
import PricingPage from "./PricingPage";

export const metadata: Metadata = {
  title: "Pricing — Taurisol Membership",
  description:
    "Taurisol Membership pricing — a long-term, approval-based membership model for companies, founders and professional entities returning to Andalusia year after year.",
  alternates: {
    canonical: "https://www.taurisol.com/pricing",
    languages: { fi: "https://www.taurisol.com/fi/pricing" },
  },
};

export default function Page() {
  return <PricingPage lang="en" />;
}
