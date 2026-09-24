import type { Metadata } from "next";
import "./globals.css";
import { Inter, Oswald, Pacifico, Montserrat, Space_Grotesk, Ubuntu } from 'next/font/google';

// 1. Bold Condensed Sans-Serif (Matches "TENTANG")
const oswald = Oswald({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-oswald',
});

// 2. Script / Handwritten Style (Matches "Galaksi")
const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pacifico',
});

// 3. Clean Modern Sans-Serif (Matches "CHALLENGE UI")
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-montserrat',
});

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-ubuntu',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Ari Voss — WordPress, Shopify & Webflow developer",
  description:
    "I design and build production websites on WordPress, Shopify and Webflow — no plugin bloat, no half-finished sections.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${pacifico.variable} ${montserrat.variable} ${ubuntu.variable} ${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
      </body>
    </html>
  );
}
