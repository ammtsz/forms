import { FieldsType } from "@forms/types/interfaces/field";

export const getPrefixFromString = (id: string) =>
  id.split("--")[0] as FieldsType;
