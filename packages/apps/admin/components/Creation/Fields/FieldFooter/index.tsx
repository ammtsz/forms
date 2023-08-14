"use client";

import { Switch } from "@chakra-ui/react";
import React from "react";

interface FieldFooterProps {
  handleCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
}

const FieldFooter: React.FC<FieldFooterProps> = ({
  handleCheckbox,
  isRequired,
}) => {
  return (
    <Switch
      fontSize={["sm", "sm", "md"]}
      mt="10"
      mr="auto"
      size={"sm"}
      onChange={handleCheckbox}
      colorScheme="telegram"
      isChecked={isRequired}
    >
      Campo obrigatório
    </Switch>
  );
};

export default FieldFooter;
