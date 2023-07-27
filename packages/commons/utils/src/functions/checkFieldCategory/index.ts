import { Fields } from "~/constants";

import { FieldsType } from "../../../../types/interfaces/field";

export const isOptionTypeField = (fieldType: FieldsType) => {
  return (
    fieldType === Fields.checkboxes ||
    fieldType === Fields.radio ||
    fieldType === Fields.select
  );
};

export const isToggleTypeField = (fieldType: FieldsType) => {
  return fieldType === Fields.checkbox || fieldType === Fields.switch;
};
