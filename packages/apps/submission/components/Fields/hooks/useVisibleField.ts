import { useFormSubmission } from "@/store/formSubmission";
import { useEffect, useState } from "react";

import { DependsOnProps } from "@forms/types/interfaces/field";
import { Fields } from "@forms/utils/build";

interface InitFieldsProps {
  dependsOn?: DependsOnProps;
}

interface InitFieldsReturn {
  isVisible: boolean;
}

const useVisibleField = ({ dependsOn }: InitFieldsProps): InitFieldsReturn => {
  const [isVisible, setVisible] = useState(false);
  const { getField, fields } = useFormSubmission();

  useEffect(() => {
    const requiredField = dependsOn && getField(dependsOn.fieldId);
    let isValidValue = !requiredField;

    if (requiredField && requiredField.value) {
      if (requiredField.type === Fields.checkboxes) {
        const optionsValues = JSON.parse(requiredField.value as string);

        isValidValue = dependsOn.optionsValues.some((option) =>
          optionsValues.includes(option)
        );
      } else {
        isValidValue = dependsOn.optionsValues.some(
          (option) => requiredField.value === option
        );
      }
    }

    setVisible(isValidValue);
  }, [dependsOn, fields, getField, setVisible]);

  return { isVisible };
};

export default useVisibleField;
