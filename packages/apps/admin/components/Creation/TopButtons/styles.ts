import { Flex, theme, FlexProps } from "@chakra-ui/react";
import styled, { StyledComponent } from "@emotion/styled";

export const Container = styled(Flex)`
  max-width: 1200px;
  justify-content: end;
  align-items: center;
  gap: ${theme.space[2]};
` as StyledComponent<FlexProps>;
