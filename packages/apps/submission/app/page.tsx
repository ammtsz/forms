"use client";

import { MakeRequired } from "@/../../commons/types/global/makeRequired";
import CheckboxField from "@/components/Fields/Checkbox";
import CheckboxesField from "@/components/Fields/Checkboxes";
import DateField from "@/components/Fields/Date";
import DropdownListField from "@/components/Fields/DropdownList";
import RadioField from "@/components/Fields/Radio";
import SwitchField from "@/components/Fields/Switch";
import TextField from "@/components/Fields/Text";
import TextareaField from "@/components/Fields/Textarea";
import useSubmitForm from "@/hooks/useSubmitForm";
import { useFormSubmission } from "@/store/formSubmission";
import { Button, Heading, Text } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import React, { ReactElement, useEffect } from "react";

import {
  BasicFieldProps,
  DateFieldProps,
  FieldProps,
  OptionsFieldProps,
} from "@forms/types/interfaces/field";
import { Fields } from "@forms/utils";

import { Container, Form, Field } from "./styles";

type OptionFieldResponse = MakeRequired<
  OptionsFieldProps,
  "options" | "optionOther"
>;

interface FieldComponentsReturn {
  [key: string]: ReactElement;
}

const fieldComponents = (props: FieldProps): FieldComponentsReturn => ({
  [Fields.text]: <TextField {...(props as BasicFieldProps)} />,
  [Fields.textarea]: <TextareaField {...(props as BasicFieldProps)} />,
  [Fields.select]: <DropdownListField {...(props as OptionFieldResponse)} />,
  [Fields.checkboxes]: <CheckboxesField {...(props as OptionFieldResponse)} />,
  [Fields.radio]: <RadioField {...(props as OptionFieldResponse)} />,
  [Fields.checkbox]: <CheckboxField {...(props as BasicFieldProps)} />,
  [Fields.switch]: <SwitchField {...(props as BasicFieldProps)} />,
  [Fields.date]: <DateField {...(props as DateFieldProps)} />,
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
            <Field key={field.id}>{fieldComponents(field)[field.type]}</Field>
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
