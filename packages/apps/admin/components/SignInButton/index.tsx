"use client";

import { signIn } from "next-auth/react";

import useSessionProvider from "@app/hooks/useSessionProvider";
import { useTranslation } from "@app/i18n/client";

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
