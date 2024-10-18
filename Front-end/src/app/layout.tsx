"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/sidebar";
import { usePathname } from "next/navigation";

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

const metadata: Metadata = {
  title: "Medihome",
  description: "Trabalhando por você",
};

const PUBLIC_ROUTES = ["/", "/register"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Obtem a rota atual
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname); // Verifica se a rota é pública

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          `min-h-screen bg-background font-sans ${geistSans.variable} ${geistMono.variable} antialiased`
        )}
        title="Medihome"
      >
        {!isPublicRoute && <Sidebar />}
        {children}
      </body>
    </html>
  );
}
