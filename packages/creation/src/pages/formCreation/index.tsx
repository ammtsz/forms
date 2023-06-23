import React, { useCallback } from "react"
import { Input, Flex, Box, Button } from "@chakra-ui/react"

import TextForm from "../../components/fields/Text"
import TextAreaForm from "../../components/fields/Textarea"
import SelectForm from "../../components/fields/Select"
import AddFieldButton from "../../components/AddFieldButton"
import { useFormCreation } from "../../store/formCreation"
import { getPrefixFromString } from "../../utils/getPrefixFromString"
import { Fields } from "../../constants/fields"

const fieldComponents = {
    [Fields.text]: TextForm,
    [Fields.textarea]: TextAreaForm,
    [Fields.select]: SelectForm,
    [Fields.radio]: SelectForm,
}

const FormCreationPage = () => {
    const { fieldsIds, createForm, updateTitle, title } = useFormCreation()
    
    const handleSubmit: React.FormEventHandler = useCallback((event) => {
        event.preventDefault()
        createForm()
    }, [createForm])

    const handleTitle: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        updateTitle(event.target.value)
    }, [updateTitle])

    return (
        <Box>
            <Flex>
                <form onSubmit={handleSubmit}>
                    <Flex p="4">
                        <Input
                            variant='unstyled'
                            size="lg"
                            color="blackAlpha.900"
                            _placeholder={{ color: 'inherit' }}
                            placeholder='Adicione um título'
                            textAlign="center"
                            fontSize="2xl"
                            onChange={handleTitle}
                            value={title}
                        />
                    </Flex>
                    <React.Fragment>
                        {fieldsIds.map(( fieldId ) => {
                            const Component = fieldComponents[getPrefixFromString(fieldId)]
                            return (
                                <Flex key={fieldId} p={4}>
                                    <Component id={fieldId} />
                                </Flex>
                            )
                        })}
                    </React.Fragment>
                    <AddFieldButton />
                    <Button
                        type="submit"
                        bg="cyan.700"
                        color="white"
                        w="80vw"
                    >
                        Criar formulário
                    </Button>
                </form>
            </Flex>
        </Box>
    )
}

export default FormCreationPage