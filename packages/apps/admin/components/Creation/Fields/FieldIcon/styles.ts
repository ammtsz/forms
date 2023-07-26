import { Switch as ChakraSwitch, SwitchProps } from "@chakra-ui/react";
import styled, { StyledComponent } from "@emotion/styled";

export const Switch = styled(ChakraSwitch)`
  span[data-disabled] {
    cursor: default;
  }
` as StyledComponent<SwitchProps>;
