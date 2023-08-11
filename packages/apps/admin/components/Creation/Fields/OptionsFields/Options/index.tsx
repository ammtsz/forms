"use client";

import {
  Input,
  Flex,
  Button,
  Text,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { X as XIcon } from "react-feather";

import {
  FieldsType,
  OptionOtherProps,
  OptionProps,
} from "@forms/types/interfaces/field";

import Tooltip from "@app/components/Tooltip";

import FieldIcon from "../../FieldIcon";
import { ValueProps } from "../../hooks/useOptions";

interface FieldOptionsProps {
  handleAddOption: React.MouseEventHandler<HTMLButtonElement>;
  handleOptionChange: React.FormEventHandler<HTMLInputElement>;
  handleDeleteOption: React.MouseEventHandler<HTMLButtonElement>;
  toggleOtherOption: React.MouseEventHandler<HTMLButtonElement>;
  handleOtherOption: React.FormEventHandler<HTMLInputElement>;
  fieldErrors: string[] | null;
  value: ValueProps;
  type: FieldsType;
}

const FieldOptions: React.FC<FieldOptionsProps> = ({
  handleAddOption,
  handleOptionChange,
  handleDeleteOption,
  toggleOtherOption,
  handleOtherOption,
  fieldErrors,
  type,
  value,
}) => {
  const getOptionError = useCallback(
    (index: number) =>
      !!(fieldErrors && fieldErrors.includes(`options--${index}`)),
    [fieldErrors]
  );

  return (
    <>
      {(value.options as OptionProps[]).map(({ label }, index) => (
        <Flex key={index} alignItems="center">
          <FieldIcon type={type} />
          <FormControl
            isInvalid={getOptionError(index)}
            mb={getOptionError(index) ? 2 : 0}
          >
            <Input
              mt="3"
              fontSize={["sm", "sm", "md"]}
              name={`${index}--option`}
              onChange={handleOptionChange}
              placeholder="Adicione uma opção"
              value={label}
              variant="flushed"
            />
            {getOptionError(index) && (
              <FormErrorMessage mt={0} fontSize={["xs", "xs", "sm"]}>
                Campo obrigatório
              </FormErrorMessage>
            )}
          </FormControl>
          <Tooltip hasArrow label="Apagar opção">
            <Button
              bg="transparent"
              color="blackAlpha.700"
              data-index={index}
              ml="auto"
              onClick={handleDeleteOption}
              py="3"
              _hover={{ backgroundColor: "transparent", color: "red.700" }}
            >
              <XIcon />
            </Button>
          </Tooltip>
        </Flex>
      ))}
      <Button
        bg="transparent"
        fontSize={["sm", "sm", "md"]}
        mr="auto"
        mt="3"
        onClick={handleAddOption}
      >
        + Adicionar opção
      </Button>
      {(value.optionOther as OptionOtherProps).isVisible ? (
        <>
          <Flex alignItems="center">
            <FieldIcon type={type} />
            <Text mt="3" mr="auto" fontSize={["xs", "xs", "sm"]}>
              Outro
            </Text>
          </Flex>
          <Flex>
            <Input
              bg="white"
              border="none"
              fontSize={["sm", "sm", "md"]}
              mt="1"
              name="optionOther"
              onChange={handleOtherOption}
              placeholder={
                "Adicione um placeholder para o campo \u0022outro\u0022 (opcional)"
              }
              value={(value.optionOther as OptionOtherProps).placeholder}
            />
            <Tooltip hasArrow label="Apagar opção">
              <Button
                bg="transparent"
                color="blackAlpha.700"
                ml="auto"
                onClick={toggleOtherOption}
                py="3"
                _hover={{ backgroundColor: "transparent", color: "red.700" }}
              >
                <XIcon />
              </Button>
            </Tooltip>
          </Flex>
        </>
      ) : (
        <Button
          bg="transparent"
          fontSize={["sm", "sm", "md"]}
          mr="auto"
          mt={[1, 1, 3]}
          onClick={toggleOtherOption}
        >
          {"+ Adicionar campo \u0022outro\u0022"}
        </Button>
      )}
    </>
  );
};

export default FieldOptions;
