"use client";

import { useFormSubmission } from "@/store/formSubmission";
import { Flex, FormLabel, Switch } from "@chakra-ui/react";
import React, { useRef } from "react";

import { BasicFieldProps } from "@forms/types/interfaces/field";

import useResetCheckedFields from "../hooks/useResetCheckedFields";
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

  const switchRef = useRef<HTMLDivElement>(null);

  const hasError = validateField(id);

  useResetCheckedFields({ ref: switchRef, initialValue });

  return isVisible ? (
    <Flex mt={16} ref={switchRef}>
      <Switch
        id={id}
        onChange={handleChange}
        defaultChecked={initialValue === "true"}
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
