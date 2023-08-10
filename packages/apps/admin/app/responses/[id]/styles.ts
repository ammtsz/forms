import { Flex, FlexProps } from "@chakra-ui/react";
import styled, { StyledComponent } from "@emotion/styled";

export const Container = styled(Flex)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: top;
  min-height: 100%;
  padding: 1rem;
  padding-top: 3rem;
` as StyledComponent<FlexProps>;

export const TableContainer = styled(Flex)`
  flex-direction: columns;
` as StyledComponent<FlexProps>;
