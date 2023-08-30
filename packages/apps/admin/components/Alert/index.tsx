"use client";

import { Alert as ChakraIcon, AlertIcon, CloseButton } from "@chakra-ui/react";
import React from "react";

import { useAlert } from "@app/store/alert";

const Alert = () => {
  const { message, type, isClosable, reset } = useAlert();

  return message ? (
    <ChakraIcon status={type}>
      <AlertIcon />
      {message}
      {isClosable && (
        <CloseButton ml="auto" right={-1} top={-1} onClick={reset} />
      )}
    </ChakraIcon>
  ) : null;
};

export default Alert;
