import { useState } from "react";

import { ValueProps, useFieldsBase } from "./useFieldsBase";

interface TextProps {
  id: string;
}

// TODO: fix performance - stop calling saveUpdates for all updates
const useText = ({ id }: TextProps) => {
  const [value, setValue] = useState<ValueProps>({
    label: "",
    description: "",
    isRequired: false,
    value: "",
  });

  const { handleInputChange, handleDelete, handleCheckbox } = useFieldsBase({
    id,
    value,
    setValue,
  });

  return {
    handleInputChange,
    handleCheckbox,
    handleDelete,
    value,
  };
};

export { useText };
