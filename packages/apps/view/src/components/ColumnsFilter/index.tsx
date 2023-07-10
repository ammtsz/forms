import {
  Drawer,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from "@chakra-ui/react";
import { Filter as FilterIcon } from "react-feather";

import DrawerBody from "./DrawerBody";
import useColumnsFilter from "./hooks";

const ColumnsFilter = () => {
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
      <Button
        aria-label="Filtrar colunas"
        bg="cyan.800"
        color="white"
        onClick={handleOpen}
        rightIcon={<FilterIcon size={"1rem"} />}
        width={"auto"}
        _hover={{ bg: "cyan.900" }}
      >
        Fitrar colunas
      </Button>
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
            <Button
              colorScheme="blue"
              onClick={handleSave}
              aria-label="Salvar alterações"
            >
              Salvar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ColumnsFilter;
