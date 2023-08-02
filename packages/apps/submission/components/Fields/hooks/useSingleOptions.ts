import { useFormSubmission } from "@/store/formSubmission";
import { ChangeEvent, useCallback, useEffect } from "react";

interface SingleOptionsProps {
  id: string;
  initialValue?: string[];
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

interface SingleOptionsReturn {
  handleChange: (event: ChangeEvent<HTMLSelectElement> | string) => void;
  handleOtherInput: React.ChangeEventHandler<HTMLInputElement>;
}

const useSingleOptions = ({
  id,
  setValue,
  initialValue,
}: SingleOptionsProps): SingleOptionsReturn => {
  const { updateFieldValue } = useFormSubmission();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement> | string) => {
      const value = typeof event === "string" ? event : event.target.value;

      setValue(value);
      updateFieldValue(id, value);
    },
    [id, setValue, updateFieldValue]
  );

  const handleOtherInput: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        setValue(`outro: ${event.target.value}`);
        updateFieldValue(id, [`outro: ${event.target.value}`]);
      },
      [id, setValue, updateFieldValue]
    );

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    handleChange,
    handleOtherInput,
  };
};

export default useSingleOptions;
