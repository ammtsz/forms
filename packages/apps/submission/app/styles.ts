import { Flex, FlexProps, theme } from "@chakra-ui/react";
import styled, { StyledComponent }  from "@emotion/styled";

// TODO: configure chakra theme to use with emotion

export const Container = styled(Flex)`
  box-shadow: ${theme.shadows["dark-lg"]};
  padding: ${theme.space[12]};
  border-radius: ${theme.space[4]};
  background-color: ${theme.colors.whiteAlpha[900]};
  max-width: 1200px;
  margin: ${theme.space[10]} auto;
` as StyledComponent<FlexProps>;

export const Form = styled(Flex)`
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin: ${theme.space[16]} auto;
  ` as StyledComponent<FlexProps>;

export const Field = styled(Flex)`
  flex-direction: column;
  width: 100%;
  margin: ${theme.space[4]} auto;
  text-align: left;
  ` as StyledComponent<FlexProps>;