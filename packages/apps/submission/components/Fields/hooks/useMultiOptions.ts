import { useCallback, useEffect, useState } from "react";

import { useTranslation } from "@app/i18n/client";
import { useFormSubmission } from "@app/store/formSubmission";

interface MultiOptionsProps {
  id: string;
  initialValue?: string;
}

interface MultiOptionsReturn {
  handleChange: (value: string) => React.ChangeEventHandler<HTMLInputElement>;
  handleOtherInput: React.ChangeEventHandler<HTMLInputElement>;
  isChecked: (value: string) => boolean;
  isOthersChecked: () => boolean;
  items: { [key: string]: boolean };
  others: string;
}

const useMultiOptions = ({
  id,
  initialValue,
}: MultiOptionsProps): MultiOptionsReturn => {
  const [others, setOthers] = useState("");
  const [items, setItems] = useState<{ [key: string]: boolean }>({});

  const { updateFieldValue } = useFormSubmission();

  const { t } = useTranslation();

  const getChecked = (options: { [key: string]: boolean }) =>
    Object.keys(options).filter((key) => options[key] && key !== "others");

  const handleChange: (
    value: string
  ) => React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (value) => (event) => {
      setItems((prev) => {
        const updatedCheckboxes = {
          ...prev,
          [value]: event.target.checked,
        };

        const shouldHaveOthers =
          (value === "others" && event.target.checked) ||
          (value !== "others" && prev.others);

        updateFieldValue(
          id,
          JSON.stringify([
            ...getChecked(updatedCheckboxes),
            ...(shouldHaveOthers
              ? [`${t("fields.others").toLocaleLowerCase()}: ${others}`]
              : []),
          ])
        );

        return updatedCheckboxes;
      });
    },
    [id, others, t, updateFieldValue]
  );

  const handleOtherInput: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        setOthers(event.target.value);
        updateFieldValue(
          id,
          JSON.stringify([
            ...getChecked(items),
            `${t("fields.others").toLocaleLowerCase()}: ${event.target.value}`,
          ])
        );
      },
      [updateFieldValue, id, items, t]
    );

  const isChecked = (value: string) => {
    return initialValue && JSON.parse(initialValue).includes(value);
  };

  const isOthersChecked = () => {
    return (
      initialValue &&
      JSON.parse(initialValue).some((value: string) =>
        /^(outros|others): /.test(value)
      )
    );
  };

  useEffect(() => {
    if (initialValue === "") {
      setItems({});
      setOthers("");
    }
  }, [initialValue]);

  return {
    handleChange,
    handleOtherInput,
    isChecked,
    isOthersChecked,
    items,
    others,
  };
};

export default useMultiOptions;
