import { useDisclosure } from "@chakra-ui/react";
import { useCallback, useState } from "react";

import { useTableData } from "@app/store/tableData";

const useColumnsFilter = () => {
  const [checkedColumns, setCheckedColumns] = useState<{
    [key: string]: boolean;
  }>({});

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fields, filterColumns, filteredFields } = useTableData();

  const isAllChecked = useCallback(() => {
    return (
      Object.keys(checkedColumns).filter((fieldId) => checkedColumns[fieldId])
        .length === fields.length
    );
  }, [checkedColumns, fields.length]);

  const handleCheckedColumns = useCallback(
    (fieldId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedColumns((prev) => ({
        ...prev,
        [fieldId]: event.target.checked,
      }));
    },
    []
  );

  const handleToggleAll = useCallback(() => {
    const checked = {};

    fields.forEach((field, index) => {
      checked[field.id] = index === 0 || !isAllChecked();
    });

    setCheckedColumns(checked);
  }, [fields, isAllChecked]);

  const handleSave = useCallback(() => {
    const ids = Object.keys(checkedColumns).filter((id) => checkedColumns[id]);

    filterColumns(ids);
    onClose();
  }, [checkedColumns, filterColumns, onClose]);

  const handleOpen = useCallback(() => {
    const checked = {};
    filteredFields.forEach((field) => (checked[field.id] = true));
    setCheckedColumns(checked);

    onOpen();
  }, [filteredFields, onOpen]);

  return {
    checkedColumns,
    isOpen,
    onClose,
    handleCheckedColumns,
    handleToggleAll,
    handleSave,
    handleOpen,
    isAllChecked,
  };
};

export default useColumnsFilter;
