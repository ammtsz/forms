import { useCallback, useEffect, useState } from "react";

import { useFormSubmission } from "@app/store/formSubmission";

interface TextsProps {
  id: string;
  initialValue?: string;
}

interface TextsReturn {
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value: string;
}

const useTexts = ({ id, initialValue }: TextsProps): TextsReturn => {
  const [value, setValue] = useState("");

  const { updateFieldValue } = useFormSubmission();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(event.target.value);
      updateFieldValue(id, event.target.value);
    },
    [id, setValue, updateFieldValue]
  );

  useEffect(() => {
    if (initialValue === "" && value !== initialValue) {
      setValue(initialValue);
    }
  }, [initialValue, value]);

  return {
    handleChange,
    value,
  };
};

export default useTexts;
