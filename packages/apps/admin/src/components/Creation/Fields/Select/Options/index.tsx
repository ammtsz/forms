import {
  Input,
  Flex,
  Button,
  Text,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { Trash as TrashIcon } from "react-feather";

import { OptionOtherProps, OptionProps } from "@forms/types/interfaces/field";

import { ValueProps } from "../../hooks/useFieldsBase";

interface SelectOptionsProps {
  handleAddOption: React.MouseEventHandler<HTMLButtonElement>;
  handleOptionChange: React.FormEventHandler<HTMLInputElement>;
  handleDeleteOption: React.MouseEventHandler<HTMLButtonElement>;
  toggleOtherOption: React.MouseEventHandler<HTMLButtonElement>;
  handleOtherOption: React.FormEventHandler<HTMLInputElement>;
  fieldErrors: string[] | null;
  value: ValueProps;
}

const SelectOptions: React.FC<SelectOptionsProps> = ({
  handleAddOption,
  handleOptionChange,
  handleDeleteOption,
  toggleOtherOption,
  handleOtherOption,
  fieldErrors,
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
        <Flex key={index}>
          <FormControl
            isInvalid={getOptionError(index)}
            mb={getOptionError(index) ? 2 : 0}
          >
            <Input
              variant="flushed"
              name={`${index}--option`}
              mt="3"
              placeholder="Adicione uma opção"
              onChange={handleOptionChange}
              value={label}
            />
            {getOptionError(index) && (
              <FormErrorMessage mt={0}>Campo obrigatório</FormErrorMessage>
            )}
          </FormControl>
          <Button
            onClick={handleDeleteOption}
            ml="auto"
            py="3"
            color="blackAlpha.700"
            bg="transparent"
            data-index={index}
            _hover={{ backgroundColor: "transparent", color: "red.700" }}
          >
            <TrashIcon />
          </Button>
        </Flex>
      ))}
      <Button mt="3" mr="auto" bg="transparent" onClick={handleAddOption}>
        + Adicionar opção
      </Button>
      {(value.optionOther as OptionOtherProps).isVisible ? (
        <>
          <Text mt="3" ml="1" mr="auto">
            Outros
          </Text>
          <Flex>
            <Input
              name="optionOther"
              bg="white"
              border="none"
              mt="1"
              placeholder="Adicione um placeholder para o campo outros (opcional)"
              onChange={handleOtherOption}
              value={(value.optionOther as OptionOtherProps).placeholder}
            />
            <Button
              onClick={toggleOtherOption}
              ml="auto"
              py="3"
              color="blackAlpha.700"
              bg="transparent"
            >
              <TrashIcon />
            </Button>
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

export default SelectOptions;
