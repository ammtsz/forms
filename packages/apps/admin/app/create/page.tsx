"use client";

import { Box, Textarea, useDisclosure } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import AddFieldButton from "@app/components/Creation/AddFieldButton";
import AISection from "@app/components/Creation/AISection";
import FieldsContainer from "@app/components/Creation/FieldsContainer";
import FormMenu from "@app/components/Creation/FormMenu";
import Title from "@app/components/Creation/Title";
import IsSignedIn from "@app/components/IsSignedIn";
import useOpenAI from "@app/hooks/useOpenAI";
import useSubmitForm from "@app/hooks/useSubmitForm";
import { useFormCreation } from "@app/store/formCreation";
import { useOpenaiRequest } from "@app/store/openaiRequests";

import { Container, Form } from "./styles";

const FormCreationPage = () => {
  const [isDisabled, setDisabled] = useState(false);

  const { description, reset } = useFormCreation();

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

  const { isVisible: isAIVisible, isDisabled: isAIDisabled } =
    useOpenaiRequest();

  const { t } = useTranslation();

  const handleCleanForm = useCallback(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    handleCleanForm();
  }, [handleCleanForm]);

  return (
    <IsSignedIn>
      <Container
        as="main"
        borderRadius={["none", "none", "2xl"]}
        mx={[0, 5, 10, 10, "auto"]}
        my={[0, 0, 10]}
        boxShadow={["none", "none", "dark-lg"]}
        p={[6, 8, 12]}
      >
        <FormMenu
          handleCleanForm={handleCleanForm}
          onAIOpen={onAIOpen}
          onAIClose={onAIClose}
          isAIOpen={isAIOpen}
          isDisabled={isDisabled}
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
              value={description}
            />
          </Box>
          <FieldsContainer />
          <AddFieldButton
            handleAIFieldButton={handleAIFieldButton}
            isAILoading={isFieldLoading}
            isAIDisabled={isAIDisabled}
            isAIVisible={isAIVisible}
          />
          <button
            type="submit"
            className="primary_btn"
            disabled={isSubmitting || isDisabled}
          >
            {isSubmitting
              ? t("create.loading.creatingForm")
              : t("create.buttons.createForm")}
          </button>
        </Form>
      </Container>
    </IsSignedIn>
  );
};

export default FormCreationPage;
