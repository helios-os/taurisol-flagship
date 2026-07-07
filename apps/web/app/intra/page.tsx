import type { Metadata } from "next";
import IntraHome from "./IntraHome";

export const metadata: Metadata = {
  title: "Taurisol Living Lab — Private Intra",
  description:
    "The Taurisol Living Lab private Intra — a quiet collaboration space for approved early partners.",
};

export default function Page() {
  return <IntraHome />;
}
