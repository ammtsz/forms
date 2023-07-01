import SelectForm from "@app/components/select";
import TextForm from "@app/components/text";
import useSubmitForm from "@app/hooks/useSubmitForm";
import { useFormSubmission } from "@app/store/formSubmission";
import { Button, Heading } from "@chakra-ui/react";
import { TextFormProps, OptionsFormProps } from "@forms/types/interfaces/field";
import React, { ReactElement, useEffect } from "react";
import { useLocation } from "react-router-dom";

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

  const { search } = useLocation();
  const id =
    new URLSearchParams(search).get("id") ||
    "4d822f21-836e-4fdf-8632-4b92ff728b0a";

  useEffect(() => {
    if (id) {
      getForm(id);
    }
  }, [getForm, setFieldsInitialValues, id]);

  return (
    <Container>
      <Form as="form" onSubmit={handleSubmit}>
        <Heading as="h1" fontSize={"lg"}>
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
