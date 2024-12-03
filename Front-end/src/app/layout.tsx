import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import { cn } from "@/lib/utils";
import LayoutSide from "./layoutSide";
import { Toaster } from "@/components/ui/toaster";

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
  title: "Medihome",
  description: "Trabalhando por você",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning={true}>
      <body
        className={cn(
          `min-h-screen bg-background font-sans ${geistSans.variable} ${geistMono.variable} antialiased`
        )}
      >
        <Toaster />
        <LayoutSide>{children}</LayoutSide>
      </body>
    </html>
  );
}
