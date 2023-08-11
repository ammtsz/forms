import { useCallback } from "react";

import { useFormSubmission } from "@app/store/formSubmission";

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
    },
    [id, updateFieldValue]
  );

  return {
    handleChange,
  };
};

export default useToggles;
