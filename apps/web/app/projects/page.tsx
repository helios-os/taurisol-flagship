import type { Metadata } from "next";
import ProjectsPage from "./ProjectsPage";

export const metadata: Metadata = {
  title: "Projects — Taurisol Development Pipeline",
  description:
    "Taurisol projects and their development status. The first Proof of Concept candidate is the Montefrío Olive Garden in Granada, Andalusia — currently in pre-due diligence.",
  alternates: {
    canonical: "https://www.taurisol.com/projects",
    languages: { fi: "https://www.taurisol.com/fi/projects" },
  },
};

export default function Page() {
  return <ProjectsPage lang="en" />;
}