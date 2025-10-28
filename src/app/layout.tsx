import type { Metadata } from "next";
import { Audiowide, Orbitron } from "next/font/google";
import "./globals.css";
import portfolioData from "@/data/portfolio.json";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

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
    <html lang="es" className={`${audiowide.variable} ${orbitron.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  var root = document.documentElement;
                  
                  if (theme === 'system') {
                    var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    if (systemTheme === 'dark') {
                      root.classList.add('dark');
                    }
                  } else if (theme === 'dark') {
                    root.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-black text-gray-900 dark:text-white antialiased transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
