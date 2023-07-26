import { Switch as ChakraSwitch } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const Switch = styled(ChakraSwitch)`
  span[data-disabled] {
    cursor: default;
  }
`;
