import type { Metadata } from "next";
import { Fraunces, Figtree } from "next/font/google";
import "./globals.css";

const isCapacitor = process.env.CAPACITOR_BUILD === "true";

const bodyFont = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MathAcademy | Daily Mastery for Math and AI",
  description:
    "AI-powered adaptive learning for mathematics, reinforcement learning, and software engineering practice.",
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
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
