"use client";

import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";

import { BasicFieldProps } from "@forms/types/interfaces/field";

import useToggle from "../hooks/useToggle";
import useVisibleField from "../hooks/useVisibleField";
import FieldHeader from "../Reusable/FieldHeader";
import { Checkbox } from "./styles";

const CheckboxField: React.FC<BasicFieldProps> = ({
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

  const { handleChange } = useToggle({
    id,
    initialValue,
    setCheck,
  });

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
