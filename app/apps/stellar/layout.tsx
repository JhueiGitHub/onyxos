// app/apps/stellar/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stellar - File Manager",
  description: "A macOS-style file manager for Orion OS",
};

export default function StellarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full bg-background text-foreground">{children}</div>;
}
