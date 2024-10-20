"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar";
import React from "react";

const PUBLIC_ROUTES = ["/", "/register"];

export default function LayoutSide({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  return (
    <html lang="en">
      <body>
        {!isPublicRoute && <Sidebar />}
        {children}
      </body>
    </html>
  );
}
