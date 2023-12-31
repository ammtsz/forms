"use client";

import { Spinner } from "@chakra-ui/react";
import React from "react";

import { useTranslation } from "@app/i18n/client";

interface FeedbackProps {
  isLoading?: boolean;
  errorMessage?: string;
  message?: string;
}

const Feedback: React.FC<FeedbackProps> = ({
  isLoading,
  message,
  errorMessage,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex_center h-[80vh]">
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <p className="text-xl font-medium">
          {errorMessage ||
            message ||
            `${t("feedbacks.errorToLoadPage")} ${t("feedbacks.retry")}`}
        </p>
      )}
    </div>
  );
};

export default Feedback;
