"use client";

import "./globals.css";
import type { Metadata } from "next";

import Providers from "@app/components/Providers";

import "../i18n";

export const metadata: Metadata = {
  title: "Forms",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
