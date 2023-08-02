import { Checkbox as ChakraCheckbox, CheckboxProps } from "@chakra-ui/react";
import styled, { StyledComponent } from "@emotion/styled";

export const Checkbox = styled(ChakraCheckbox)`
  .chakra-checkbox__control {
    margin-top: 0.4rem;
  }
` as StyledComponent<CheckboxProps>;
