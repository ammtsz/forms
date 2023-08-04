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
        alignItems={"start"}
        onChange={handleChange}
        defaultChecked={initialValue === "true"}
      >
        <FieldHeader
          label={label}
          description={description}
          hasError={hasError}
          mt={0}
        />
      </Checkbox>
    </Flex>
  ) : null;
};

export default CheckboxField;
