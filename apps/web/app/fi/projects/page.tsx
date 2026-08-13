import type { Metadata } from "next";
import ProjectsPage from "../../projects/ProjectsPage";

export const metadata: Metadata = {
  title: "Hankkeet — Taurisolin kehitysputki",
  description:
    "Taurisolin hankkeet ja niiden kehitysvaihe. Ensimmäinen Proof of Concept -kandidaatti on Montefrío Olive Garden Granadassa, Andalusiassa — tällä hetkellä pre-due diligence -vaiheessa.",
  alternates: {
    canonical: "https://www.taurisol.com/fi/projects",
    languages: { en: "https://www.taurisol.com/projects" },
  },
};

export default function Page() {
  return <ProjectsPage lang="fi" />;
}