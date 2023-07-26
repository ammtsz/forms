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

import Tooltip from "@/components/Tooltip/Tooltip";

import FieldIcon from "../../FieldIcon";
import { ValueProps } from "../../hooks/useFieldsBase";

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
              name={`${index}--option`}
              onChange={handleOptionChange}
              placeholder="Adicione uma opção"
              value={label}
              variant="flushed"
            />
            {getOptionError(index) && (
              <FormErrorMessage mt={0}>Campo obrigatório</FormErrorMessage>
            )}
          </FormControl>
          <Tooltip label="Apagar opção">
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
      <Button mt="3" mr="auto" bg="transparent" onClick={handleAddOption}>
        + Adicionar opção
      </Button>
      {(value.optionOther as OptionOtherProps).isVisible ? (
        <>
          <Flex alignItems="center">
            <FieldIcon type={type} />
            <Text mt="3" mr="auto">
              Outros
            </Text>
          </Flex>
          <Flex>
            <Input
              bg="white"
              border="none"
              mt="1"
              name="optionOther"
              onChange={handleOtherOption}
              placeholder="Adicione um placeholder para o campo outros (opcional)"
              value={(value.optionOther as OptionOtherProps).placeholder}
            />
            <Tooltip label="Apagar opção">
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
        <Button mt="3" mr="auto" bg="transparent" onClick={toggleOtherOption}>
          + Adicionar campo "outros"
        </Button>
      )}
    </>
  );
};

export default FieldOptions;
