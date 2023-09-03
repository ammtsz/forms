"use client";

import type { Metadata } from "next";
import { Suspense } from "react";

import Alert from "@app/components/Alert";
import Breadcrumb from "@app/components/Breadcrumb";
import Feedback from "@app/components/Feedback";
import Navbar from "@app/components/Navbar";
import Providers from "@app/components/Providers";
import { languages } from "@app/i18n/settings";

import "./globals.css";

export const metadata: Metadata = {
  title: "Forms | Admin",
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

const RootLayout: React.FC<{
  children: React.ReactNode;
  params: { lng: string };
}> = ({ children, params: { lng } }) => {
  return (
    <html lang={lng}>
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
