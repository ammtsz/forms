import { DependsOnProps } from "@forms/types/interfaces/field";
import { FormProps } from "@forms/types/interfaces/form";
import { Fields } from "@forms/utils";

export const setForm = (form: FormProps) => {
  const dependencies = {};
  const visibleFields = {};

  form.fields.forEach((field) => {
    if (field.dependsOn) {
      dependencies[field.dependsOn.fieldId] = [
        dependencies[field.dependsOn.fieldId]
          ? [...dependencies[field.dependsOn.fieldId], field.id]
          : field.id,
      ];
      visibleFields[field.id] = false;
    } else {
      visibleFields[field.id] = true;
    }
  });

  return {
    dependencies,
    visibleFields,
  };
};

export const getFieldVisibility = (updatedField, dependableField) => {
  const { optionsValues: validValues } =
    dependableField.dependsOn as DependsOnProps;

  let isVisible = false;

  if (updatedField.value) {
    if (updatedField.type === Fields.checkboxes) {
      const selectedOptions = JSON.parse(updatedField.value as string);

      isVisible = validValues.some((option) =>
        selectedOptions.includes(option)
      );
    } else {
      isVisible = validValues.some((option) => updatedField.value === option);
    }
  }

  return isVisible;
};
