"use client"

import { Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";

interface FeedbackProps {
  isLoading: boolean;
  message?: string;
}

const Feedback: React.FC<FeedbackProps> = ({ isLoading, message }) => {
  return (
    <Flex justifyContent={"center"} alignItems={"center"}>
      {isLoading ? (
        <Spinner size={"xl"} />
      ) : (
        <Text fontSize={"xl"}>
          {message || "Não foi possível carregar a página. Tente novamente."}
        </Text>
      )}
    </Flex>
  );
};

export default Feedback;
