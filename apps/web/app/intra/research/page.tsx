import type { Metadata } from "next";
import ResearchPage from "./ResearchPage";

export const metadata: Metadata = {
  title: "I do research — Taurisol Living Lab Intra",
};

export default function Page() {
  return <ResearchPage />;
}
