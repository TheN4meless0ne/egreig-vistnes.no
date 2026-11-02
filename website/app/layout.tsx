import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { baseUrl } from './sitemap'

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';

import NavBar from "./components/navbar";
import Footer from "./components/footer";
import ThemeFavicon from "./components/themeFavicon";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  // Only used for small labels (e.g. on /contact), so don't let it compete
  // with the hero image and body font on every first load.
  preload: false,
});

// Images and the favicon are served from Azure Blob on a separate origin, so
// warm up that connection early — the homepage hero (the LCP element) can't
// start downloading until DNS + TLS to this host are done.
const ASSET_ORIGIN = "https://egvsa001.egreig-vistnes.no";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'egreig-vistnes.no',
    template: '%s | egreig-vistnes.no',
  },
  description: 'Website of Elias Greig-Vistnes',
  icons: {
    // Just the light-mode default here — browser support for `media` on
    // favicon <link> tags is unreliable (e.g. Chrome), so the dark-mode
    // swap is done client-side; see <ThemeFavicon /> in the body below.
    icon: 'https://egvsa001.egreig-vistnes.no/egvsacontainer1/egreig-vistnes/logo/egvlogo_black.svg',
  },
  openGraph: {
    title: 'egreig-vistnes.no',
    description: 'Website of Elias Greig-Vistnes',
    url: baseUrl,
    siteName: 'egreig-vistnes.no',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href={ASSET_ORIGIN} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen items-center`}>
        <ThemeFavicon />
        <div className="w-full border-b items-center gap-6 px-4 py-4 sm:px-8 md:px-16 md:py-6"><NavBar /></div>
        <div className="w-full flex-1 flex flex-col">{children}</div>
        <footer className="w-full border-t py-6 flex-wrap">
          <div className="w-full max-w-[1512px] mx-auto"><Footer /></div>
        </footer>
	<Analytics />
	<SpeedInsights />
      </body>
    </html>
  );
}
