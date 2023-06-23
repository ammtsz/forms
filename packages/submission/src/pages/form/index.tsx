import React, { ReactElement, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Button, Flex, Text } from "@chakra-ui/react"

import { form as formSettings, initialValues } from "../../config/forms/registration" 
import { TextFormProps, OptionsFormProps } from "../../types/form.types"
import { useForm } from "../../store/form"

import TextForm from "../../components/text"
import SelectForm from "../../components/select"

import useSubmitForm from "../../hooks/useSubmitForm"

interface FieldComponentsReturn {
    [key: string]: ReactElement
}

const fieldComponents = ( props: TextFormProps | OptionsFormProps ): FieldComponentsReturn => ({
    text: <TextForm {...props}/>,
    select: <SelectForm {...props as OptionsFormProps}/>,
})

const FormPage = () => {
    const { getForm, fields, setFieldsInitialValues } = useForm()

    const { handleSubmit } = useSubmitForm()

    const { search } = useLocation()
    const id = new URLSearchParams(search).get('id');

    useEffect(() => {
        if(id) {
            getForm(id)
        }
    }, [getForm, setFieldsInitialValues, id])

    useEffect(() => {
        if(initialValues) {
            setFieldsInitialValues(initialValues)
        }
    }, [getForm, setFieldsInitialValues, id])

    return (
        <Flex>
            <form>
                <Text>{ formSettings.title }</Text>
                <React.Fragment>
                    {fields.map(( field ) => (
                        <Flex key={field.id} p={4} direction="column">
                            {fieldComponents(field)[field.type]}
                        </Flex>
                    ))}
                </React.Fragment>
                <Button onClick={handleSubmit}>Enviar</Button>
            </form>
        </Flex>
    )
}

export default FormPage