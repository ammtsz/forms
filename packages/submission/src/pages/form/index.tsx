import React, { ReactElement, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Button, Flex, FormControl, Heading } from "@chakra-ui/react"

import { initialValues } from "../../config/forms/registration" 
import { TextFormProps, OptionsFormProps } from "../../types/form.types"
import { useForm } from "../../store/form"

import TextForm from "../../components/text"
import SelectForm from "../../components/select"

import useSubmitForm from "../../hooks/useSubmitForm"

import { Container, Form, Field } from "./styles"

interface FieldComponentsReturn {
    [key: string]: ReactElement
}

const fieldComponents = ( props: TextFormProps | OptionsFormProps ): FieldComponentsReturn => ({
    text: <TextForm {...props}/>,
    select: <SelectForm {...props as OptionsFormProps}/>,
})

const FormPage = () => {
    const { getForm, setFieldsInitialValues, fields, title } = useForm()

    const { handleSubmit } = useSubmitForm()

    const { search } = useLocation()
    const id = new URLSearchParams(search).get('id')

    useEffect(() => {
        if(id) {
            getForm(id)
        }
    }, [getForm, setFieldsInitialValues, id])

    // useEffect(() => {
    //     if(initialValues) {
    //         setFieldsInitialValues(initialValues)
    //     }
    // }, [getForm, setFieldsInitialValues, id])

    return (
        <Container>
            <Form as="form" onSubmit={handleSubmit}>
                <Heading as="h1" fontSize={"lg"}>{title.toUpperCase()}</Heading>
                <React.Fragment>
                    {fields.map(( field ) => (
                        <Field key={field.id}>
                            {fieldComponents(field)[field.type]}
                        </Field>
                    ))}
                </React.Fragment>
                <Button mt={10} type={"submit"} bg={"black"} color={"white"}>Enviar</Button>
            </Form>
        </Container>
    )
}

export default FormPage