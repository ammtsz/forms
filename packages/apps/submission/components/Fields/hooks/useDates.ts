import { formatDate } from "@forms/utils";

import { useFormSubmission } from "@store/formSubmission";
import { useCallback, useEffect, useState } from "react";

interface TextsProps {
  id: string;
  initialValue?: string;
  max?: string;
  min?: string;
}

interface TextsReturn {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  limits: {
    max: string;
    min: string;
  };
  value: string;
}

const useDates = ({ id, initialValue, max, min }: TextsProps): TextsReturn => {
  const [value, setValue] = useState("");
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
    if (typeof initialValue === "string" && value !== initialValue) {
      setValue(initialValue);
    }
  }, [initialValue, value]);

  return {
    handleChange,
    limits,
    value,
  };
};

export default useDates;
