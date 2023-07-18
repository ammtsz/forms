import { ToastId, ToastProps, useToast } from "@chakra-ui/react";
import React, { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FieldErrors,
  OptionProps,
  OptionsFormProps,
} from "@forms/types/interfaces/field";
import { Fields } from "@forms/utils";

import { useFormCreation } from "@app/store/formCreation";

const useCreationPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [hasTitleError, setTitleError] = useState(false);

  const {
    createForm,
    updateTitle,
    updateDescription,
    setErrors,
    fields,
    title,
  } = useFormCreation();

  const navigate = useNavigate();

  const toast = useToast();
  const toastIdRef = useRef<ToastId>();

  const openToast = useCallback(
    (props: ToastProps) => {
      if (toastIdRef.current) {
        toast.close(toastIdRef.current);
      }

      toastIdRef.current = toast({
        duration: null,
        isClosable: true,
        variant: "subtle",
        ...props,
      });
    },
    [toast]
  );

  const validateOptions = useCallback((options: OptionProps[]) => {
    const isEmpty = !options || options.length === 0;
    if (isEmpty) return { optionsError: ["options--0"] };

    const optionsError: string[] = [];

    options.forEach((option, index) => {
      if (!option.value) optionsError.push(`options--${index}`);
    });

    return { optionsError };
  }, []);

  const validateForm = useCallback(() => {
    if (!title) {
      setTitleError(true);
      return "Adicione um título ao formulário";
    }

    setTitleError(false);

    if (!fields.length) {
      return "O formulário deve conter ao menos um campo.";
    }

    const fieldErrors: FieldErrors = {};

    fields.forEach((field) => {
      if (!field.label) {
        fieldErrors[field.id] = ["label"];
      }

      if (field.type === Fields.select) {
        const { optionsError } = validateOptions(
          (field as OptionsFormProps).options
        );

        if (optionsError.length > 0) {
          fieldErrors[field.id] = fieldErrors[field.id]
            ? [...fieldErrors[field.id], ...optionsError]
            : [...optionsError];
        }
      }
    });

    setErrors(fieldErrors);

    const hasError = Object.keys(fieldErrors).length;

    const errorMessage = hasError ? "Preeencha os campos obrigatórios." : "";

    return errorMessage;
  }, [fields, title, setErrors, validateOptions]);

  const handleSubmit: React.FormEventHandler = useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true);

      const errorMessage = validateForm();

      if (!errorMessage) {
        const { hasError } = await createForm();

        if (!hasError) {
          navigate("/");
          openToast({
            description: "Formulário criado com sucesso",
            status: "success",
            duration: 9000,
          });
        } else {
          openToast({
            description: "Erro ao criar o formulário. Tente novamente.",
            status: "error",
          });
        }
      } else {
        openToast({
          description: errorMessage,
          status: "warning",
        });
      }

      setLoading(false);
    },
    [validateForm, createForm, navigate, openToast]
  );

  const handleTitle: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      updateTitle(event.target.value);
    },
    [updateTitle]
  );

  const handleDescription: React.ChangeEventHandler<HTMLTextAreaElement> =
    useCallback(
      (event) => {
        updateDescription(event.target.value);
      },
      [updateDescription]
    );

  return {
    handleSubmit,
    handleTitle,
    handleDescription,
    isLoading,
    hasTitleError,
  };
};

export default useCreationPage;
