import { useFormSubmission } from "@/store/formSubmission";
import { useCallback, useEffect } from "react";

interface TextsProps {
  id: string;
  initialValue?: string;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TextsReturn {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

const useToggles = ({
  id,
  initialValue,
  setCheck,
}: TextsProps): TextsReturn => {
  const { updateFieldValue } = useFormSubmission();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setCheck(event.target.checked);
      updateFieldValue(id, String(event.target.checked));
    },
    [id, setCheck, updateFieldValue]
  );

  useEffect(() => {
    setCheck(initialValue === "true");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    handleChange,
  };
};

export default useToggles;
