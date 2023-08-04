import { useFormSubmission } from "@/store/formSubmission";
import { useCallback, useEffect, useState } from "react";

interface MultiOptionsProps {
  id: string;
  initialValue?: string;
}

interface MultiOptionsReturn {
  handleChange: (value: string) => React.ChangeEventHandler<HTMLInputElement>;
  handleOtherInput: React.ChangeEventHandler<HTMLInputElement>;
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

        updateFieldValue(
          id,
          JSON.stringify([
            ...getChecked(updatedCheckboxes),
            ...(prev.others ? [others] : []),
          ])
        );

        if (value === "others" && !event.target.checked) {
          setOthers("");
        }

        return updatedCheckboxes;
      });
    },
    [id, others, updateFieldValue]
  );

  const handleOtherInput: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        setOthers(`outros: ${event.target.value}`);
        updateFieldValue(
          id,
          JSON.stringify([
            ...getChecked(items),
            `outros: ${event.target.value}`,
          ])
        );
      },
      [items, id, updateFieldValue]
    );

  useEffect(() => {
    if (initialValue === "") {
      setItems({});
    }
  }, [initialValue]);

  return {
    handleChange,
    handleOtherInput,
    items,
    others,
  };
};

export default useMultiOptions;
