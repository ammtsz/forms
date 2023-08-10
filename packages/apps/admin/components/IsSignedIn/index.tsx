"use client";

import SignInButton from "@components/SignInButton";
import { useSession } from "next-auth/react";
import React from "react";

const IsSignedIn: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { data: session } = useSession();

  return session?.user ? (
    children
  ) : (
    <main className="flex flex-col w-100 h-[80vh] max-h-[800px] justify-center items-center">
      <p className="font-bold mb-4">Faca o login para continuar</p>
      <SignInButton session={session} />
    </main>
  );
};

export default IsSignedIn;
