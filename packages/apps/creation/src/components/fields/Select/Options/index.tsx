import React from "react"
import { Trash as TrashIcon } from "react-feather"
import { Input, Flex, Button, Text } from "@chakra-ui/react"

import { OptionsFormProps } from "@forms/types/interfaces/field"

interface SelectOptionsProps {
    handleAddOption: React.MouseEventHandler<HTMLButtonElement>
    handleOptionChange: React.FormEventHandler<HTMLInputElement>
    handleDeleteOption: React.MouseEventHandler<HTMLButtonElement>
    toggleOtherOption: React.MouseEventHandler<HTMLButtonElement>
    handleOtherOption: React.FormEventHandler<HTMLInputElement>
    value: Omit<OptionsFormProps, "id" | "type">
}

const SelectOptions: React.FC<SelectOptionsProps> = ({
    handleAddOption,
    handleOptionChange,
    handleDeleteOption,
    toggleOtherOption,
    handleOtherOption,
    value
}) => {
    return (
        <>
            {value.options.map(({ label }, index) => (
                <Flex key={index}>
                    <Input
                        variant='flushed'
                        name={`${index}--option`}
                        mt="3"
                        placeholder='Adicione uma opção'
                        onChange={handleOptionChange}
                        value={label}
                    />
                    <Button
                        onClick={handleDeleteOption}
                        ml="auto"
                        py="3"
                        color="blackAlpha.700"
                        bg="transparent"
                        data-index={index}
                        _hover={{ backgroundColor: "transparent", color: "red.700" }}
                    >
                        <TrashIcon />
                    </Button>
                </Flex>

            ))}
            <Button mt="3" mr="auto" bg="transparent" onClick={handleAddOption} >+ Adicionar opção</Button>
            {
                value.optionOther.isVisible
                ? <>
                    <Text mt="3" ml="1" mr="auto">Outros</Text>
                    <Flex>
                        <Input
                            name="optionOther"
                            bg="white"
                            border="none"
                            mt="1"
                            placeholder='Adicione um placeholder para o campo outros (opcional)'
                            onChange={handleOtherOption}
                            value={value.optionOther.placeholder}
                        />
                        <Button
                            onClick={toggleOtherOption}
                            ml="auto"
                            py="3"
                            color="blackAlpha.700"
                            bg="transparent"
                        >
                            <TrashIcon />
                        </Button>
                    </Flex>
                </>
                : <Button mt="3" mr="auto" bg="transparent" onClick={toggleOtherOption}>+ Adicionar campo "outros"</Button>
            }
        </>
    )
}

export default SelectOptions