import { useFormSubmission } from "@/store/formSubmission";
import { useCallback, useEffect, useState } from "react";

interface SingleOptionsProps {
  id: string;
  initialValue?: string;
}

interface SingleOptionsReturn {
  handleChange: (event: React.ChangeEvent<HTMLSelectElement> | string) => void;
  handleOtherInput: React.ChangeEventHandler<HTMLInputElement>;
  other: string;
  value: string;
}

const useSingleOptions = ({
  id,
  initialValue,
}: SingleOptionsProps): SingleOptionsReturn => {
  const [value, setValue] = useState("");
  const [other, setOther] = useState("");

  const { updateFieldValue } = useFormSubmission();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement> | string) => {
      const fieldValue = typeof event === "string" ? event : event.target.value;

      setValue(fieldValue);
      updateFieldValue(id, fieldValue === "other" ? "outro" : fieldValue);
    },
    [id, updateFieldValue]
  );

  const handleOtherInput: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        setOther(event.target.value);
        updateFieldValue(id, `outro: ${event.target.value}`);
      },
      [id, updateFieldValue]
    );

  useEffect(() => {
    if (initialValue === "" && initialValue !== value) {
      setValue(initialValue);
      setOther("");
    }
  }, [initialValue, value]);

  return {
    handleChange,
    handleOtherInput,
    other,
    value,
  };
};

export default useSingleOptions;
