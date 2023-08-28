"use client";

import { Switch } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

interface FieldFooterProps {
  handleCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
}

const FieldFooter: React.FC<FieldFooterProps> = ({
  handleCheckbox,
  isRequired,
}) => {
  const { t } = useTranslation();

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
      {t("commons.requiredField")}
    </Switch>
  );
};

export default FieldFooter;
