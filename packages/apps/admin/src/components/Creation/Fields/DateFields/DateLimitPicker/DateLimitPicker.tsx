import {
  Input,
  Flex,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Kbd,
  Text,
  Radio,
  Grid,
  RadioGroup,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { X as XIcon } from "react-feather";

import Tooltip from "@app/components/Tooltip/Tooltip";

import { useDateLimitPicker } from "./hooks/useDateLimitPicker";
import { GRID_AREAS, INPUT_PROPS, LABELS, getLimit } from "./utils";

interface DateLimitPickerProps {
  min?: string;
  max?: string;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
  handleLimitsChange: (max: string, min: string) => void;
}

const DateLimitPicker: React.FC<DateLimitPickerProps> = ({
  max,
  min,
  handleInputChange,
  handleLimitsChange,
}: DateLimitPickerProps) => {
  const {
    date,
    dateType,
    handleCleanData,
    handleDateChange,
    handleDaysChange,
    handleRadio,
  } = useDateLimitPicker({ handleInputChange, handleLimitsChange });

  const selectedDate = (dateLimitType: string) =>
    date[dateType] && date[dateType][dateLimitType]
      ? (dateType === "today" ? "hoje + " : "") + date[dateType][dateLimitType]
      : "-";

  return (
    <Grid
      gap={"0.5rem"}
      gridTemplateColumns={"20px 220px 1fr 220px"}
      gridTemplateRows={"1rem 40px 30px 40px"}
      h={"150px"}
      w={"550px"}
    >
      <RadioGroup
        display={"grid"}
        gap={"0.5rem"}
        gridArea={"2 / 1 / 5 / 2"}
        gridTemplateColumns={"20px"}
        gridTemplateRows={"40px 30px 40px"}
        onChange={handleRadio}
        value={dateType}
      >
        <Radio value="today" gridArea={"1 / 1 / 2 / 2"} />
        <Radio value="calendar" gridArea={"3 / 1 / 4 / 2"} />
      </RadioGroup>
      {GRID_AREAS.map((area, index) => {
        const dateLimitType = INPUT_PROPS[index].name;

        return (
          <React.Fragment key={dateLimitType}>
            <Flex gridArea={area.label} alignItems={"center"}>
              <FormLabel
                color={"blackAlpha.600"}
                fontSize={"0.9rem"}
                mb={1}
                ml={1}
              >
                {`${LABELS[index]}: ${selectedDate(dateLimitType)}`}
              </FormLabel>
              <Tooltip label="limpar">
                <Button
                  bg={"transparent"}
                  ml="auto"
                  onClick={handleCleanData}
                  p={1}
                  size={"sm"}
                >
                  <XIcon height={"0.75rem"} />
                </Button>
              </Tooltip>
            </Flex>
            <Flex alignItems={"center"} gap={2} gridArea={area.today}>
              <Kbd fontSize="md" opacity={dateType === "today" ? 1 : 0.4}>
                Hoje
              </Kbd>
              <Text fontWeight={600}>+</Text>
              <NumberInput
                bg="white"
                isDisabled={dateType !== "today"}
                max={getLimit("max", dateLimitType, date)}
                min={getLimit("min", dateLimitType, date)}
                onChange={handleDaysChange(dateLimitType)}
                size={"sm"}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Kbd fontSize="md" opacity={dateType === "today" ? 1 : 0.4}>
                dias
              </Kbd>
            </Flex>
            <Text
              alignSelf={"center"}
              fontWeight={600}
              gridArea={area.or}
              opacity={dateType ? 1 : 0.4}
              textAlign={"center"}
            >
              ou
            </Text>
            <Input
              bg={"white"}
              gridArea={area.calendar}
              isDisabled={dateType !== "calendar"}
              max={max}
              min={min}
              onChange={handleDateChange}
              type="date"
              w={"210px"}
              width="100%"
              {...INPUT_PROPS[index]}
            />
          </React.Fragment>
        );
      })}
    </Grid>
  );
};

export default DateLimitPicker;
