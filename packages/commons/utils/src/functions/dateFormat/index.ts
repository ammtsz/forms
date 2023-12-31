import { format, parseISO } from "date-fns";

export const formatDateAndHour = (date: string): string =>
  format(parseISO(date), "yyyy-MM-dd HH:mm");

export const formatDate = (date: string): string =>
  format(parseISO(date), "yyyy-MM-dd");
