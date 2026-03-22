import type { Metadata } from "next";
import "./globals.css";

const isCapacitor = process.env.CAPACITOR_BUILD === 'true';

export const metadata: Metadata = {
  title: "MathAcademy - Master Math 4x Faster",
  description:
    "AI-powered adaptive learning platform for mathematics, reinforcement learning, and software engineering",
  icons: {
    icon: isCapacitor ? "./favicon.svg" : "/mathacademy/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased text-white">{children}</body>
    </html>
  );
}
