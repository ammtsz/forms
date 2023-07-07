import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDown as ChevronDownIcon } from "react-feather";

const ActionsButton = () => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        bg="cyan.800"
        color="white"
        _hover={{ bg: "cyan.900" }}
        rightIcon={<ChevronDownIcon size={"1rem"} />}
        ml={"auto"}
      >
        Actions
      </MenuButton>
      <MenuList>
        <MenuItem>Apagar</MenuItem>
        <MenuItem>Arquivar</MenuItem>
        <MenuItem>Restaurar</MenuItem>
        <MenuItem>Mover para "principal"</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ActionsButton;
