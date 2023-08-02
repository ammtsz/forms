"use client";

import { Checkbox, Stack } from "@chakra-ui/react";
import React, { useState } from "react";

import { MakeRequired } from "@forms/types/global/makeRequired";
import { OptionsFormProps } from "@forms/types/interfaces/field";

import useInitFields from "../hooks/useInitFields";
import useMultiOptions from "../hooks/useMultiOptions";
import FieldHeader from "../Reusable/FieldHeader";
import OtherOption from "../Reusable/OtherOption";

const CheckboxesField: React.FC<
  MakeRequired<OptionsFormProps, "options" | "optionOther">
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
  const [isVisible, setVisible] = useState(false);

  useInitFields({
    dependsOn,
    setVisible,
  });

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
