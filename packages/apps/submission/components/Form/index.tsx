"use client";

import {
  BasicFieldProps,
  DateFieldProps,
  FieldProps,
  OptionsFieldProps,
} from "@forms/types/interfaces/field";
import { Fields } from "@forms/utils";

import FeedbackModal from "../FeedbackModal";
import { Form, Field } from "./styles";
import { MakeRequired } from "@../../commons/types/global/makeRequired";
import { Button, Heading, Text, useDisclosure } from "@chakra-ui/react";
import CheckboxField from "@components/Fields/Checkbox";
import CheckboxesField from "@components/Fields/Checkboxes";
import DateField from "@components/Fields/Date";
import DropdownListField from "@components/Fields/DropdownList";
import RadioField from "@components/Fields/Radio";
import SwitchField from "@components/Fields/Switch";
import TextField from "@components/Fields/Text";
import TextareaField from "@components/Fields/Textarea";
import useSubmitForm from "@hooks/useSubmitForm";
import { useFormSubmission } from "@store/formSubmission";
import React from "react";

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
