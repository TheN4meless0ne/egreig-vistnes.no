import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EGREIG-VISTNES.NO",
  description: "Next.js Frontend with Flask Backend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
