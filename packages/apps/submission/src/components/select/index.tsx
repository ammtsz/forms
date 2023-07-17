import { Select, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";

import { OptionsFormProps } from "@forms/types/interfaces/field";

import { useFormSubmission } from "@app/store/formSubmission";

const FormSelect: React.FC<OptionsFormProps> = ({
  id,
  label,
  placeholder,
  isRequired,
  options,
  dependsOn,
  description,
  value: initialValue,
}) => {
  const [value, setValue] = useState("");
  const [isVisible, setVisible] = useState(false);

  const { updateFieldValue, getField } = useFormSubmission();

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = useCallback(
    (event) => {
      setValue(event.target.value);
      updateFieldValue(id, event.target.value);
    },
    [id, updateFieldValue]
  );

  const requiredField = dependsOn && getField(dependsOn.fieldId);

  useEffect(() => {
    if (initialValue && initialValue.length) {
      setValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (requiredField) {
      const isValidValue = dependsOn.optionsId.some((validOption) =>
        requiredField.value?.includes(validOption)
      );

      setVisible(isValidValue);
    } else {
      setVisible(true);
    }
  }, [dependsOn, getField, requiredField]);

  return isVisible ? (
    <React.Fragment>
      <Text fontSize="lg">{label}</Text>
      <Text fontSize="sm" mb={2} color={"gray"}>
        {description}
      </Text>
      <Select
        required={isRequired}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        bg={"white"}
        boxShadow={"inner"}
      >
        <React.Fragment>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </React.Fragment>
      </Select>
    </React.Fragment>
  ) : null;
};

export default FormSelect;
