"use client";

import { useCallback } from "react";
import { Copy as CopyIcon } from "react-feather";

import { useTableData } from "@app/store/tableData";

const CopyButton: React.FC = () => {
  const { formId } = useTableData();

  const handleCopy = useCallback(() => {
    const el = document.getElementById(formId) as HTMLElement;

    if (document.createRange && window.getSelection) {
      const range = document.createRange();
      const sel = window.getSelection() as Selection;
      sel.removeAllRanges();
      range.selectNodeContents(el);
      sel.addRange(range);

      document.execCommand("copy");
    }
  }, [formId]);

  return (
    <button
      className="primary_btn icon_btn"
      aria-label="copiar tabela"
      onClick={handleCopy}
    >
      <CopyIcon height={"1.25rem"} />
    </button>
  );
};

export default CopyButton;
