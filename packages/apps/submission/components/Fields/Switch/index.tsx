"use client";

import { Flex, FormLabel, Switch } from "@chakra-ui/react";
import React, { useState } from "react";

import { BasicFieldProps } from "@forms/types/interfaces/field";

import useToggles from "../hooks/useToggles";
import useVisibleField from "../hooks/useVisibleField";
import FieldHeader from "../Reusable/FieldHeader";

const SwitchField: React.FC<BasicFieldProps> = ({
  id,
  label,
  isRequired,
  dependsOn,
  value: initialValue,
  description,
}) => {
  const [check, setCheck] = useState(false);

  const hasError = isRequired && !check;

  const { isVisible } = useVisibleField({ dependsOn });

  const { handleChange } = useToggles({
    id,
    initialValue,
    setCheck,
  });

  return isVisible ? (
    <Flex mt={16}>
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
          mt={0}
        />
      </FormLabel>
    </Flex>
  ) : null;
};

export default SwitchField;
