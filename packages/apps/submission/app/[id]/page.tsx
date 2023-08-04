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
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";

import {
  BasicFieldProps,
  DateFieldProps,
  FieldProps,
  OptionsFieldProps,
} from "@forms/types/interfaces/field";
import { Fields } from "@forms/utils";

import { Container, Form, Field } from "../styles";

type OptionFieldResponse = MakeRequired<
  OptionsFieldProps,
  "options" | "optionOther"
>;

interface FieldComponentsReturn {
  [key: string]: React.ReactElement;
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
  const { getForm, fields, title, description } = useFormSubmission();

  const { handleSubmit } = useSubmitForm();

  const router = useRouter();
  const pathname = usePathname();

  const id = pathname.split("/")[1];

  const validateId = useCallback(async () => {
    if (id) {
      const form = await getForm(id);

      if (!form) {
        router.push("/");
      }
    }
  }, [getForm, id, router]);

  useEffect(() => {
    validateId();
  }, [validateId]);

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
