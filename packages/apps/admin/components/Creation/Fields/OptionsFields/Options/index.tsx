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
import { useTranslation } from "@app/i18n/client";

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
  isDisabled?: boolean;
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
  isDisabled = false,
}) => {
  const { t } = useTranslation();

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
              placeholder={t("create.placeholders.addOption")}
              value={label}
              variant="flushed"
              isDisabled={isDisabled}
            />
            {getOptionError(index) && (
              <FormErrorMessage mt={0} fontSize={["xs", "xs", "sm"]}>
                {t("commons.requiredField")}
              </FormErrorMessage>
            )}
          </FormControl>
          <Tooltip hasArrow label={t("create.buttons.deleteOption")}>
            <Button
              bg="transparent"
              color="blackAlpha.700"
              data-index={index}
              ml="auto"
              onClick={handleDeleteOption}
              py="3"
              _hover={{ backgroundColor: "transparent", color: "red.700" }}
              isDisabled={isDisabled}
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
        isDisabled={isDisabled}
      >
        {t("create.buttons.addOption")}
      </Button>
      {(value.optionOther as OptionOtherProps)?.isVisible ? (
        <>
          <Flex alignItems="center">
            <FieldIcon type={type} />
            <Text
              mt="3"
              mr="auto"
              fontSize={["xs", "xs", "sm"]}
              color={isDisabled ? "blackAlpha.500" : "black"}
            >
              {t("commons.other")}
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
              placeholder={t("create.placeholders.addOptionOther")}
              value={(value.optionOther as OptionOtherProps).placeholder || ""}
              color="blackAlpha.600"
              isDisabled={isDisabled}
            />
            <Tooltip hasArrow label={t("create.buttons.deleteOption")}>
              <Button
                bg="transparent"
                color="blackAlpha.700"
                ml="auto"
                onClick={toggleOtherOption}
                py="3"
                _hover={{ backgroundColor: "transparent", color: "red.700" }}
                isDisabled={isDisabled}
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
          isDisabled={isDisabled}
        >
          {t("create.buttons.addOptionOther")}
        </Button>
      )}
    </>
  );
};

export default FieldOptions;
