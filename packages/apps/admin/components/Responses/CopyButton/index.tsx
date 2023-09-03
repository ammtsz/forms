"use client";

import { useCallback } from "react";
import { Copy as CopyIcon } from "react-feather";

import Tooltip from "@app/components/Tooltip";
import { useTranslation } from "@app/i18n/client";
import { useTableData } from "@app/store/tableData";

const CopyButton: React.FC = () => {
  const { formId } = useTableData();

  const { t } = useTranslation();

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
    <Tooltip label={t("responses.buttons.copyTable")}>
      <button
        className="primary_btn icon_btn"
        aria-label={t("responses.buttons.copyTable")}
        onClick={handleCopy}
      >
        <CopyIcon height={"1.25rem"} />
      </button>
    </Tooltip>
  );
};

export default CopyButton;
