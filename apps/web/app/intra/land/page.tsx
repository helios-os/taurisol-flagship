import type { Metadata } from "next";
import LandPage from "./LandPage";

export const metadata: Metadata = {
  title: "I have land — Taurisol Living Lab Intra",
};

export default function Page() {
  return <LandPage />;
}
