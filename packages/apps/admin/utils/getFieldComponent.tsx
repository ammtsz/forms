import { FieldsType } from "@forms/types/interfaces/field";
import { Fields } from "@forms/utils";

import Date from "@app/components/Creation/Fields/DateFields";
import Options from "@app/components/Creation/Fields/OptionsFields";
import Texts from "@app/components/Creation/Fields/TextsFields";
import Toggles from "@app/components/Creation/Fields/ToggleFields";
import { FieldComponentProps } from "@app/types";

export const getFieldComponent = (
  fieldType: FieldsType
): React.FC<FieldComponentProps> =>
  ({
    [Fields.text]: Texts,
    [Fields.textarea]: Texts,
    [Fields.select]: Options,
    [Fields.radio]: Options,
    [Fields.checkboxes]: Options,
    [Fields.checkbox]: Toggles,
    [Fields.switch]: Toggles,
    [Fields.date]: Date,
  }[fieldType]);
