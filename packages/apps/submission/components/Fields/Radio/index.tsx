"use client";

import { MakeRequired } from "@forms/types/global/makeRequired";
import { OptionsFieldProps } from "@forms/types/interfaces/field";

import useSingleOptions from "../hooks/useSingleOptions";
import useVisibleField from "../hooks/useVisibleField";
import FieldHeader from "../Reusable/FieldHeader";
import OtherOption from "../Reusable/OtherOption";
import { Radio, RadioGroup, Flex } from "@chakra-ui/react";
import { useFormSubmission } from "@store/formSubmission";
import React from "react";

const RadioField: React.FC<
  MakeRequired<OptionsFieldProps, "options" | "optionOther">
> = ({
  description,
  id,
  isRequired,
  label,
  optionOther,
  options,
  value: initialValue,
}) => {
  const { isVisible } = useVisibleField({ id });

  const { validateField } = useFormSubmission();

  const { handleChange, handleOtherInput, other, value } = useSingleOptions({
    id,
    initialValue,
  });

  const hasError = validateField(id);

  return isVisible ? (
    <React.Fragment>
      <FieldHeader
        description={description}
        hasError={hasError}
        isRequired={isRequired}
        label={label}
      />
      <RadioGroup onChange={handleChange} mt={2} value={value}>
        <Flex flexDirection="column" gap={1}>
          {options.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
          {optionOther.isVisible && <Radio value="other">outro</Radio>}
        </Flex>
      </RadioGroup>
      {value === "other" && (
        <OtherOption
          placeholder={optionOther.placeholder}
          handleOtherInput={handleOtherInput}
          value={other}
        />
      )}
    </React.Fragment>
  ) : null;
};

export default RadioField;
