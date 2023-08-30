"use client";

import type { Metadata } from "next";
import { Suspense } from "react";

import Alert from "@app/components/Alert";
import Breadcrumb from "@app/components/Breadcrumb";
import Feedback from "@app/components/Feedback";
import Navbar from "@app/components/Navbar";
import Providers from "@app/components/Providers";

import "./globals.css";

import "../i18n";

export const metadata: Metadata = {
  title: "Forms | Admin",
};

const RootLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <html>
      <body>
        <Suspense fallback={<Feedback isLoading />}>
          <Providers>
            <Navbar />
            <Alert />
            <Breadcrumb />
            {children}
          </Providers>
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
