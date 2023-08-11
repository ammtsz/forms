import type { Metadata } from "next";

import Navbar from "@app/components/Navbar";
import Providers from "@app/components/Providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Forms | Admin",
};

const RootLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <html lang="pt-br">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
