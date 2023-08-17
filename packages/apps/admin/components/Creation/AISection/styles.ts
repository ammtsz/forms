import { Flex, theme, FlexProps } from "@chakra-ui/react";
import styled, { StyledComponent } from "@emotion/styled";

export const StickyForm = styled(Flex)`
  width: 100%;
  align-items: center;
  position: sticky;
  top: 70px;
  background-color: ${theme.colors.white};
  z-index: 1;
  box-shadow: inset 0px -10px 10px -10px ${theme.colors.blackAlpha["300"]};
` as StyledComponent<FlexProps>;

export const StickyButton = styled(Flex)`
  width: 100%;
  position: fixed;
  top: 70px;
  z-index: 1;
` as StyledComponent<FlexProps>;

export const Container = styled(Flex)`
  max-width: 1200px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
` as StyledComponent<FlexProps>;
