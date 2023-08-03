"use client";

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
  dependsOn,
  description,
  id,
  isRequired,
  label,
  optionOther,
  options,
  value: initialValue,
}) => {
  const { isVisible } = useVisibleField({ dependsOn });

  const { getChecked, handleChange, handleOtherInput, items, others } =
    useMultiOptions({ id, initialValue });

  const hasError = isRequired && !getChecked(items).length;

  return isVisible ? (
    <React.Fragment>
      <FieldHeader
        description={description}
        hasError={hasError}
        label={label}
      />
      <Stack mt={2}>
        {options.map((option) => (
          <Checkbox key={option.value} onChange={handleChange(option.value)}>
            {option.label}
          </Checkbox>
        ))}
        {optionOther && (
          <Checkbox onChange={handleChange("others")}>outros</Checkbox>
        )}
      </Stack>
      {!!items.others && (
        <OtherOption
          placeholder={optionOther.placeholder}
          handleOtherInput={handleOtherInput}
          value={others}
          isMultiSelect
        />
      )}
    </React.Fragment>
  ) : null;
};

export default CheckboxesField;