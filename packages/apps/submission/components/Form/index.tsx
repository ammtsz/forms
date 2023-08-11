"use client";

import { Button, Heading, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";

import { MakeRequired } from "@forms/types/global/makeRequired";
import {
  BasicFieldProps,
  DateFieldProps,
  FieldProps,
  OptionsFieldProps,
} from "@forms/types/interfaces/field";
import { Fields } from "@forms/utils";

import CheckboxField from "@app/components/Fields/Checkbox";
import CheckboxesField from "@app/components/Fields/Checkboxes";
import DateField from "@app/components/Fields/Date";
import DropdownListField from "@app/components/Fields/DropdownList";
import RadioField from "@app/components/Fields/Radio";
import SwitchField from "@app/components/Fields/Switch";
import TextField from "@app/components/Fields/Text";
import TextareaField from "@app/components/Fields/Textarea";
import useSubmitForm from "@app/hooks/useSubmitForm";
import { useFormSubmission } from "@app/store/formSubmission";

import FeedbackModal from "../FeedbackModal";
import { Form, Field } from "./styles";

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

const FormSubmission = () => {
  const { fields, title, description } = useFormSubmission();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { handleSubmit } = useSubmitForm({ onOpen });

  return (
    <>
      <Form as="form" onSubmit={handleSubmit} mx="auto" my={[8, 8, 0, 0, 8]}>
        <Heading as="h1" fontSize="2xl" textAlign="center">
          {title.toUpperCase()}
        </Heading>
        {!!description && (
          <Text textAlign="center" mt={4}>
            {description}
          </Text>
        )}
        <React.Fragment>
          {fields.map((field) => (
            <Field key={field.id}>{fieldComponents(field)[field.type]}</Field>
          ))}
        </React.Fragment>
        {!!fields.length && (
          <>
            <Button mt={20} type="submit" bg="black" color="white">
              Enviar
            </Button>
            <Text mt={2} ml="auto" as="i" color="gray.500">
              * Campos obrigatórios
            </Text>
          </>
        )}
      </Form>
      <FeedbackModal
        isOpen={isOpen}
        onClose={onClose}
        title={"Sucesso"}
        message={"Formulário enviado com sucesso!"}
        buttonText={"Enviar novo"}
      />
    </>
  );
};

export default FormSubmission;
