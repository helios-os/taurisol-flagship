import type { Metadata } from "next";
import FundingPage from "./FundingPage";

export const metadata: Metadata = {
  title: "I fund innovation — Taurisol Living Lab Intra",
};

export default function Page() {
  return <FundingPage />;
}
