import React, { ReactElement, useCallback } from "react"
import { Input, Flex, Box } from "@chakra-ui/react"

import TextForm from "../../components/fields/Text"
import TextAreaForm from "../../components/fields/Textarea"
import SelectForm from "../../components/fields/Select"
import AddFieldButton from "../../components/AddFieldButton"
import { useFormCreation } from "../../store/formCreation"
import { getPrefixFromString } from "../../utils/getPrefixFromString"

interface FieldComponentsReturn {
    [key: string]: ReactElement
}

const fieldComponents = (fieldId: string): FieldComponentsReturn => ({
    text: <TextForm key={fieldId} id={fieldId}/>,
    textarea: <TextAreaForm key={fieldId} id={fieldId}/>,
    select: <SelectForm key={fieldId} id={fieldId}/>,
    radio: <TextForm key={fieldId} id={fieldId}/>,
})

const FormCreationPage = () => {
    const { fieldsIds } = useFormCreation()

    return (
        <Box>
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
                        return fieldComponents(fieldId)[getPrefixFromString(fieldId)]
                    })}
                </React.Fragment>
                <AddFieldButton />
            </form>
        </Box>
    )
}

export default FormCreationPage