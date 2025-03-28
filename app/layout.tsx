import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoTop from "@/components/go-top"
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Samaa - Explore the World",
  description: "Discover breathtaking destinations and book your next adventure with Samaa.",
  openGraph: {
    title: "Samaa - Explore the World",
    description: "Your gateway to unforgettable travel experiences.",
    url: "https://samaa.com",
    siteName: "Samaa",
    images: [
      {
        url: "https://samaa.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Samaa Travel",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samaa - Explore the World",
    description: "Plan your next adventure with Samaa.",
    images: ["https://samaa.com/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <GoTop />
        <Footer />
      </body>
    </html>
  );
}
