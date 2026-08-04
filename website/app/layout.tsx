import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { baseUrl } from './sitemap'

import NavBar from "./components/navbar";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'egreig-vistnes.no',
    template: '%s | egreig-vistnes.no',
  },
  description: 'Website of Elias Greig-Vistnes',
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <div className="border-b items-center gap-6 px-4 py-4 sm:px-8 md:px-16 md:py-6"><NavBar /></div>
        <div className="flex-1 flex flex-col">{children}</div>
        <footer className="border-t py-6 flex-wrap"><Footer /></footer>
      </body>
    </html>
  );
}
