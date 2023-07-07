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
        bg="cyan.800"
        color="white"
        onClick={handleOpen}
        rightIcon={<FilterIcon size={"1rem"} />}
        size={"sm"}
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
            <Button colorScheme="blue" onClick={handleSave}>
              Salvar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ColumnsFilter;
