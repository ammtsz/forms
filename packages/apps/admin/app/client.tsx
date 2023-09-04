"use client";

import { Suspense } from "react";

import Alert from "@app/components/Alert";
import Breadcrumb from "@app/components/Breadcrumb";
import Feedback from "@app/components/Feedback";
import Navbar from "@app/components/Navbar";
import Providers from "@app/components/Providers";

const ClientComponent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Suspense fallback={<Feedback isLoading />}>
      <Providers>
        <Navbar />
        <Alert />
        <Breadcrumb />
        {children}
      </Providers>
    </Suspense>
  );
};

export default ClientComponent;
