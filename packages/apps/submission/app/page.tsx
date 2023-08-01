"use client"

import { Button, Heading } from "@chakra-ui/react";
import React, { ReactElement, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { TextFormProps, OptionsFormProps } from "@forms/types/interfaces/field";

import SelectForm from "@/components/select";
import TextForm from "@/components/text";
import useSubmitForm from "@/hooks/useSubmitForm";
import { useFormSubmission } from "@/store/formSubmission";

import { Container, Form, Field } from "./styles";

interface FieldComponentsReturn {
  [key: string]: ReactElement;
}

const fieldComponents = (
  props: TextFormProps | OptionsFormProps
): FieldComponentsReturn => ({
  text: <TextForm {...props} />,
  select: <SelectForm {...(props as OptionsFormProps)} />,
});

const FormSubmissionPage = () => {
  const { getForm, setFieldsInitialValues, fields, title } =
    useFormSubmission();

  const { handleSubmit } = useSubmitForm();

  const searchParams = useSearchParams();

  const id = searchParams.get("id") || "7e7a952f-c85a-442a-92a9-7ee7cd15776f";

  useEffect(() => {
    if (id) {
      getForm(id);
    }
  }, [getForm, setFieldsInitialValues, id]);

  return (
    <Container>
      <Form as="form" onSubmit={handleSubmit}>
        <Heading as="h1" fontSize="lg">
          {title.toUpperCase()}
        </Heading>
        <React.Fragment>
          {fields.map((field) => (
            <Field key={field.id}>{fieldComponents(field)[field.type]}</Field>
          ))}
        </React.Fragment>
        <Button mt={10} type={"submit"} bg={"black"} color={"white"}>
          Enviar
        </Button>
      </Form>
    </Container>
  );
};

export default FormSubmissionPage;
