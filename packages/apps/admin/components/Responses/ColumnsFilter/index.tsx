"use client";

import DrawerBody from "./DrawerBody";
import useColumnsFilter from "./hooks";
import {
  Drawer,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { Filter as FilterIcon } from "react-feather";

const ColumnsFilter: React.FC = () => {
  const {
    checkedColumns,
    isOpen,
    onClose,
    handleCheckedColumns,
    handleToggleAll,
    handleSave,
    handleOpen,
    isAllChecked,
  } = useColumnsFilter();
  return (
    <>
      <button
        className="primary_btn"
        aria-label="Filtrar colunas"
        onClick={handleOpen}
      >
        <span className="ellipsis mr-2">Fitrar colunas</span>
        <FilterIcon size={"1rem"} />
      </button>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Filtrar colunas</DrawerHeader>
          <DrawerBody
            checkedColumns={checkedColumns}
            handleToggleAll={handleToggleAll}
            handleCheckedColumns={handleCheckedColumns}
            isAllChecked={isAllChecked}
          />
          <DrawerFooter borderTopWidth="1px">
            <button
              className="primary_btn"
              onClick={handleSave}
              aria-label="Salvar alterações"
            >
              Salvar
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ColumnsFilter;
