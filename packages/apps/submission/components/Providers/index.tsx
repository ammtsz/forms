"use client";

import { ChakraProvider } from "@chakra-ui/react";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

export default Providers;
