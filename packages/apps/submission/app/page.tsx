"use client";

import Checkboxes from "@/components/Fields/Checkboxes";
import DropdownList from "@/components/Fields/DropdownList";
import Radio from "@/components/Fields/Radio";
import TextForm from "@/components/Fields/Text";
import useSubmitForm from "@/hooks/useSubmitForm";
import { useFormSubmission } from "@/store/formSubmission";
import { Button, Heading, Text } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import React, { ReactElement, useEffect } from "react";

import { TextFormProps, OptionsFormProps } from "@forms/types/interfaces/field";
import { Fields } from "@forms/utils";

import { Container, Form, Field } from "./styles";

interface FieldComponentsReturn {
  [key: string]: ReactElement;
}

const fieldComponents = (
  props: TextFormProps | OptionsFormProps
): FieldComponentsReturn => ({
  [Fields.text]: <TextForm {...props} />,
  [Fields.textarea]: <TextForm {...props} />,
  [Fields.select]: <DropdownList {...(props as OptionsFormProps)} />,
  [Fields.checkboxes]: <Checkboxes {...(props as OptionsFormProps)} />,
  [Fields.radio]: <Radio {...(props as OptionsFormProps)} />,
});

const FormSubmissionPage = () => {
  const { getForm, setFieldsInitialValues, fields, title, description } =
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
        <Text>{description}</Text>
        <React.Fragment>
          {fields.map((field) => (
            <Field mt={8} key={field.id}>
              {fieldComponents(field)[field.type]}
            </Field>
          ))}
        </React.Fragment>
        <Button mt={10} type="submit" bg="black" color="white">
          Enviar
        </Button>
      </Form>
    </Container>
  );
};

export default FormSubmissionPage;
