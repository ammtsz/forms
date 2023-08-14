"use client";

import {
  Input,
  Flex,
  Box,
  Textarea,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import React from "react";

import { getPrefixFromString } from "@forms/utils";

import AddFieldButton from "@app/components/Creation/AddFieldButton";
import Feedback from "@app/components/Feedback";
import IsSignedIn from "@app/components/IsSignedIn";
import useInitialData from "@app/hooks/useInitialData";
import useSubmitForm from "@app/hooks/useSubmitForm";
import { useFormCreation } from "@app/store/formCreation";
import { getFieldComponent } from "@app/utils/getFieldComponent";

import { Container, Form } from "../../create/styles";

const FormCreationPage = () => {
  const {
    handleSubmit,
    handleTitle,
    handleDescription,
    isLoading,
    hasTitleError,
  } = useSubmitForm();

  const { fieldsIds, description, title } = useFormCreation();

  const { isLoadingForm, isValidForm } = useInitialData();

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
          <Form as={"form"} onSubmit={handleSubmit}>
            <Box mb={8}>
              <FormControl isInvalid={hasTitleError} mb={8}>
                <Input
                  id="create-title"
                  variant={hasTitleError ? "flushed" : "unstyled"}
                  size="lg"
                  color="blackAlpha.900"
                  placeholder="Adicione um título"
                  textAlign="center"
                  fontSize={["lg", "xl", "2xl"]}
                  onChange={handleTitle}
                  value={title}
                />
                {hasTitleError && (
                  <FormErrorMessage mt={0}>Campo obrigatório</FormErrorMessage>
                )}
              </FormControl>
              <Textarea
                bg={"white"}
                color="blackAlpha.900"
                fontSize={["sm", "sm", "md"]}
                onChange={handleDescription}
                placeholder="Adicione uma descrição (opcional)"
                value={description || ""}
              />
            </Box>
            <React.Fragment>
              {fieldsIds.map((fieldId) => {
                const Component = getFieldComponent(
                  getPrefixFromString(fieldId)
                );

                return (
                  <Flex
                    key={fieldId}
                    direction="column"
                    pt={[4, 6, 8]}
                    pb={[8, 8, 12]}
                    px={[4, 6, 8]}
                    my={[4, 6, 8]}
                    bg="blackAlpha.100"
                    borderRadius="10"
                    width="100%"
                  >
                    <Component id={fieldId} />
                  </Flex>
                );
              })}
            </React.Fragment>
            <AddFieldButton />
            <button type="submit" className="primary_btn" disabled={isLoading}>
              {isLoading ? "Salvando alterações..." : "Salvar alterações"}
            </button>
          </Form>
        </Container>
      ) : (
        <Feedback
          errorMessage="Formulário não encontrado"
          isLoading={isLoadingForm}
        />
      )}
    </IsSignedIn>
  );
};

export default FormCreationPage;
