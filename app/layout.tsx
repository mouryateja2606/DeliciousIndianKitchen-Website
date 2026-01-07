import type { Metadata, Viewport } from "next";
import { Outfit, Great_Vibes } from "next/font/google"; // Import Great Vibes
import "./globals.css";
// import { SmoothScroller } from "@/components/layout/SmoothScroller";
import { Navigation } from "@/components/layout/Navigation";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  title: "Delicious Indian Kitchen | Authentic Indian Restaurant in Bremen",
  description: "Experience the best authentic Indian cuisine in Bremen. Serving Biryani, Tandoori, and Curries. Halal meat, vegetarian options, and online table reservation available.",
  keywords: ["Indian Restaurant Bremen", "Delicious Indian Kitchen", "Bremen Food", "Authentic Indian", "Biryani Bremen", "Halal Restaurant Bremen", "Hulsberg 139"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${greatVibes.variable} antialiased bg-black text-white selection:bg-gold selection:text-black`}
      >
        <LanguageProvider>
          {/* <SmoothScroller> */}
          <Navigation />
          {children}
          {/* </SmoothScroller> */}
        </LanguageProvider>
      </body>
    </html>
  );
}
