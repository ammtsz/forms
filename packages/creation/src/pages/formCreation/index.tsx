import React, { ReactElement, useCallback } from "react"
import { Button, Accordion, AccordionItem, AccordionButton, AccordionPanel, Input, Flex } from "@chakra-ui/react"
import { v4 as uuid } from "uuid"

import TextForm from "../../components/fields/text"
import TextAreaForm from "../../components/fields/textarea"

import { useFormCreation } from "../../store/formCreation"

import { getFieldTypeFromId } from "../../utils/getFieldTypeFromId"

interface FieldComponentsReturn {
    [key: string]: ReactElement
}

const fieldComponents = (fieldId: string): FieldComponentsReturn => ({
    text: <TextForm key={fieldId} id={fieldId}/>,
    textarea: <TextAreaForm key={fieldId} id={fieldId}/>,
    select: <TextForm key={fieldId} id={fieldId}/>,
    radio: <TextForm key={fieldId} id={fieldId}/>,
})

const FormCreationPage = () => {
    const { addField, fieldsIds } = useFormCreation()

    const handleNewFieldClick = useCallback((type: string) => {
        addField({
            id: `${type}--${uuid()}`,
            label: "",
            type,

        })
    }, [addField])

    return (
        <form>
            <Flex p="4">
                <Input
                    variant='unstyled'
                    size="lg"
                    color="blackAlpha.900"
                    _placeholder={{ color: 'inherit' }}
                    placeholder='Adicione um título'
                    textAlign="center"
                    fontSize="2xl"
                />
            </Flex>
            <React.Fragment>
                {fieldsIds.map(( fieldId ) => {
                    return fieldComponents(fieldId)[getFieldTypeFromId(fieldId)]
                })}
            </React.Fragment>
            <Accordion allowMultiple borderColor="transparent">
                <AccordionItem>
                    <AccordionButton
                        as={Button}
                        bg="blackAlpha.700"
                        _hover={{bg: "blackAlpha.800"}}
                        color="white"
                        height="10"
                        width="80vw"
                    >
                        Adicionar campo
                    </AccordionButton>
                    <AccordionPanel pb={4} display="flex" flexDir="column" bg="blackAlpha.500">
                        <Button
                            bg="whiteAlpha.900"
                            my="1"
                            onClick={() => handleNewFieldClick("text")}
                        >
                            Text
                        </Button>
                        <Button
                            bg="whiteAlpha.900"
                            my="1"
                            onClick={() => handleNewFieldClick("textarea")}
                        >
                            Textarea
                        </Button>
                        <Button
                            bg="whiteAlpha.900"
                            my="1"
                            onClick={() => handleNewFieldClick("select")}
                        >
                            Select
                        </Button>
                        <Button
                            bg="whiteAlpha.900"
                            my="1"
                            onClick={() => handleNewFieldClick("radio")}
                        >
                            Radio
                        </Button>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </form>
    )
}

export default FormCreationPage