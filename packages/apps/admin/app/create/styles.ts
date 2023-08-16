import { Flex, theme, FlexProps } from "@chakra-ui/react";
import styled, { StyledComponent } from "@emotion/styled";

export const Container = styled(Flex)`
  background-color: ${theme.colors.whiteAlpha[900]};
  max-width: 1200px;
  justify-content: center;
  align-items: center;
  min-height: 600px;
` as StyledComponent<FlexProps>;

export const Form = styled(Flex)`
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin: ${theme.space[16]} auto;
` as StyledComponent<FlexProps>;
