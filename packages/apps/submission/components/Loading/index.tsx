import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

const Loading = () => {
  return (
    <Flex flexGrow={1} h="60vh" justifyContent="center" alignItems="center">
      <Spinner size={"xl"} />
    </Flex>
  );
};

export default Loading;
