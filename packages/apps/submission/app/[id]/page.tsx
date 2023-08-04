"use client";

import FormSubmission from "@/components/Form";
import Loading from "@/components/Loading";
import PageMessage from "@/components/PageMessage";
import { useFormSubmission } from "@/store/formSubmission";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

import { Container } from "../styles";

const FormSubmissionPage = () => {
  const [isValidForm, setValidForm] = useState(true);

  const { getForm, title } = useFormSubmission();

  const pathname = usePathname();

  const id = pathname.split("/")[1];

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
    <Container>{title ? <FormSubmission /> : <Loading />}</Container>
  ) : (
    <PageMessage message="Formulário não encontrado" />
  );
};

export default FormSubmissionPage;
