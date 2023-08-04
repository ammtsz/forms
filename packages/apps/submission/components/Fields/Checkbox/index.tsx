"use client";

import { useFormSubmission } from "@/store/formSubmission";
import { Flex } from "@chakra-ui/react";
import React, { useRef } from "react";

import { BasicFieldProps } from "@forms/types/interfaces/field";

import useResetCheckedFields from "../hooks/useResetCheckedFields";
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

  const checkboxRef = useRef<HTMLDivElement>(null);

  const hasError = validateField(id);

  useResetCheckedFields({ ref: checkboxRef, initialValue });

  return isVisible ? (
    <Flex mt={16} ref={checkboxRef}>
      <Checkbox
        alignItems={"start"}
        onChange={handleChange}
        defaultChecked={initialValue === "true"}
      >
        <FieldHeader
          label={label}
          description={description}
          hasError={hasError}
          isRequired={isRequired}
          mt={0}
        />
      </Checkbox>
    </Flex>
  ) : null;
};

export default CheckboxField;
