"use client";

import { useFormSubmission } from "@/store/formSubmission";
import { Radio, RadioGroup, Flex } from "@chakra-ui/react";
import React, { useState } from "react";

import { MakeRequired } from "@forms/types/global/makeRequired";
import { OptionsFieldProps } from "@forms/types/interfaces/field";

import useSingleOptions from "../hooks/useSingleOptions";
import useVisibleField from "../hooks/useVisibleField";
import FieldHeader from "../Reusable/FieldHeader";
import OtherOption from "../Reusable/OtherOption";

const RadioField: React.FC<
  MakeRequired<OptionsFieldProps, "options" | "optionOther">
> = ({ description, id, label, optionOther, options, value: initialValue }) => {
  const [value, setValue] = useState("");

  const { isVisible } = useVisibleField({ id });

  const { validateField } = useFormSubmission();

  const { handleChange, handleOtherInput } = useSingleOptions({
    id,
    initialValue,
    setValue,
  });

  const hasError = validateField(id);

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
