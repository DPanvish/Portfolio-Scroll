import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Noise from "@/components/Noise";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Portfolio | Full-Stack Engineer",
  description: "Building high-performance systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased selection:bg-accent-primary/30 selection:text-white`}>
        <Noise />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}