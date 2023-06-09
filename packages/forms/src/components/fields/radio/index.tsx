import React, { useCallback, useEffect, useState } from "react"
import { RadioGroup, Radio, Text, RadioGroupProps, RadioProps } from "@chakra-ui/react"

import { OptionsFormProps } from "../../../types/form.types"
import { useForm } from "../../../store/form"

const RadioSelect: React.FC<OptionsFormProps> = ({
    id,
    label,
    placeholder,
    required,
    options,
    dependsOn,
    value: intitialValue,
    description
}) => {
    const [value, setValue] = useState('')
    const [isVisible, setVisible] = useState(false)

    const { setFieldValue, getField } = useForm()

    const handleChange = useCallback((option: string) => {
        setValue(option)
        setFieldValue(id, option)
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
                <RadioGroup
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={value}
                    // required={required}
                >
                    <React.Fragment>
                        {options?.map((option) => 
                            <Radio key={option.value} value={option.value}>{option.label}</Radio>
                        )}
                    </React.Fragment>
                </RadioGroup>
            </React.Fragment>
            : null
    )
}

export default RadioSelect