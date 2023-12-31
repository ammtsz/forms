"use client";

import { Box, Textarea, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import AddFieldButton from "@app/components/Creation/AddFieldButton";
import AISection from "@app/components/Creation/AISection";
import FieldsContainer from "@app/components/Creation/FieldsContainer";
import FormMenu from "@app/components/Creation/FormMenu";
import Title from "@app/components/Creation/Title";
import Feedback from "@app/components/Feedback";
import IsSignedIn from "@app/components/IsSignedIn";
import useInitialData from "@app/hooks/useInitialData";
import useOpenAI from "@app/hooks/useOpenAI";
import useSubmitForm from "@app/hooks/useSubmitForm";
import { useTranslation } from "@app/i18n/client";
import { useAlert } from "@app/store/alert";
import { useFormCreation } from "@app/store/formCreation";
import { useOpenaiRequest } from "@app/store/openaiRequests";

import { Container, Form } from "../../create/styles";

const FormCreationPage = () => {
  const [isDisabled, setDisabled] = useState(false);

  const { description } = useFormCreation();

  const {
    isOpen: isAIOpen,
    onClose: onAIClose,
    onOpen: onAIOpen,
  } = useDisclosure();

  const {
    handleSubmit,
    handleTitle,
    handleDescription,
    isLoading: isSubmitting,
    hasTitleError,
  } = useSubmitForm();

  const {
    isTitleLoading,
    isFieldLoading,
    topic,
    handleInputChange,
    handleAIFieldButton,
    handleAITitleButton,
  } = useOpenAI();

  const { setMessage, reset: cleanAlert } = useAlert();

  const { isVisible: isAIVisible, isDisabled: isAIDisabled } =
    useOpenaiRequest();

  const { isLoadingForm, isValidForm, hasResponses } = useInitialData();

  const { t } = useTranslation();

  useEffect(() => {
    if (hasResponses) {
      setMessage(t("feedbacks.unableToEditForm"));
    }
  }, [hasResponses, setMessage, t]);

  useEffect(() => {
    return () => cleanAlert();
  }, [cleanAlert]);

  return (
    <IsSignedIn>
      {isValidForm ? (
        <Container
          as="main"
          borderRadius={["none", "none", "2xl"]}
          mx={[0, 5, 10, 10, "auto"]}
          my={[0, 0, 10]}
          boxShadow={["none", "none", "dark-lg"]}
          p={[6, 8, 12]}
        >
          <FormMenu
            onAIOpen={onAIOpen}
            onAIClose={onAIClose}
            isAIOpen={isAIOpen}
            isDisabled={isDisabled || hasResponses}
          />
          <Form as={"form"} onSubmit={handleSubmit}>
            <Box mb={8}>
              <AISection
                handleInputChange={handleInputChange}
                isLoading={isTitleLoading || isFieldLoading}
                isOpen={isAIOpen}
                setFormDisabled={setDisabled}
                topic={topic}
              />
              <Title
                handleAITitleButton={handleAITitleButton}
                isAILoading={isTitleLoading}
                hasTitleError={hasTitleError}
                handleTitle={handleTitle}
              />
              <Textarea
                bg={"white"}
                color="blackAlpha.900"
                fontSize={["sm", "sm", "md"]}
                onChange={handleDescription}
                placeholder={t("create.placeholders.addDescription")}
                value={description || ""}
              />
            </Box>
            <FieldsContainer isDisabled={hasResponses} />
            {!hasResponses && (
              <AddFieldButton
                handleAIFieldButton={handleAIFieldButton}
                isAILoading={isFieldLoading}
                isAIDisabled={isAIDisabled}
                isAIVisible={isAIVisible}
              />
            )}
            <button
              type="submit"
              className="primary_btn"
              disabled={isSubmitting || isDisabled}
            >
              {isSubmitting
                ? t("create.loading.savingChanges")
                : t("create.buttons.saveChanges")}
            </button>
          </Form>
        </Container>
      ) : (
        <Feedback
          errorMessage={t("feedbacks.form.formNotFound")}
          isLoading={isLoadingForm}
        />
      )}
    </IsSignedIn>
  );
};

export default FormCreationPage;
