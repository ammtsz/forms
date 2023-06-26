import React, { useCallback, useState } from "react"
import { Trash as TrashIcon } from "react-feather"
import { Textarea, Input, Flex, Button, Switch } from "@chakra-ui/react"

import { useFormCreation } from "@app/store/formCreation"

const TextCreation: React.FC<{id: string}> = ({ id }) => {
    const [value, setValue] = useState({
        title: "",
        description: "",
        placeholder: "",
        isRequired: false,
    })

    const { deleteField, updateField } = useFormCreation()
    
    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = useCallback((event) => {
        setValue(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
        updateField({
            id,
            type: "text",
            label: value.title,
            placeholder: value.placeholder,
            description: value.description,
            required: value.isRequired,
        })
    }, [id, updateField, value.description, value.isRequired, value.placeholder, value.title])

    const handleCheckbox = useCallback(() => {
        setValue((prev) => ({
            ...prev,
            isRequired: !prev.isRequired
        }))
        updateField({
            id,
            type: "text",
            label: value.title,
            placeholder: value.placeholder,
            description: value.description,
            required: value.isRequired,
        })
    }, [id, updateField, value.description, value.isRequired, value.placeholder, value.title])

    const handleDelete = useCallback(() => {
        deleteField(id)
    }, [deleteField, id])

    return (
        <Flex
            direction="column"
            py="12"
            px="8"
            my="4"
            bg="blackAlpha.100"
            borderRadius="10"
            width="80vw"
        >
            <Flex flexDir="row-reverse">
                <Button
                    onClick={handleDelete}
                    ml="auto"
                    py="3"
                    color="red.500"
                    bg="transparent"
                    _hover={{ backgroundColor: "transparent", color: "red.700" }}
                >
                    <TrashIcon />
                </Button>
                <Input
                    name="title"
                    variant='unstyled'
                    color="blackAlpha.900"
                    _placeholder={{ color: 'inherit' }}
                    placeholder='Adicione uma pergunta'
                    mr="3"
                    onChange={handleChange}
                    value={value.title}
                />
            </Flex>
            <Textarea
                name="description"
                variant='unstyled'
                color="blackAlpha.600"
                _placeholder={{ color: 'inherit' }}
                size='sm'
                placeholder='Adicione uma decrição'
                onChange={handleChange}
                value={value.description}
            />
            <Input
                name="placeholder"
                color="blackAlpha.500"
                _placeholder={{ color: 'inherit' }}
                bg="white"
                border="none"
                mt="3"
                placeholder='Adicione um placeholder (opcional)'
                onChange={handleChange}
                value={value.placeholder}
            />
            <Switch mt="5" mr="auto" onChange={handleCheckbox}>Campo obrigatório</Switch>
            
        </Flex>
    )
}

export default TextCreation