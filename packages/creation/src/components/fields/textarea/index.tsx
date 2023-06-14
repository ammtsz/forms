import React from "react"
import { Textarea, Input, Flex, Box } from "@chakra-ui/react"

const TextareaForm: React.FC<{id: string}> = ({ id }) => {
    // const [value, setValue] = useState('')
    
    // const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    //     setValue(event.target.value)
    //     setFieldValue(id, event.target.value)
    // }, [id, setFieldValue])

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
            <Input
                variant='unstyled'
                color="blackAlpha.900"
                _placeholder={{ color: 'inherit' }}
                placeholder='Adicione uma pergunta'
            />
            <Textarea
                variant='unstyled'
                color="blackAlpha.600"
                _placeholder={{ color: 'inherit' }}
                size='sm'
                placeholder='Adicione uma decrição'
            />
            <Box mt="2" borderRadius="5" width="100%" height="48" bg="whiteAlpha.700"/>
            
        </Flex>
    )
}

export default TextareaForm