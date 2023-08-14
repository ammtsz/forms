"use client";

import {
  Input,
  Flex,
  Box,
  Textarea,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";

import { getPrefixFromString } from "@forms/utils";

import AddFieldButton from "@app/components/Creation/AddFieldButton";
import IsSignedIn from "@app/components/IsSignedIn";
import useSubmitForm from "@app/hooks/useSubmitForm";
import { useFormCreation } from "@app/store/formCreation";
import { getFieldComponent } from "@app/utils/getFieldComponent";

import { Container, Form } from "./styles";

const FormCreationPage = () => {
  const { fieldsIds, description, title, reset } = useFormCreation();

  const {
    handleSubmit,
    handleTitle,
    handleDescription,
    isLoading,
    hasTitleError,
  } = useSubmitForm();

  const handleCleanForm = useCallback(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    handleCleanForm();
  }, [handleCleanForm]);

  return (
    <IsSignedIn>
      <>
        <div className="flex ml-auto w-full gap-2 justify-end p-4">
          <button className="primary_btn" onClick={handleCleanForm}>
            Limpar formulário
          </button>
        </div>
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
                value={description}
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
              {isLoading ? "Criando formulário..." : "Criar formulário"}
            </button>
          </Form>
        </Container>
      </>
    </IsSignedIn>
  );
};

export default FormCreationPage;
