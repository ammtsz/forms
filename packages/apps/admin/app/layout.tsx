import "./globals.css";
import Providers from "@/components/Providers";
import type { Metadata } from "next";
// import { lazy } from "react";
// const Navbar = lazy(() => import("auth/Navbar"));
// import dynamic from "next/dynamic";
// const Navbar = dynamic(import("auth/Navbar"), { ssr: false });

export const metadata: Metadata = {
  title: "Forms Admin",
};

const RootLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <html lang="pt-br">
      <body>
        {/* <Navbar /> */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
