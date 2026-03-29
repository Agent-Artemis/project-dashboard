import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Dashboard | Jeff Oldroyd",
  description: "Internal project dashboard for HCIP and Augeo brands.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
