import React from "react"
import { Flex, Button, Switch } from "@chakra-ui/react"
import { useSelect } from "../hooks/useSelect"
import SelectOptions from "./Options"
import SelectHeader from "./Header"

const SelectCreation: React.FC<{id: string}> = ({ id }) => {
    const {
        handleInputChange,
        handleCheckbox,
        handleDelete,
        handleSave,
        handleAddOption,
        handleOptionChange,
        handleDeleteOption,
        toggleOtherOption,
        handleOtherOption,
        value,
        isSaved
    } = useSelect({id})
    
    return (
        <Flex
            direction="column"
            py="12"
            px="8"
            my="10"
            bg="blackAlpha.100"
            borderRadius="10"
            width="80vw"
        >
            <SelectHeader 
                handleInputChange={handleInputChange}
                handleDelete={handleDelete}
                value={value}
            />
            <SelectOptions
                handleAddOption={handleAddOption}
                handleOptionChange={handleOptionChange}
                handleDeleteOption={handleDeleteOption}
                toggleOtherOption={toggleOtherOption}
                handleOtherOption={handleOtherOption}
                value={value}
            />
            <Switch
                mt="5"
                mr="auto"
                onChange={handleCheckbox}
            >
                Campo obrigatório
            </Switch>
            <Button
                m="auto"
                mt="3"
                bg="cyan.500"
                color="white"
                onClick={handleSave}
                isDisabled={isSaved}
            >
                Salvar alterações
            </Button>
            
        </Flex>
    )
}

export default SelectCreation