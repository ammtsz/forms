import { useFormSubmission } from "@/store/formSubmission";
import { useEffect, useState } from "react";

interface InitFieldsProps {
  id: string;
}

interface InitFieldsReturn {
  isVisible: boolean;
}

const useVisibleField = ({ id }: InitFieldsProps): InitFieldsReturn => {
  const [isVisible, setVisible] = useState(false);
  const { visibleFields, isFieldVisible } = useFormSubmission();

  useEffect(() => {
    setVisible(isFieldVisible(id));
  }, [id, visibleFields, isFieldVisible, setVisible]);

  return { isVisible };
};

export default useVisibleField;
