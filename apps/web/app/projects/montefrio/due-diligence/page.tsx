import type { Metadata } from "next";
import MontefrioDueDiligencePage from "./MontefrioDueDiligencePage";

export const metadata: Metadata = {
  title: "Montefrío Pre-Due Diligence — Taurisol",
  description: "The full structured Pre-Due Diligence for Taurisol's Montefrío Proof of Concept candidate.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.taurisol.com/projects/montefrio/due-diligence", languages: { fi: "https://www.taurisol.com/fi/projects/montefrio/due-diligence" } },
};

export default function Page() {
  return <MontefrioDueDiligencePage lang="en" />;
}