"use client";

import { useFormSubmission } from "@/store/formSubmission";
import { Flex } from "@chakra-ui/react";
import React from "react";

import { BasicFieldProps } from "@forms/types/interfaces/field";

import useToggles from "../hooks/useToggles";
import useVisibleField from "../hooks/useVisibleField";
import FieldHeader from "../Reusable/FieldHeader";
import { Checkbox } from "./styles";

const CheckboxField: React.FC<BasicFieldProps> = ({
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
      <Checkbox
        alignItems="start"
        onChange={handleChange}
        isChecked={initialValue === "true"}
        fontSize="lg"
      >
        <FieldHeader
          label={label}
          description={description}
          hasError={hasError}
          isRequired={isRequired}
          isToggle
          mt={0}
        />
      </Checkbox>
    </Flex>
  ) : null;
};

export default CheckboxField;
