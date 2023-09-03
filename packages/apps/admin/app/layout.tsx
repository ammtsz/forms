import type { Metadata } from "next";

import { languages } from "@app/i18n/settings";

import "./globals.css";
import ClientComponent from "./client";

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
        <ClientComponent>{children}</ClientComponent>
      </body>
    </html>
  );
};

export default RootLayout;
