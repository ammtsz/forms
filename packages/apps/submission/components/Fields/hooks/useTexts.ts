import { useFormSubmission } from "@/store/formSubmission";
import { useCallback, useEffect } from "react";

interface TextsProps {
  id: string;
  initialValue?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

interface TextsReturn {
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const useTexts = ({ id, initialValue, setValue }: TextsProps): TextsReturn => {
  const { updateFieldValue } = useFormSubmission();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(event.target.value);
      updateFieldValue(id, event.target.value);
    },
    [id, setValue, updateFieldValue]
  );

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    handleChange,
  };
};

export default useTexts;
