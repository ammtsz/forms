"use client";

import { Radio, RadioGroup, Flex } from "@chakra-ui/react";
import React, { useState } from "react";

import { OptionsFormProps } from "@forms/types/interfaces/field";

import useInitFields from "../hooks/useInitFields";
import useSingleOptions from "../hooks/useSingleOptions";
import FieldHeader from "../Reusable/FieldHeader";
import OtherOption from "../Reusable/OtherOption";

const RadioField: React.FC<OptionsFormProps> = ({
  dependsOn,
  description,
  id,
  isRequired,
  label,
  optionOther,
  options,
  value: initialValue,
}) => {
  const [value, setValue] = useState("");
  const [isVisible, setVisible] = useState(false);

  const hasError = isRequired && !value;

  useInitFields({
    dependsOn,
    setVisible,
  });

  const { handleChange, handleOtherInput } = useSingleOptions({
    id,
    initialValue,
    setValue,
  });

  return isVisible ? (
    <React.Fragment>
      <FieldHeader
        description={description}
        hasError={hasError}
        label={label}
      />
      <RadioGroup onChange={handleChange} mt={2}>
        <Flex flexDirection="column" gap={1}>
          {options.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
          {optionOther && <Radio value={"outro: "}>outro</Radio>}
        </Flex>
      </RadioGroup>
      {value.includes("outro: ") && (
        <OtherOption
          placeholder={optionOther.placeholder}
          handleOtherInput={handleOtherInput}
          value={value}
        />
      )}
    </React.Fragment>
  ) : null;
};

export default RadioField;
