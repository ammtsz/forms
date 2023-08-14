"use client";

import {
  Input,
  Flex,
  Box,
  Textarea,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

import { getPrefixFromString } from "@forms/utils";

import AddFieldButton from "@app/components/Creation/AddFieldButton";
import Feedback from "@app/components/Feedback";
import IsSignedIn from "@app/components/IsSignedIn";
import useCreatePage from "@app/hooks/useCreatePage";
import { useFormCreation } from "@app/store/formCreation";
import { UserSession } from "@app/types";
import { getFieldComponent } from "@app/utils/getFieldComponent";

import { Container, Form } from "../../create/styles";

const FormCreationPage = () => {
  const [isLoadingForm, setLoadingForm] = useState(false);
  const [isValidForm, setValidForm] = useState(true);

  const {
    handleSubmit,
    handleTitle,
    handleDescription,
    isLoading,
    hasTitleError,
  } = useCreatePage();

  const { fieldsIds, description, title } = useFormCreation();

  const { loadForm } = useFormCreation();

  const { data: session } = useSession();

  const id = usePathname().split("/")[2];

  const loadData = useCallback(async () => {
    const userForms = (session as UserSession)?.user?.forms || [];

    if (id && userForms.includes(id)) {
      setLoadingForm(true);

      const { hasError } = await loadForm(id);
      setValidForm(!hasError);

      setLoadingForm(false);
    } else {
      setValidForm(false);
    }
  }, [session, id, loadForm]);

  useEffect(() => {
    loadData();
  }, [loadData]);

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
