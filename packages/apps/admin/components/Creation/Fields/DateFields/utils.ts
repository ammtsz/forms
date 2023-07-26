import { DateProps } from "./DateLimitPicker/hooks/useDateLimitPicker";

export const GRID_AREAS = [
  {
    label: "1 / 2 / 2 / 3",
    today: "2 / 2 / 3 / 3",
    or: "3 / 2 / 4 / 3",
    calendar: "4 / 2 / 5 / 3",
  },
  {
    label: "1 / 4 / 2 / 5",
    today: "2 / 4 / 3 / 5",
    or: "3 / 4 / 4 / 5",
    calendar: "4 / 4 / 5 / 5",
  },
];

export const INPUT_PROPS = [
  {
    name: "min",
    label: "Data mínima",
    min: "",
  },
  {
    name: "max",
    label: "Data máxima",
    max: "",
  },
];

export const LABELS = ["Data mínima", "Data máxima"];

export const getLimit = (
  limitType: string,
  dateLimitType: string,
  date: DateProps
) => {
  const isMaxDate = dateLimitType === "max";
  const isMaxNumber = limitType === "max";

  if (isMaxDate && isMaxNumber) {
    return 120;
  }

  if (isMaxDate && !isMaxNumber) {
    return date.today.min ? Number(date.today.min) : undefined;
  }

  if (!isMaxDate && !isMaxNumber) {
    return -120;
  }

  if (!isMaxDate && isMaxNumber) {
    return date.today.max ? Number(date.today.max) : undefined;
  }
};