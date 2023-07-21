import { Tooltip as ChakraTooltip } from "@chakra-ui/react";
import React from "react";

interface TooltipProps {
  children: React.ReactNode;
  hasArrow?: boolean;
  label: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  label,
  hasArrow = true,
  children,
}: TooltipProps) => {
  return (
    <ChakraTooltip
      bg="gray.600"
      color="white"
      fontWeight={400}
      label={label}
      hasArrow={hasArrow}
      borderRadius={4}
    >
      {children}
    </ChakraTooltip>
  );
};

export default Tooltip;
