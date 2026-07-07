import type { Metadata } from "next";
import { LangProvider } from "@/components/lang-context";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function IntraLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LangProvider>{children}</LangProvider>;
}
