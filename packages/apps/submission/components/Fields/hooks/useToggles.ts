import { useFormSubmission } from "@/store/formSubmission";
import { useCallback } from "react";

interface TextsProps {
  id: string;
  initialValue?: string;
}

interface TextsReturn {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

const useToggles = ({ id }: TextsProps): TextsReturn => {
  const { updateFieldValue } = useFormSubmission();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      updateFieldValue(id, String(event.target.checked));

      console.log(event.target.checked, id);
    },
    [id, updateFieldValue]
  );

  return {
    handleChange,
  };
};

export default useToggles;
