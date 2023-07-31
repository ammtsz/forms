"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";

const Provider: React.FC<SessionProviderProps> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
