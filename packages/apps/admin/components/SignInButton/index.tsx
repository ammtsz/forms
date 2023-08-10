"use client";

import useSessionProvider from "@hooks/useSessionProvider";
import { UserSession } from "@types";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";

interface SignInButtonProps {
  session: UserSession | null;
  isPrimary?: boolean;
}

const SignInButton: React.FC<SignInButtonProps> = ({ session, isPrimary }) => {
  const { googleProvider } = useSessionProvider();

  return session?.user ? (
    <div className="flex gap-4">
      <button
        key={session.user.email}
        onClick={() => signOut()}
        className="tertiary_btn"
      >
        Sair
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
    <button
      disabled={!googleProvider}
      onClick={() => signIn(googleProvider && googleProvider.id)}
      className={isPrimary ? "tertiary_btn" : "primary_btn"}
    >
      Entrar
    </button>
  );
};

export default SignInButton;
