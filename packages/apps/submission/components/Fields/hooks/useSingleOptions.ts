import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useFormSubmission } from "@app/store/formSubmission";

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

  const { t } = useTranslation();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement> | string) => {
      const fieldValue = typeof event === "string" ? event : event.target.value;

      setValue(fieldValue);
      updateFieldValue(
        id,
        fieldValue === "other"
          ? t("fields.other").toLocaleLowerCase()
          : fieldValue
      );
    },
    [id, t, updateFieldValue]
  );

  const handleOtherInput: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        setOther(event.target.value);
        updateFieldValue(
          id,
          `${t("fields.other").toLocaleLowerCase()}: ${event.target.value}`
        );
      },
      [id, t, updateFieldValue]
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
