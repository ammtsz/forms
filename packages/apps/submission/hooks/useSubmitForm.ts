"use client";

import { useFormSubmission } from "@/store/formSubmission";
import { ToastId, ToastProps, useToast } from "@chakra-ui/react";
import { useCallback, useRef } from "react";

import { FormValuesProps } from "@forms/types/interfaces/formResponse";
import { isToggleTypeField, uuid } from "@forms/utils";

interface SubmitFormProps {
  onOpen: () => void;
}

interface SubmitFormReturn {
  handleSubmit: React.FormEventHandler;
}

const useSubmitForm = ({ onOpen }: SubmitFormProps): SubmitFormReturn => {
  const { submitForm, setErrors, isFieldVisible, resetValues, fields } =
    useFormSubmission();

  const toast = useToast();
  const toastIdRef = useRef<ToastId>();

  const openToast = useCallback(
    (props: ToastProps) => {
      if (toastIdRef.current) {
        toast.close(toastIdRef.current);
      }

      toastIdRef.current = toast({
        duration: 10000,
        isClosable: true,
        variant: "subtle",
        ...props,
      });
    },
    [toast]
  );

  const validateResponses = useCallback(() => {
    const errors: string[] = [];

    fields.forEach(({ isRequired, value, type, id }) => {
      const isVisible = isFieldVisible(id);

      if (isRequired && isVisible) {
        const isEmpty = !value;
        const isUnchecked = isToggleTypeField(type) && value !== "true";

        if (isUnchecked || isEmpty) {
          errors.push(id);
        }
      }
    });

    setErrors(errors);

    return errors.length === 0;
  }, [fields, isFieldVisible, setErrors]);

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();

    const isValid = validateResponses();

    if (isValid) {
      const formResponse = {} as FormValuesProps;

      fields.forEach((field) => {
        formResponse[field.id] = {
          id: field.id,
          value: field.value || "",
        };
      });

      try {
        await submitForm({
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
          ...formResponse,
        });

        onOpen();
        resetValues();
      } catch (error) {
        openToast({
          description: "Erro ao enviar o formulário.",
          status: "error",
        });
      }
    } else {
      openToast({
        description: "Preencha todos os campos obrigatórios",
        status: "error",
      });
    }
  };

  return {
    handleSubmit,
  };
};

export default useSubmitForm;
