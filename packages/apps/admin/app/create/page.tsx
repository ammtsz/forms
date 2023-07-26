"use client"

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

import AddFieldButton from "@/components/Creation/AddFieldButton";
import Date from "@/components/Creation/Fields/DateFields";
import Options from "@/components/Creation/Fields/OptionsFields";
import Texts from "@/components/Creation/Fields/TextsFields";
import Toggles from "@/components/Creation/Fields/ToggleFields";
import useCreationPage from "@/hooks/useCreationPage";
import { useFormCreation } from "@/store/formCreation";

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
    <Container>
      <Form as={"form"} onSubmit={handleSubmit}>
        <Box mb={8}>
          <FormControl isInvalid={hasTitleError} mb={8}>
            <Input
              variant={hasTitleError ? "flushed" : "unstyled"}
              size="lg"
              color="blackAlpha.900"
              placeholder="Adicione um título"
              textAlign="center"
              fontSize="2xl"
              onChange={handleTitle}
              value={title}
            />
            {hasTitleError && (
              <FormErrorMessage mt={0}>Campo obrigatório</FormErrorMessage>
            )}
          </FormControl>
          <Textarea
            color="blackAlpha.900"
            placeholder="Adicione uma descrição (opcional)"
            onChange={handleDescription}
            value={description}
            bg={"white"}
          />
        </Box>
        <React.Fragment>
          {fieldsIds.map((fieldId) => {
            const Component = fieldComponents[getPrefixFromString(fieldId)];

            return (
              <Flex key={fieldId}>
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
