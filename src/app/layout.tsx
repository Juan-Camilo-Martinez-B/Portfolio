import type { Metadata } from "next";
import { Audiowide, Orbitron } from "next/font/google";
import "./globals.css";
import portfolioData from "@/data/portfolio.json";

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-audiowide",
});

const orbitron = Orbitron({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: portfolioData.seo.title,
  description: portfolioData.seo.description,
  keywords: portfolioData.seo.keywords,
  authors: [{ name: portfolioData.seo.author }],
  openGraph: {
    title: portfolioData.seo.title,
    description: portfolioData.seo.description,
    url: portfolioData.seo.url,
    siteName: portfolioData.personalInfo.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: portfolioData.seo.title,
    description: portfolioData.seo.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${audiowide.variable} ${orbitron.variable}`}>
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
