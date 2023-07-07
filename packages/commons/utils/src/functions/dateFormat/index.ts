import { format, parseISO } from "date-fns";

export const formatDateToLocalString = (date: string): string =>
  format(parseISO(date), "dd/M/yyyy");

export const formatDateToRegistrationString = (date: Date): string =>
  format(date, "yyyy-MM-dd");

export const formatHour = (date: string): string =>
  format(parseISO(date), "HH:mm");
