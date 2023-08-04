import { useFormSubmission } from "@/store/formSubmission";
import { useCallback, useEffect, useState } from "react";

interface SingleOptionsProps {
  id: string;
  initialValue?: string;
}

interface SingleOptionsReturn {
  handleChange: (event: React.ChangeEvent<HTMLSelectElement> | string) => void;
  handleOtherInput: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
}

const useSingleOptions = ({
  id,
  initialValue,
}: SingleOptionsProps): SingleOptionsReturn => {
  const [value, setValue] = useState("");

  const { updateFieldValue } = useFormSubmission();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement> | string) => {
      const fieldValue = typeof event === "string" ? event : event.target.value;

      setValue(fieldValue);
      updateFieldValue(id, fieldValue);
    },
    [id, setValue, updateFieldValue]
  );

  const handleOtherInput: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        setValue(`outro: ${event.target.value}`);
        updateFieldValue(id, `outro: ${event.target.value}`);
      },
      [id, setValue, updateFieldValue]
    );

  useEffect(() => {
    if (typeof initialValue === "string" && value !== initialValue) {
      setValue(initialValue);
    }
  }, [initialValue, value]);

  return {
    handleChange,
    handleOtherInput,
    value,
  };
};

export default useSingleOptions;
