import { Flex, FlexProps, theme } from "@chakra-ui/react";
import styled, { StyledComponent } from "@emotion/styled";

export const Form = styled(Flex)`
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin: ${theme.space[8]} auto;
` as StyledComponent<FlexProps>;

export const Field = styled(Flex)`
  flex-direction: column;
  width: 100%;
  text-align: left;
` as StyledComponent<FlexProps>;
