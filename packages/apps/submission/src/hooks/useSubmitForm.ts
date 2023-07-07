import { FormValuesProps } from "@forms/types/interfaces/formResponse";

import { useFormSubmission } from "@app/store/formSubmission";

const useSubmitForm = () => {
  const { submitForm, fields } = useFormSubmission();

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();

    const formResponse = {} as FormValuesProps;

    fields.forEach((field) => {
      formResponse[field.id] = {
        id: field.id,
        value: field.value as string,
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
    });
  };

  return {
    handleSubmit,
  };
};

export default useSubmitForm;
