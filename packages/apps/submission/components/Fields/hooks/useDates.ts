import { useFormSubmission } from "@/store/formSubmission";
import { useCallback, useEffect, useState } from "react";

import { formatDate } from "@forms/utils/build";

interface TextsProps {
  id: string;
  initialValue?: string;
  max?: string;
  min?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

interface TextsReturn {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  limits: {
    max: string;
    min: string;
  };
}

const useDates = ({
  id,
  initialValue,
  max,
  min,
  setValue,
}: TextsProps): TextsReturn => {
  const [limits, setLimits] = useState({
    max: "",
    min: "",
  });

  const { updateFieldValue } = useFormSubmission();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      updateFieldValue(id, event.target.value);
    },
    [id, setValue, updateFieldValue]
  );

  const getLimit = useCallback((limit: string) => {
    if (limit.length <= 4) {
      const today = new Date();
      const result = today.setDate(today.getDate() + Number(limit));

      return formatDate(new Date(result).toISOString());
    }

    if (limit.length > 4) {
      return limit;
    }
  }, []);

  useEffect(() => {
    setLimits({
      max: (max && getLimit(max)) || "",
      min: (min && getLimit(min)) || "",
    });
  }, [getLimit, max, min]);

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    handleChange,
    limits,
  };
};

export default useDates;
