"use client";

import { Box, BoxProps, Flex, FlexProps, theme } from "@chakra-ui/react";
import styled, { StyledComponent } from "@emotion/styled";

export const Container = styled(Box)`
  width: 100%;

  .BaseTable {
    box-shadow: none;
  }

  .BaseTable__body {
    &::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }
    &::-webkit-scrollbar-track {
      background: ${theme.colors.blackAlpha[100]};
      box-shadow: inset 0 0 5px ${theme.colors.blackAlpha[300]};
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background: ${theme.colors.blackAlpha[300]};
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: ${theme.colors.blackAlpha[500]};
    }
  }

  .BaseTable__table-main {
    outline: none;
  }

  .BaseTable__header {
    font-weight: 600;
  }

  .BaseTable__header-row {
    background-color: ${theme.colors.blackAlpha[800]};
  }

  .BaseTable__header-cell {
    color: ${theme.colors.white};
    font-size: ${theme.fontSizes.md};
    font-weight: ${theme.fontWeights.medium};
    line-height: ${theme.lineHeights.base};
    padding: ${`0 ${theme.sizes["4"]}`};
    text-align: center;

    :hover {
      background-color: ${theme.colors.blackAlpha[900]};
    }
  }

  .BaseTable__row-cell {
    padding: 0;

    & > div {
      padding: ${`0 ${theme.sizes["4"]}`};
      height: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 100%;
    }

    &:first-of-type {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }
  }

  .BaseTable__empty-layer {
    & > div {
      height: 100%;
      padding: 0;
    }
  }

  .BaseTable__table-frozen-left {
    box-shadow: none;

    .BaseTable__row {
      background: ${theme.colors.blackAlpha[50]};
    }

    .BaseTable__header-row {
      background: ${theme.colors.blackAlpha[800]};
    }
  }
` as StyledComponent<BoxProps>;

export const TableCell = styled(Flex)`
  width: 100%;
  text-align: start;
` as StyledComponent<FlexProps>;
