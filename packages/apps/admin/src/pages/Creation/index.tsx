import { Input, Flex, Box, Textarea, Button } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Fields, getPrefixFromString } from "@forms/utils";

import AddFieldButton from "@app/components/Creation/AddFieldButton";
import SelectForm from "@app/components/Creation/Fields/Select";
import TextForm from "@app/components/Creation/Fields/Text";
import TextAreaForm from "@app/components/Creation/Fields/Textarea";
import { useFormCreation } from "@app/store/formCreation";

import { Container, Form } from "./styles";

const fieldComponents = {
  [Fields.text]: TextForm,
  [Fields.textarea]: TextAreaForm,
  [Fields.select]: SelectForm,
  [Fields.radio]: SelectForm,
};

const FormCreationPage = () => {
  const {
    fieldsIds,
    createForm,
    updateTitle,
    updateDescription,
    description,
    title,
  } = useFormCreation();
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler = useCallback(
    async (event) => {
      event.preventDefault();
      await createForm();
      navigate("/");
    },
    [createForm, navigate]
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

  return (
    <Container>
      <Form as={"form"} onSubmit={handleSubmit}>
        <Box mb={8}>
          <Input
            variant="unstyled"
            size="lg"
            color="blackAlpha.900"
            placeholder="Adicione um título"
            textAlign="center"
            fontSize="2xl"
            onChange={handleTitle}
            value={title}
            mb={8}
          />
          <Textarea
            color="blackAlpha.900"
            placeholder="Adicione uma descrição"
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
        <Button type="submit" bg="cyan.700" color="white">
          Criar formulário
        </Button>
      </Form>
    </Container>
  );
};

export default FormCreationPage;
