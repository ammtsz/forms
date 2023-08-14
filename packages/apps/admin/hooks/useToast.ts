"use client";

import {
  ToastId,
  ToastProps,
  useToast as useToastChakra,
} from "@chakra-ui/react";
import { useCallback, useRef } from "react";

const useToast = () => {
  const toast = useToastChakra();
  const toastIdRef = useRef<ToastId>();

  const openToast = useCallback(
    (props: ToastProps) => {
      if (toastIdRef.current) {
        toast.close(toastIdRef.current);
      }

      toastIdRef.current = toast({
        duration: 10000,
        isClosable: true,
        variant: "subtle",
        ...props,
      });
    },
    [toast]
  );

  return { openToast, toastIdRef };
};

export default useToast;
