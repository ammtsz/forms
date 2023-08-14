"use client";

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
  useMediaQuery,
  FormControl,
} from "@chakra-ui/react";
import React from "react";

import {
  GRID_AREAS,
  INPUT_PROPS,
  LABELS,
  getLimit,
  getSelectedDate,
} from "../utils";
import { useDateLimitPicker } from "./hooks/useDateLimitPicker";

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
    handleCleanDate,
    handleDateChange,
    handleDaysChange,
    handleRadio,
  } = useDateLimitPicker({ handleInputChange, handleLimitsChange, max, min });

  const [isMediumScreen] = useMediaQuery("(min-width: 768px)");

  const selectedDate = (dateLimitType: string, dateGroupType: string) => {
    return getSelectedDate(
      dateLimitType,
      dateGroupType,
      date,
      dateType,
      isMediumScreen
    );
  };

  return (
    <Flex flexDir={"column"} px={4} py={[8, 8, 4]}>
      <Grid
        gap={"0.5rem"}
        gridTemplateColumns={[
          "30px 220px",
          "30px 220px",
          "20px 220px 1fr 220px",
        ]}
        gridTemplateRows={[
          "1rem 40px 1rem 40px 30px 1rem 40px 1rem 40px",
          "1rem 40px 1rem 40px 30px 1rem 40px 1rem 40px",
          "1rem 40px 30px 40px",
        ]}
        h={["320px", "320px", "150px"]}
        w={["258px", "258px", "490px", "550px"]}
      >
        <RadioGroup
          display={"grid"}
          gap={"0.5rem"}
          gridArea={["1 / 1 / 9 / 2", "1 / 1 / 9 / 2", "2 / 1 / 5 / 2"]}
          gridTemplateColumns={["30px, 30px, 20px"]}
          gridTemplateRows={[
            "135px 30px 135px",
            "135px 30px 135px",
            "40px 30px 40px",
          ]}
          onChange={handleRadio}
          value={dateType}
        >
          <Radio
            value="today"
            gridArea={"1 / 1 / 2 / 1"}
            colorScheme="telegram"
          />
          <Radio
            value="calendar"
            gridArea={"3 / 1 / 3 / 1"}
            colorScheme="telegram"
          />
        </RadioGroup>
        {GRID_AREAS.map((area, index) => {
          const dateLimitType = INPUT_PROPS[index].name;

          return (
            <React.Fragment key={dateLimitType}>
              <FormLabel
                color={"blackAlpha.600"}
                fontSize={"0.9rem"}
                mb={1}
                ml={1}
                gridArea={area.label}
              >
                {`${LABELS[index]}: ${selectedDate(dateLimitType, "today")}`}
              </FormLabel>
              <Flex alignItems={"center"} gap={2} gridArea={area.today}>
                <Kbd fontSize="md" opacity={dateType === "today" ? 1 : 0.4}>
                  Hoje
                </Kbd>
                <Text fontWeight={600}>+</Text>
                <FormControl isInvalid={dateType === "today" && !max && !min}>
                  <NumberInput
                    bg="white"
                    isDisabled={dateType !== "today"}
                    max={getLimit("max", dateLimitType, date)}
                    min={getLimit("min", dateLimitType, date)}
                    onChange={handleDaysChange(dateLimitType)}
                    size={"sm"}
                    value={date.today[dateLimitType]}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <Kbd fontSize="md" opacity={dateType === "today" ? 1 : 0.4}>
                  dias
                </Kbd>
              </Flex>
              {isMediumScreen ? (
                <Text
                  alignSelf={"center"}
                  fontWeight={600}
                  gridArea={area.or}
                  opacity={dateType ? 1 : 0.4}
                  textAlign={"center"}
                >
                  ou
                </Text>
              ) : (
                <FormLabel
                  color={"blackAlpha.600"}
                  fontSize={"0.9rem"}
                  mb={1}
                  ml={1}
                  gridArea={area.or}
                >
                  {`${LABELS[index]}: ${selectedDate(
                    dateLimitType,
                    "calendar"
                  )}`}
                </FormLabel>
              )}
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
      <Button
        onClick={handleCleanDate}
        m="auto"
        mt={[4, 8, 8]}
        width={"auto"}
        size={["sm", "sm", "md"]}
      >
        Limpar datas
      </Button>
    </Flex>
  );
};

export default DateLimitPicker;
