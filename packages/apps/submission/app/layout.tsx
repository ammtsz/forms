import "./globals.css";
import type { Metadata } from "next";

import "../i18n";
import ClientComponent from "./client";

export const metadata: Metadata = {
  title: "Forms",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="pt-BR">
      <body>
        <ClientComponent>{children}</ClientComponent>
      </body>
    </html>
  );
};

export default RootLayout;
