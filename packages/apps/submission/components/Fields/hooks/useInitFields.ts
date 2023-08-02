import { DependsOnProps } from "@/../../commons/types/interfaces/field";
import { useFormSubmission } from "@/store/formSubmission";
import { useEffect } from "react";

interface InitFieldsProps {
  dependsOn?: DependsOnProps;
  setVisible: (value: boolean) => void;
}

const useInitFields = ({ dependsOn, setVisible }: InitFieldsProps) => {
  const { getField } = useFormSubmission();

  useEffect(() => {
    const requiredField = dependsOn && getField(dependsOn.fieldId);

    if (requiredField) {
      const isValidValue = dependsOn.optionsValues.some((option) =>
        requiredField.value?.includes(option)
      );

      setVisible(isValidValue);
    } else {
      setVisible(true);
    }
  }, [dependsOn, getField, setVisible]);
};

export default useInitFields;
