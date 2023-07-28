"use client";

import AddFieldButton from "@/components/Creation/AddFieldButton";
import Date from "@/components/Creation/Fields/DateFields";
import Options from "@/components/Creation/Fields/OptionsFields";
import Texts from "@/components/Creation/Fields/TextsFields";
import Toggles from "@/components/Creation/Fields/ToggleFields";
import useCreationPage from "@/hooks/useCreationPage";
import { useFormCreation } from "@/store/formCreation";
import {
  Input,
  Flex,
  Box,
  Textarea,
  Button,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import React from "react";

import { Fields, getPrefixFromString } from "@forms/utils";

import { Container, Form } from "./styles";

const fieldComponents = {
  [Fields.text]: Texts,
  [Fields.textarea]: Texts,
  [Fields.select]: Options,
  [Fields.radio]: Options,
  [Fields.checkboxes]: Options,
  [Fields.checkbox]: Toggles,
  [Fields.switch]: Toggles,
  [Fields.date]: Date,
};

const FormCreationPage = () => {
  const { fieldsIds, description, title } = useFormCreation();

  const {
    handleSubmit,
    handleTitle,
    handleDescription,
    isLoading,
    hasTitleError,
  } = useCreationPage();

  return (
    <Container
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
            const Component = fieldComponents[getPrefixFromString(fieldId)];

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
        <Button
          type="submit"
          bg="cyan.700"
          color="white"
          isDisabled={isLoading}
        >
          {isLoading ? "Criando formulário..." : "Criar formulário"}
        </Button>
      </Form>
    </Container>
  );
};

export default FormCreationPage;
