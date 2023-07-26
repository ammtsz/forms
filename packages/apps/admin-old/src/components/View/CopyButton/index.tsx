import { Button } from "@chakra-ui/react";
import { useCallback } from "react";
import { Copy as CopyIcon } from "react-feather";

import { useTableData } from "@app/store/tableData";

const CopyButton = () => {
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
      ml="auto"
      onClick={handleCopy}
      _hover={{ bg: "cyan.900" }}
    >
      <CopyIcon />
    </Button>
  );
};

export default CopyButton;
