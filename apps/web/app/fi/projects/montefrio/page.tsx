import type { Metadata } from "next";
import MontefrioPage from "../../../projects/montefrio/MontefrioPage";

export const metadata: Metadata = {
  title: "Montefrío Olive Garden — Taurisol Pre-Due Diligence",
  description:
    "Alustava investointi- ja kehitys-due diligence Taurisolin ensimmäisestä Proof of Concept -kandidaatista: 7,6 ha ja 202 oliivipuuta Montefríon lähellä Granadassa, Andalusiassa.",
  alternates: {
    canonical: "https://www.taurisol.com/fi/projects/montefrio",
    languages: { en: "https://www.taurisol.com/projects/montefrio" },
  },
};

export default function Page() {
  return <MontefrioPage lang="fi" />;
}