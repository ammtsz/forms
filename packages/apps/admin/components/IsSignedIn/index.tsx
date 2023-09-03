"use client";

import { useSession } from "next-auth/react";
import React from "react";

import Feedback from "@app/components/Feedback";
import SignInButton from "@app/components/SignInButton";
import { useTranslation } from "@app/i18n/client";

const IsSignedIn: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { data: session, status } = useSession();

  const { t } = useTranslation();

  return session?.user ? (
    children
  ) : status === "loading" ? (
    <Feedback isLoading />
  ) : (
    <main className="flex flex-col w-100 h-[80vh] max-h-[800px] justify-center items-center">
      <p className="font-bold mb-4">{t("feedbacks.loginRequired")}</p>
      <SignInButton />
    </main>
  );
};

export default IsSignedIn;
