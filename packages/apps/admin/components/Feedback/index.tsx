"use client";

import { Spinner } from "@chakra-ui/react";
import React from "react";

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
  return (
    <div className="flex_center h-[80vh]">
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <p className="text-xl font-medium">
          {errorMessage ||
            message ||
            "Não foi possível carregar a página. Tente novamente."}
        </p>
      )}
    </div>
  );
};

export default Feedback;
