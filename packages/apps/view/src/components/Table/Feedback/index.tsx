import { Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";

interface FeedbackProps {
  isLoading: boolean;
}

const Feedback: React.FC<FeedbackProps> = ({ isLoading }) => {
  return (
    <Flex justifyContent={"center"} alignItems={"center"}>
      {isLoading ? (
        <Spinner size={"xl"} />
      ) : (
        <Text fontSize={"xl"}>Nenhuma resposta encontrada</Text>
      )}
    </Flex>
  );
};

export default Feedback;
