"use client";

import { Flex } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

import FormSubmission from "@app/components/Form";
import Loading from "@app/components/Loading";
import PageMessage from "@app/components/PageMessage";
import { useFormSubmission } from "@app/store/formSubmission";

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
