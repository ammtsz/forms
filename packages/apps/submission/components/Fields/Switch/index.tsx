"use client";

import { useFormSubmission } from "@/store/formSubmission";
import { Flex, FormLabel, Switch } from "@chakra-ui/react";
import React from "react";

import { BasicFieldProps } from "@forms/types/interfaces/field";

import useToggles from "../hooks/useToggles";
import useVisibleField from "../hooks/useVisibleField";
import FieldHeader from "../Reusable/FieldHeader";

const SwitchField: React.FC<BasicFieldProps> = ({
  id,
  isRequired,
  label,
  value: initialValue,
  description,
}) => {
  const { isVisible } = useVisibleField({ id });

  const { validateField } = useFormSubmission();

  const { handleChange } = useToggles({
    id,
    initialValue,
  });

  const hasError = validateField(id);

  return isVisible ? (
    <Flex mt={16}>
      <Switch
        id={id}
        onChange={handleChange}
        isChecked={initialValue === "true"}
        mt={1}
      />
      <FormLabel htmlFor={id} ml={2}>
        <FieldHeader
          label={label}
          description={description}
          hasError={hasError}
          isRequired={isRequired}
          mt={0}
        />
      </FormLabel>
    </Flex>
  ) : null;
};

export default SwitchField;
