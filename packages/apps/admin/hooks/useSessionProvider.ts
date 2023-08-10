"use client";

import { BuiltInProviderType } from "next-auth/providers/index";
import {
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { useEffect, useState } from "react";

interface SessionProviderReturn {
  googleProvider?: ClientSafeProvider;
}

const useSessionProvider = (): SessionProviderReturn => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  return {
    googleProvider: providers?.google,
  };
};

export default useSessionProvider;
