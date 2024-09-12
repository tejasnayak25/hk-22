import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sanskriti Heritage Gallery",
  description: "View heritage sites on Sanskriti Heritage Gallery",
  icons: "/logo.png",
  openGraph: {
    title: "Sanskriti Heritage Gallery",
    description: "View heritage sites on Sanskriti Heritage Gallery",
    images: [{
      url: "/logo.png"
    }]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#142a31]">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#142a31] h-dvh`}
      >
        {children}
        <Script
          src="/js/anime.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
