"use client";

import { Flex, Spinner, Text } from "@chakra-ui/react";
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
    <Flex justifyContent={"center"} alignItems={"center"}>
      {isLoading ? (
        <Spinner size={"xl"} />
      ) : (
        <Text fontSize={"xl"}>
          {errorMessage ||
            message ||
            "Não foi possível carregar a página. Tente novamente."}
        </Text>
      )}
    </Flex>
  );
};

export default Feedback;
