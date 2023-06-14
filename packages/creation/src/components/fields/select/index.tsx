import React, { useCallback, useEffect, useState } from "react"
import { Select, Text } from "@chakra-ui/react"

import { OptionsFormProps } from "../../../types/form.types"
import { useForm } from "../../../store/form"

const FormSelect: React.FC<OptionsFormProps> = ({
    id,
    label,
    placeholder,
    required,
    options,
    dependsOn,
    description,
    value: intitialValue
}) => {
    const [value, setValue] = useState('')
    const [isVisible, setVisible] = useState(false)

    const { setFieldValue, getField } = useForm()

    const handleChange: React.ChangeEventHandler<HTMLSelectElement> = useCallback((event) => {
        setValue(event.target.value)
        setFieldValue(id, event.target.value)
    }, [id, setFieldValue])

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
                <Text>{label}</Text>
                <Text fontSize="sm">{description}</Text>
                <Select
                    required={required}
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={value}
                >
                    <React.Fragment>
                        {options?.map((option) => 
                            <option key={option.value} value={option.value}>{option.label}</option>
                        )}
                    </React.Fragment>
                </Select>
            </React.Fragment>
            : null
    )
}

export default FormSelect