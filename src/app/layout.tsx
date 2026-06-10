import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/features/language-switcher/LanguageContext";
import { SmoothScrollProvider } from "@/shared/lib/smooth-scroll";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Narek Kolyan - Portfolio",
  description:
    "Portfolio website showcasing projects, CV, and interactive game",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`overflow-x-hidden ${inter.variable} ${display.variable} ${mono.variable}`}
    >
      <body className="overflow-x-hidden font-sans">
        <SmoothScrollProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
