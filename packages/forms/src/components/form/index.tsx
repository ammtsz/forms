import React, { ReactElement, useEffect } from "react"
import { Button, Text } from "@chakra-ui/react"

import { form as formSettings, initialValues } from "../../config/forms/registration" 
import { TextFormProps, OptionsFormProps } from "../../types/form.types"
import { useForm } from "../../store/form"

import TextForm from "../fields/text"
import SelectForm from "../fields/select"
import RadioForm from "../fields/radio"

import useSubmitForm from "../../hooks/useSubmitForm"

interface FieldComponentsReturn {
    [key: string]: ReactElement
}

const fieldComponents = ( props: TextFormProps | OptionsFormProps ): FieldComponentsReturn => ({
    text: <TextForm {...props} key={props.id}/>,
    select: <SelectForm {...props as OptionsFormProps} key={props.id}/>,
    radio: <RadioForm {...props as OptionsFormProps} key={props.id}/>,
})

const Form = () => {
    const { setFields, fieldsIds, getField, setFieldsInitialValues } = useForm()

    const { handleSubmit } = useSubmitForm()

    useEffect(() => {
        setFields(formSettings.fields)
        
        if(initialValues) {
            setFieldsInitialValues(initialValues)
        }
    }, [setFields, setFieldsInitialValues])

    return (
        <form>
            <Text>{ formSettings.title }</Text>
            <React.Fragment>
                {fieldsIds.map(( fieldId ) => {
                    const field = getField(fieldId)
                    return fieldComponents(field)[field.type]
                })}
            </React.Fragment>
            <Button onClick={handleSubmit}>Enviar</Button>
        </form>
    )
}

export default Form