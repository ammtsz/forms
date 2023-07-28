"use client";

import { useTableData } from "@/store/tableData";
import { Button } from "@chakra-ui/react";
import { useCallback } from "react";
import { Copy as CopyIcon } from "react-feather";

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
    <Button
      aria-label="copiar tabela"
      bg={"cyan.800"}
      color="white"
      onClick={handleCopy}
      size={["sm", "sm", "md"]}
      _hover={{ bg: "cyan.900" }}
    >
      <CopyIcon height={"1.25rem"} />
    </Button>
  );
};

export default CopyButton;
