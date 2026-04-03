import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project HQ",
  description: "Artemis Command Center",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0D0D0D] text-white antialiased">{children}</body>
    </html>
  );
}
