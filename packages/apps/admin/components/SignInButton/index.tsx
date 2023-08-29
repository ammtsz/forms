"use client";

import { signIn } from "next-auth/react";
import { useTranslation } from "react-i18next";

import useSessionProvider from "@app/hooks/useSessionProvider";

interface SignInButtonProps {
  isPrimary?: boolean;
}

const SignInButton: React.FC<SignInButtonProps> = ({ isPrimary }) => {
  const { googleProvider } = useSessionProvider();

  const { t } = useTranslation();

  return (
    <button
      disabled={!googleProvider}
      onClick={() => signIn(googleProvider && googleProvider.id)}
      className={isPrimary ? "link_btn" : "primary_btn"}
    >
      {t("commons.login")}
    </button>
  );
};

export default SignInButton;
