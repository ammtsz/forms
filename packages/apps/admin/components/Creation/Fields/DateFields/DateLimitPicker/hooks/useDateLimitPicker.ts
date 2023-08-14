"use client";

import React, { useCallback, useEffect, useState } from "react";

interface FieldsBaseProps {
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
  handleLimitsChange: (max: string, min: string) => void;
  max?: string;
  min?: string;
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
  max,
  min,
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

  useEffect(() => {
    const hasInitialMinValue = min && !date.calendar.min && !date.today.min;
    const hasInitialMaxValue = max && !date.calendar.max && !date.today.max;

    if (hasInitialMaxValue || hasInitialMinValue) {
      const type =
        (max && max.length > 5 ? "calendar" : "today") ||
        (min && min.length > 5 ? "calendar" : "today");

      setDate((prev) => ({
        ...prev,
        [type]: {
          min: min || "",
          max: max || "",
        },
      }));
      setDateType(type);
    }
  }, [dateType, date, handleLimitsChange, min, max]);

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
