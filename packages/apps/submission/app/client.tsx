"use client";

import Providers from "@app/components/Providers";

import "../i18n";

const ClientComponent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Providers>{children}</Providers>;
};

export default ClientComponent;
