"use client";

import FormSubmission from "@/components/Form";
import Loading from "@/components/Loading";
import PageMessage from "@/components/PageMessage";
import { useFormSubmission } from "@/store/formSubmission";
import { Flex } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const FormSubmissionPage = () => {
  const [isValidForm, setValidForm] = useState(true);

  const { getForm, title } = useFormSubmission();

  const id = usePathname().split("/")[1];

  const validateId = useCallback(async () => {
    if (id) {
      const form = await getForm(id);
      setValidForm(!!form);
    }
  }, [getForm, id]);

  useEffect(() => {
    validateId();
  }, [validateId]);

  return isValidForm ? (
    <Flex
      bg="whiteAlpha.900"
      borderRadius={["", "none", "3xl"]}
      boxShadow={["none", "none", "dark-lg"]}
      maxW={"1200px"}
      mx={["2vw", "5vw", "5vw", "10vw", "auto"]}
      my="10"
      p={["10", "10", "24"]}
    >
      {title ? <FormSubmission /> : <Loading />}
    </Flex>
  ) : (
    <PageMessage message="Formulário não encontrado" />
  );
};

export default FormSubmissionPage;
