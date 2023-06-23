import { useCallback, useState } from "react"
import { Button, Accordion, AccordionItem, AccordionButton, AccordionPanel } from "@chakra-ui/react"
import { v4 as uuid } from "uuid"

import { useFormCreation } from "../../store/formCreation"


const FIELD_BUTTONS = [
    {
        label: "Texto curto",
        value: "text"
    },
    {
        label: "Texto longo",
        value: "textarea"
    },
    {
        label: "Seleção de lista",
        value: "select"
    },
    {
        label: "Radio",
        value: "radio"
    },
    {
        label: "Checkbox",
        value: "checkbox"
    },
    {
        label: "Switch",
        value: "switch"
    },
]

const AddFieldButton = () => {
    const [accordionIndex, setAccordionIndex] = useState<number[]>([])
    
    const { addField } = useFormCreation()

    const handleNewFieldClick = useCallback((type: string) => {
        addField({
            id: `${type}--${uuid()}`,
            label: "",
            type,

        })
        setAccordionIndex([])
    }, [addField])

    const renderButton = (label: string, value: string) => (
        <Button
            bg="whiteAlpha.900"
            my="1"
            onClick={() => handleNewFieldClick(value)}
            key={value}
        >
            {label}
        </Button>
    )

    return (
        <Accordion index={accordionIndex} allowMultiple borderColor="transparent" mt="3">
                <AccordionItem>
                    <AccordionButton
                        as={Button}
                        bg="blackAlpha.700"
                        _hover={{bg: "blackAlpha.800"}}
                        color="white"
                        height="10"
                        width="80vw"
                        onClick={() => setAccordionIndex([0])}
                    >
                        Adicionar campo
                    </AccordionButton>
                    <AccordionPanel pb={4} display="flex" flexDir="column" bg="blackAlpha.500">
                        {FIELD_BUTTONS.map(( {label, value }) => renderButton(label, value))}
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
    )
}


export default AddFieldButton