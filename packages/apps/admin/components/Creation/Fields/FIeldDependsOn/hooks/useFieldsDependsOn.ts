"use client";

import { useFormCreation } from "@/store/formCreation";
import { useCallback, useState } from "react";

import { DependsOnProps, FieldsType } from "@forms/types/interfaces/field";
import { isToggleTypeField } from "@forms/utils/build";

interface FieldDependsOnProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleDependsOn: (dependsOn?: DependsOnProps) => void;
}

interface FieldDependsOnReturn {
  handleCancel: () => void;
  handleFieldSelect: React.ChangeEventHandler<HTMLSelectElement>;
  handleOptionsSelect: (isChecked: boolean, value: string) => void;
  isToggleType: () => boolean;
  selectedField: string;
}

const useFieldDependsOn = ({
  setVisible,
  handleDependsOn,
}: FieldDependsOnProps): FieldDependsOnReturn => {
  const [selectedField, setSelectedField] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({});

  const { dependsOnOptions } = useFormCreation();

  const isToggleType = useCallback(() => {
    const fieldType = dependsOnOptions && dependsOnOptions[selectedField].type;
    return isToggleTypeField(fieldType as FieldsType);
  }, [dependsOnOptions, selectedField]);

  const handleFieldSelect: React.ChangeEventHandler<HTMLSelectElement> =
    useCallback((event) => {
      setSelectedField(event.target.value);
      setSelectedOptions({});
    }, []);

  const handleOptionsSelect = useCallback(
    (isChecked: boolean, value: string) => {
      const options = { ...selectedOptions, [value]: isChecked };

      const optionsValues = isToggleType()
        ? [value]
        : Object.keys(options).filter((option) => options[option]);

      handleDependsOn({
        fieldId: selectedField,
        optionsValues,
      });

      setSelectedOptions(options);
    },
    [handleDependsOn, isToggleType, selectedField, selectedOptions]
  );

  const handleCancel = useCallback(() => {
    setVisible(false);
    setSelectedField("");
    setSelectedOptions({});
    handleDependsOn();
  }, [handleDependsOn, setVisible]);

  return {
    handleCancel,
    handleFieldSelect,
    handleOptionsSelect,
    isToggleType,
    selectedField,
  };
};

export default useFieldDependsOn;
