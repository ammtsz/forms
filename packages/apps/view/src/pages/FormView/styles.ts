import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";

// TODO: configure chakra theme to use with emotion

export const Container = styled(Flex)`
  justify-content: center;
  flex-direction: column;
  align-items: top;
  min-height: 100%;
  padding: 1rem;
`;

export const TableContainer = styled(Flex)`
  flex-direction: columns;
`;
