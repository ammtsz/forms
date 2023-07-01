// import React, { useCallback, useEffect, useState } from "react"
import { Input, Text } from "@chakra-ui/react";
import React from "react";

import { TextFormProps } from "@forms/types/interfaces/field";

import { useFormSubmission } from "@app/store/formSubmission";

const TextForm: React.FC<TextFormProps> = ({
  id,
  label,
  placeholder,
  required,
  dependsOn,
  value: intitialValue,
  description,
}) => {
  const [value, setValue] = React.useState("");
  const [isVisible, setVisible] = React.useState(true);

  const { updateFieldValue, getField } = useFormSubmission();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback(
      (event) => {
        setValue(event.target.value);
        updateFieldValue(id, event.target.value);
      },
      [id, updateFieldValue]
    );

  const requiredField = dependsOn && getField(dependsOn.fieldId);

  React.useEffect(() => {
    if (intitialValue && intitialValue.length) {
      setValue(intitialValue);
    }
  }, [intitialValue]);

  React.useEffect(() => {
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
      <Input
        required={required}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        bg={"white"}
        boxShadow={"inner"}
      />
    </React.Fragment>
  ) : null;
};

export default TextForm;
