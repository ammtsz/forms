"use client";

import { useFormSubmission } from "@/store/formSubmission";
import { Radio, RadioGroup, Flex } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";

import { OptionsFormProps } from "@forms/types/interfaces/field";

import useInitFields from "../hooks/useInitFields";
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

  const { updateFieldValue } = useFormSubmission();

  useInitFields({
    dependsOn,
    setVisible,
  });

  const handleChange = useCallback(
    (option: string) => {
      setValue(option);
      updateFieldValue(id, option);
    },
    [id, updateFieldValue]
  );

  const handleOtherInput: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        setValue(`outro: ${event.target.value}`);
        updateFieldValue(id, `outro: ${event.target.value}`);
      },
      [id, updateFieldValue]
    );

  useEffect(() => {
    if (initialValue && initialValue.length) {
      setValue(initialValue as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
