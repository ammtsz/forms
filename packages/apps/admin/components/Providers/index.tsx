"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider, SessionProviderProps } from "next-auth/react";

const Provider: React.FC<SessionProviderProps> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>{children}</ChakraProvider>
    </SessionProvider>
  );
};

export default Provider;
