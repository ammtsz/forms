import { Flex, FlexProps } from "@chakra-ui/react";
import styled, { StyledComponent } from "@emotion/styled";

// TODO: configure chakra theme to use with emotion

export const Container = styled(Flex)`
  justify-content: center;
  flex-direction: column;
  align-items: top;
  min-height: 100%;
  padding: 1rem;
` as StyledComponent<FlexProps>;

export const TableContainer = styled(Flex)`
  flex-direction: columns;
` as StyledComponent<FlexProps>;
