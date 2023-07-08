import { FormValuesProps } from "@forms/types/interfaces/formResponse";
import { uuid } from "@forms/utils";

import { useFormSubmission } from "@app/store/formSubmission";

const useSubmitForm = () => {
  const { submitForm, fields } = useFormSubmission();

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();

    const formResponse = {} as FormValuesProps;

    fields.forEach((field) => {
      formResponse[field.id] = {
        id: field.id,
        value: field.value || "",
      };
    });

    await submitForm({
      ...formResponse,
      "created-at": {
        id: "created-at",
        value: new Date().toISOString(),
      },
      status: {
        id: "status",
        value: "new",
      },
      id: {
        id: "id",
        value: uuid(),
      },
    });
  };

  return {
    handleSubmit,
  };
};

export default useSubmitForm;
