"use client";

import React, { useCallback, useState } from "react";

interface FieldsBaseProps {
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
  handleLimitsChange: (max: string, min: string) => void;
}

export interface DateProps {
  today: {
    min: string;
    max: string;
  };
  calendar: {
    min: string;
    max: string;
  };
}

const useDateLimitPicker = ({
  handleInputChange,
  handleLimitsChange,
}: FieldsBaseProps) => {
  const [dateType, setDateType] = useState<string>("");
  const [date, setDate] = useState<DateProps>({
    today: {
      min: "",
      max: "",
    },
    calendar: {
      min: "",
      max: "",
    },
  });

  const handleDateChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        setDate((prev) => ({
          ...prev,
          calendar: {
            ...prev.calendar,
            [event.target.name]: event.target.value,
          },
        }));

        setDateType("calendar");

        handleInputChange(event);
      },
      [handleInputChange]
    );

  const handleDaysChange = useCallback(
    (name: string) => (value: string) => {
      setDate((prev) => ({
        ...prev,
        today: {
          ...prev.today,
          [name]: value,
        },
      }));
      setDateType("today");
      handleInputChange({
        target: {
          value,
          name,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    },
    [handleInputChange]
  );

  const handleCleanDate = useCallback(() => {
    setDateType("");
  }, []);

  const handleRadio = useCallback(
    (value: string) => {
      setDateType(value);

      handleLimitsChange(date[value].max, date[value].min);
    },
    [handleLimitsChange, date]
  );

  return {
    handleInputChange,
    handleDaysChange,
    handleCleanDate,
    handleRadio,
    handleDateChange,
    dateType,
    date,
  };
};

export { useDateLimitPicker };
