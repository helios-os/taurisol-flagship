import type { Metadata } from "next";
import MontefrioDueDiligencePage from "../../../../projects/montefrio/due-diligence/MontefrioDueDiligencePage";

export const metadata: Metadata = {
  title: "Montefrío Pre-Due Diligence — Taurisol",
  description: "Taurisolin Montefrío Proof of Concept -kandidaatin täysi strukturoitu Pre-Due Diligence.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.taurisol.com/fi/projects/montefrio/due-diligence", languages: { en: "https://www.taurisol.com/projects/montefrio/due-diligence" } },
};

export default function Page() {
  return <MontefrioDueDiligencePage lang="fi" />;
}