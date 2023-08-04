"use client";

import { useFormSubmission } from "@/store/formSubmission";
import { Checkbox, Stack } from "@chakra-ui/react";
import React from "react";

import { MakeRequired } from "@forms/types/global/makeRequired";
import { OptionsFieldProps } from "@forms/types/interfaces/field";

import useMultiOptions from "../hooks/useMultiOptions";
import useVisibleField from "../hooks/useVisibleField";
import FieldHeader from "../Reusable/FieldHeader";
import OtherOption from "../Reusable/OtherOption";

const CheckboxesField: React.FC<
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

  const {
    handleChange,
    handleOtherInput,
    isChecked,
    isOthersChecked,
    items,
    others,
  } = useMultiOptions({
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
      <Stack mt={2}>
        {options.map((option) => (
          <Checkbox
            key={option.value}
            onChange={handleChange(option.value)}
            isChecked={isChecked(option.value)}
          >
            {option.label}
          </Checkbox>
        ))}
        {optionOther && (
          <Checkbox
            isChecked={isOthersChecked()}
            onChange={handleChange("others")}
          >
            outros
          </Checkbox>
        )}
      </Stack>
      {!!items.others && (
        <OtherOption
          placeholder={optionOther.placeholder}
          handleOtherInput={handleOtherInput}
          isMultiSelect
          value={others}
        />
      )}
    </React.Fragment>
  ) : null;
};

export default CheckboxesField;
