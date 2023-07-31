"use client";

import { BuiltInProviderType } from "next-auth/providers/index";
// import Image from 'next/image';
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const { data: session } = useSession();

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

  return (
    <nav className="h-16 border-b">
      <div className="flex justify-end items-center  h-100 p-4">
        {session?.user ? (
          <div className="flex gap-4">
            <button
              key={session.user.email}
              onClick={() => signOut()}
              className="primary_btn"
            >
              Sign Out
            </button>
            {session?.user.image && (
              <Image
                src={session?.user.image}
                height={37}
                width={37}
                className="rounded-full"
                alt="profile image"
              />
            )}
          </div>
        ) : (
          providers &&
          Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className="primary_btn"
            >
              Sign In
            </button>
          ))
        )}
      </div>
    </nav>
  );
};

export default Navbar;
