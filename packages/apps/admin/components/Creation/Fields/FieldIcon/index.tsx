"use client";

import { Box, BoxProps, SwitchProps } from "@chakra-ui/react";

import { FieldsType } from "@forms/types/interfaces/field";
import { Fields } from "@forms/utils";

import { Switch } from "./styles";

interface FieldIconProps extends BoxProps {
  type: FieldsType;
}

const FieldIcon: React.FC<FieldIconProps> = ({ type }) => {
  const RadioIcon = (props: BoxProps) => (
    <Box
      bg="white"
      border="1px solid lightgray"
      borderRadius="50%"
      boxShadow={"inner"}
      height="1rem"
      mr="0.5rem"
      transform={"translateY(8px)"}
      minWidth="1rem"
      {...props}
    />
  );

  const CheckboxIcon = (props: BoxProps) => (
    <Box
      bg="white"
      border="1px solid lightgray"
      boxShadow={"inner"}
      height="1rem"
      mr="0.5rem"
      transform={"translateY(8px)"}
      minWidth="1rem"
      {...props}
    />
  );

  const SwitchIcon = (props: SwitchProps) => (
    <Switch
      mr="0.5rem"
      transform={"translateY(8px)"}
      isDisabled
      _hover={{ cursor: "default" }}
      {...props}
    />
  );

  const renderIcon = () => {
    switch (type) {
      case Fields.checkbox:
      case Fields.checkboxes:
        return <CheckboxIcon />;
      case Fields.radio:
        return <RadioIcon />;
      case Fields.switch:
        return <SwitchIcon />;
      default:
        return null;
    }
  };

  return renderIcon();
};

export default FieldIcon;
