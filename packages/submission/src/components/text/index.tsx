import React, { useCallback, useEffect, useState } from "react"
import { Input, Text } from "@chakra-ui/react"
import { TextFormProps } from "../../types/form.types"
import { useForm } from "../../store/form"

const TextForm: React.FC<TextFormProps> = ({
    id,
    label,
    placeholder,
    required,
    dependsOn,
    value: intitialValue,
    description
}) => {
    const [value, setValue] = useState('')
    const [isVisible, setVisible] = useState(true)

    const { updateFieldValue, getField } = useForm()
    
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        setValue(event.target.value)
        updateFieldValue(id, event.target.value)
    }, [id, updateFieldValue])

    const requiredField = dependsOn && getField(dependsOn.fieldId)

    useEffect(() => {
        if(intitialValue && intitialValue.length) {
            setValue(intitialValue)
        }
    }, [intitialValue])

    useEffect(() => {
        if(requiredField) {
            const isValidValue = dependsOn.optionsId.some((validOption) => requiredField.value?.includes(validOption))

            setVisible(isValidValue)
        } else {
            setVisible(true)
        }
    }, [dependsOn, getField, requiredField])

    return (
        isVisible
            ? <React.Fragment>
                <Text fontSize="lg">{label}</Text>
                <Text fontSize="sm" mb={2} color={"gray"}>{description}</Text>
                <Input
                    required={required}
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={value}
                    bg={"white"}
                    boxShadow={"inner"}
                />
            </React.Fragment>
            : null
    )
}

export default TextForm