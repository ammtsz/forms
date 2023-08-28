"use client";

import {
  Drawer,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { Filter as FilterIcon } from "react-feather";
import { useTranslation } from "react-i18next";

import DrawerBody from "./DrawerBody";
import useColumnsFilter from "./hooks";

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

  const { t } = useTranslation();

  return (
    <>
      <button className="primary_btn" onClick={handleOpen}>
        <span className="ellipsis mr-2">
          {t("responses.buttons.filterColumns")}
        </span>
        <FilterIcon size={"1rem"} />
      </button>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent minW="min(500px, 100vw)">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            {t("responses.buttons.filterColumns")}
          </DrawerHeader>
          <DrawerBody
            checkedColumns={checkedColumns}
            handleToggleAll={handleToggleAll}
            handleCheckedColumns={handleCheckedColumns}
            isAllChecked={isAllChecked}
          />
          <DrawerFooter borderTopWidth="1px">
            <button className="primary_btn" onClick={handleSave}>
              {t("commons.save")}
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ColumnsFilter;
