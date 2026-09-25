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
  title: "Kashaf Jabeen | WordPress Developer",
  description:
    "Kashaf Jabeen designs and builds fast, responsive WordPress websites for businesses, startups, agencies, and growing brands.",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Kashaf Jabeen | WordPress Developer',
    description: 'Fast, thoughtful WordPress websites designed and built for businesses, startups, agencies, and growing brands.',
    type: 'website',
  },
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
