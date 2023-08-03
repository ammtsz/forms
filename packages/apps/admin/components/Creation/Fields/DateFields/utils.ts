import { DateProps } from "./DateLimitPicker/hooks/useDateLimitPicker";

export const GRID_AREAS = [
  {
    label: ["1 / 2 / 2 / 2", "1 / 2 / 2 / 2", "1 / 2 / 2 / 3"],
    today: ["2 / 2 / 3 / 2", "2 / 2 / 3 / 2", "2 / 2 / 3 / 3"],
    or: ["6 / 2 / 7 / 2", "6 / 2 / 7 / 2", "3 / 2 / 4 / 3"],
    calendar: ["7 / 2 / 8 / 2", "7 / 2 / 8 / 2", "4 / 2 / 5 / 3"],
  },
  {
    label: ["3 / 2 / 4 / 2", "3 / 2 / 4 / 2", "1 / 4 / 2 / 5"],
    today: ["4 / 2 / 5 / 2", "4 / 2 / 5 / 2", "2 / 4 / 3 / 5"],
    or: ["8 / 2 / 9 / 2", "8 / 2 / 9 / 2", "3 / 4 / 4 / 5"],
    calendar: ["9 / 2 / 9 / 2", "9 / 2 / 9 / 2", "4 / 4 / 5 / 5"],
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
    return 365;
  }

  if (isMaxDate && !isMaxNumber) {
    return date.today.min ? Number(date.today.min) : undefined;
  }

  if (!isMaxDate && !isMaxNumber) {
    return -365;
  }

  if (!isMaxDate && isMaxNumber) {
    return date.today.max ? Number(date.today.max) : undefined;
  }
};

export const getSelectedDate = (
  dateLimitType: string,
  dateGroupType: string,
  date: DateProps,
  dateType: string,
  isMediumScreen: boolean
) => {
  const limit = date[dateType] && date[dateType][dateLimitType];
  const todayLimit = `hoje + ${limit}`;
  const displayLimit = dateType === "today" ? todayLimit : limit;

  if (!limit) {
    return "-";
  }

  if (isMediumScreen) {
    return displayLimit;
  }

  if (dateGroupType !== dateType) {
    return "-";
  }

  return dateGroupType === "today" ? todayLimit : limit;
};
