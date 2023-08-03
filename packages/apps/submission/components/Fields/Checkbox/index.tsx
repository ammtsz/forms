"use client";

import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";

import { BasicFieldProps } from "@forms/types/interfaces/field";

import useInitFields from "../hooks/useInitFields";
import useToggle from "../hooks/useToggle";
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
  const [isVisible, setVisible] = useState(true);

  const hasError = isRequired && !check;

  useInitFields({
    dependsOn,
    setVisible,
  });

  const { handleChange } = useToggle({
    id,
    initialValue,
    setCheck,
  });

  return isVisible ? (
    <Flex mt={8}>
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
