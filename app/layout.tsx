import type { Metadata } from "next";
import { Space_Grotesk, Archivo } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Providers from "./providers"; 

const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" });

export const metadata: Metadata = {
  title: "Portfolio | System Architect",
  description: "Immersive 3D Interactive Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${space.variable} ${archivo.variable} font-sans antialiased selection:bg-accent-primary/30 selection:text-white bg-background text-foreground`}>
        <Providers>
          <CustomCursor />
          <SmoothScroll>{children}</SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}