import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const PageMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <Flex width="100%" h="100vh" alignItems="center" justifyContent="center">
      <Text fontSize="2xl">{message}</Text>
    </Flex>
  );
};

export default PageMessage;
