"use client";

import { useFormSubmission } from "@/store/formSubmission";
import { Checkbox, Stack } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";

import { OptionsFormProps } from "@forms/types/interfaces/field";

import useInitFields from "../hooks/useInitFields";
import FieldHeader from "../Reusable/FieldHeader";
import OtherOption from "../Reusable/OtherOption";

const CheckboxesField: React.FC<OptionsFormProps> = ({
  dependsOn,
  description,
  id,
  isRequired,
  label,
  optionOther,
  options,
  value: initialValue,
}) => {
  const [others, setOthers] = useState("");
  const [isVisible, setVisible] = useState(false);
  const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({});

  const { updateFieldValue } = useFormSubmission();

  useInitFields({
    dependsOn,
    setVisible,
  });

  const getChecked = (options: { [key: string]: boolean }) =>
    Object.keys(options).filter((key) => options[key] && key !== "others");

  const handleChange: (
    value: string
  ) => React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (value) => (event) => {
      setCheckboxes((prev) => {
        const updatedCheckboxes = {
          ...prev,
          [value]: event.target.checked,
        };

        updateFieldValue(id, [
          ...getChecked(updatedCheckboxes),
          ...(prev.others ? [others] : []),
        ]);

        if (value === "others" && !event.target.checked) {
          setOthers("");
        }

        return updatedCheckboxes;
      });
    },
    [id, others, updateFieldValue]
  );

  const handleOtherInput: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        setOthers(`outros: ${event.target.value}`);
        updateFieldValue(id, [
          ...getChecked(checkboxes),
          `outros: ${event.target.value}`,
        ]);
      },
      [checkboxes, id, updateFieldValue]
    );

  useEffect(() => {
    if (initialValue && Array.isArray(initialValue)) {
      const initialValueObject = {};

      initialValue.forEach((value) => {
        initialValueObject[value] = true;
      });

      setCheckboxes(initialValueObject);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasError = isRequired && !getChecked(checkboxes).length;

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
      {!!checkboxes.others && (
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
