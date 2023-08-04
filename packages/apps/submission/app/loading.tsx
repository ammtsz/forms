"use client";

import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

const Loading = () => {
  return (
    <Flex w="100%" h="80vh" justifyContent={"center"} alignItems={"center"}>
      <Spinner size={"xl"} />
    </Flex>
  );
};

export default Loading;
