"use client"

import { Switch } from "@chakra-ui/react";
import React from "react";

interface FieldFooterProps {
  handleCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FieldFooter: React.FC<FieldFooterProps> = ({ handleCheckbox }) => {
  return (
    <Switch mt="10" mr="auto" size={"sm"} onChange={handleCheckbox}>
      Campo obrigatório
    </Switch>
  );
};

export default FieldFooter;