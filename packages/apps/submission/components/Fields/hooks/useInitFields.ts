import { useFormSubmission } from "@/store/formSubmission";
import { useEffect } from "react";

import { DependsOnProps } from "@forms/types/interfaces/field";
import { isOptionTypeField } from "@forms/utils/build";

interface InitFieldsProps {
  dependsOn?: DependsOnProps;
  setVisible: (value: boolean) => void;
}

const useInitFields = ({ dependsOn, setVisible }: InitFieldsProps) => {
  const { getField, fields } = useFormSubmission();

  useEffect(() => {
    const requiredField = dependsOn && getField(dependsOn.fieldId);

    if (requiredField) {
      if (isOptionTypeField(requiredField?.type)) {
        console.log(requiredField?.value);
      }
    }

    if (requiredField) {
      const isValidValue = dependsOn.optionsValues.some((option) =>
        requiredField.value?.includes(option)
      );

      setVisible(isValidValue);
    } else {
      setVisible(true);
    }
  }, [dependsOn, fields, getField, setVisible]);
};

export default useInitFields;
