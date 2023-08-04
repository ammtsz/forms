"use client";

import { useEffect } from "react";

interface ClearCheckedFieldsProps {
  ref: React.RefObject<HTMLDivElement>;
  initialValue?: string;
}

const useResetCheckedFields = ({
  ref,
  initialValue,
}: ClearCheckedFieldsProps) => {
  useEffect(() => {
    if (initialValue === "") {
      const checkedElements = ref.current?.querySelectorAll("[data-checked]");

      if (checkedElements) {
        checkedElements.forEach((element) => {
          element.removeAttribute("data-checked");
        });
      }
    }
  }, [initialValue, ref]);
};

export default useResetCheckedFields;
