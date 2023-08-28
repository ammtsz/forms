import { t } from "i18next";

import { FieldsType } from "@forms/types/interfaces/field";
import { Fields } from "@forms/utils";

const fields = () => ({
  [Fields.text]: t("fields.text"),
  [Fields.textarea]: t("fields.paragraph"),
  [Fields.select]: t("fields.dropdown"),
  [Fields.radio]: t("fields.radio"),
  [Fields.checkboxes]: t("fields.checkboxes"),
  [Fields.checkbox]: t("fields.checkbox"),
  [Fields.switch]: t("fields.switch"),
  [Fields.date]: t("fields.date"),
});

export const getFields = () => Object.keys(fields()) as FieldsType[];

export const getFieldLabel = (type: FieldsType) => {
  return fields()[type];
};
