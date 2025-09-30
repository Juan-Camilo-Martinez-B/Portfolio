import type { Metadata } from "next";
import { Audiowide, Orbitron } from "next/font/google";
import "./globals.css";

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
  title: "Portfolio",
  description: "Portfolio con animaciones y rayos",
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
