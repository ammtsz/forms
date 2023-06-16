import React, { useCallback, useState } from "react"
import { useFormCreation } from "../../../store/formCreation"
import { getPrefixFromString } from "../../../utils/getPrefixFromString"

interface SelectProps { 
    id: string
}

const useSelect = ({ id }: SelectProps) => {
    const [value, setValue] = useState({
        label: "",
        description: "",
        isRequired: false,
        options: [{label: "", value: ""}],
        optionOther: {isVisible: false, placeholder: ""}
    })
    const [isSaved, setSaved] = useState(true)

    const { deleteField, updateField } = useFormCreation()
    
    const handleInputChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = useCallback((event) => {
        setValue(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
        setSaved(false)
    }, [])

    const handleCheckbox = useCallback(() => {
        setValue((prev) => ({
            ...prev,
            isRequired: !prev.isRequired
        }))
        setSaved(false)
    }, [])

    const handleDelete = useCallback(() => {
        deleteField(id)
        setSaved(false)
    }, [deleteField, id])

    const handleSave: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
        // handleClearEmptyFields()
        updateField({
            id,
            type: getPrefixFromString(id),
            label: value.label,
            description: value.description,
            required: value.isRequired,
            options: value.options,
            optionOther: value.optionOther,
        })
        setSaved(true)
    }, [id, updateField, value.description, value.isRequired, value.optionOther, value.options, value.label])

    const handleAddOption: React.MouseEventHandler<HTMLButtonElement>= useCallback(() => {
        setValue(prev => ({
            ...prev,
            options: [...prev.options, {
                label: "",
                value: "",
            }]
        }))
    }, [])

    const handleOptionChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        const options = [...value.options]
        const index = Number(getPrefixFromString(event.target.name))
        options[index] = {
            label: event.target.value,
            value: event.target.value,
        }
        setValue(prev => ({
            ...prev,
            options
        }))
        setSaved(false)
    }, [value.options])

    const handleDeleteOption: React.MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
        const index = Number(event.currentTarget.getAttribute('data-index'))
        const options = [...value.options]
        options.splice(index, 1)
        setValue(prev => ({
            ...prev,
            options
        }))
        setSaved(false)
    }, [value.options])

    const toggleOtherOption = useCallback(() => {
            setValue(prev => ({
                ...prev,
                optionOther: {
                    ...prev.optionOther,
                    isVisible: !prev.optionOther.isVisible
                }
            }))
        setSaved(false)
    }, [])

    const handleOtherOption: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        setValue(prev => ({
            ...prev,
            optionOther: {
                ...prev.optionOther,
                placeholder: event.target.value
            }
        }))
        setSaved(false)
    }, [])

    return {
        handleInputChange,
        handleCheckbox,
        handleDelete,
        handleSave,
        handleAddOption,
        handleOptionChange,
        handleDeleteOption,
        toggleOtherOption,
        handleOtherOption,
        isSaved,
        value
    }
}

export { useSelect }