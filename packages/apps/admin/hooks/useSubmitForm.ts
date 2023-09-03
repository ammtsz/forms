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

import { useTranslation } from "@app/i18n/client";
import { useFormCreation } from "@app/store/formCreation";
import { useFormsManagement } from "@app/store/formsManagement";
import { UserSession } from "@app/types";

import useToast from "./useToast";

const useSubmitForm = () => {
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

  const { updateForms } = useFormsManagement();

  const router = useRouter();

  const { data: session, update: userUpdate } = useSession();

  const { openToast } = useToast();

  const { t, i18n } = useTranslation();

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
      return t("create.feedbacks.addTitle");
    }

    setTitleError(false);

    if (!fields.length) {
      return t("create.feedbacks.oneFieldAtLeast");
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

    const errorMessage = hasError
      ? t("create.feedbacks.fillRequiredFields")
      : "";

    return errorMessage;
  }, [title, fields, setErrors, t, validateOptions]);

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
            i18n.resolvedLanguage || "en",
            user.forms
          );

          if (!hasCreationError) {
            updateForms({ title, id: formId, fields, description });
            userUpdate();
            router.push("/");

            openToast({
              description: t("create.feedbacks.formSubmitted"),
              status: "success",
            });
          } else {
            openToast({
              description: `${t("create.feedbacks.errorSubmitForm")} ${t(
                "feedbacks.retry"
              )}`,
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
          description: t("create.feedbacks.loginRequired"),
          status: "error",
        });
      }

      setLoading(false);
    },
    [
      validateForm,
      session?.user,
      createUserForm,
      i18n.resolvedLanguage,
      updateForms,
      title,
      fields,
      description,
      userUpdate,
      router,
      openToast,
      t,
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

export default useSubmitForm;
