"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

import { MakeRequired } from "@forms/types/global/makeRequired";
import {
  FieldErrors,
  OptionProps,
  OptionsFieldProps,
} from "@forms/types/interfaces/field";
import { Fields } from "@forms/utils";

import { useFormCreation } from "@app/store/formCreation";
import { useFormsManagement } from "@app/store/formsManagement";
import { UserSession } from "@app/types";

import useToast from "./useToast";

const useCreatePage = () => {
  const [isLoading, setLoading] = useState(false);
  const [hasTitleError, setTitleError] = useState(false);

  const {
    createUserForm,
    updateTitle,
    updateDescription,
    setErrors,
    fields,
    title,
    description,
  } = useFormCreation();

  const { addCreatedForm } = useFormsManagement();

  const router = useRouter();

  const { data: session, update: userUpdate } = useSession();

  const { openToast } = useToast();

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

      if (
        field.type === Fields.select ||
        field.type === Fields.radio ||
        field.type === Fields.checkboxes
      ) {
        const { optionsError } = validateOptions(
          (field as MakeRequired<OptionsFieldProps, "options">).options
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

      const validationError = validateForm();

      const user = session?.user as UserSession["user"];

      if (user) {
        if (!validationError) {
          const { hasError: hasCreationError, formId } = await createUserForm(
            user.email as string,
            user.forms
          );

          if (!hasCreationError) {
            addCreatedForm({ title, id: formId, fields, description });
            userUpdate();
            router.push("/");

            openToast({
              description: "Formulário criado com sucesso",
              status: "success",
            });
          } else {
            openToast({
              description: "Erro ao criar o formulário. Tente novamente.",
              status: "error",
              duration: null,
            });
          }
        } else {
          openToast({
            description: validationError,
            status: "warning",
          });
        }
      } else {
        openToast({
          description: "faça login para criar um formulário",
          status: "error",
        });
      }

      setLoading(false);
    },
    [
      validateForm,
      session?.user,
      createUserForm,
      addCreatedForm,
      title,
      fields,
      description,
      userUpdate,
      router,
      openToast,
    ]
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

export default useCreatePage;
