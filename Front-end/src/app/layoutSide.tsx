"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar";
import React from "react";
import { LoginContext } from "@/context/loginContext";
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
        <LoginContext>
          {!isPublicRoute && <Sidebar />}
          {children}
        </LoginContext>
      </body>
    </html>
  );
}
