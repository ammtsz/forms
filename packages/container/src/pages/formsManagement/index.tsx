import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Flex } from "@chakra-ui/react"

import { useFormsManagement } from "@app/store/formsManagement"

import GoToFormButton from "@app/components/GoToFormButton"

const FormCreationPage = () => {
    const [formsNames, setFormsNames] = useState<{title: string, id:string}[]>([])
    
    const { getForms, getFormsNamesAndIds } = useFormsManagement()

    const navigate = useNavigate()
    
    const loadForms = useCallback(async () => {
        await getForms()
        getFormsNamesAndIds()
        setFormsNames(getFormsNamesAndIds())
    }, [getForms, getFormsNamesAndIds])
    
    useEffect(() => {
        loadForms()
    }, [loadForms])

    return (
        <Flex gap={4} direction={"column"} maxWidth={"1200px"} margin={"auto"}>
            <Flex justifyContent={"center"} gap={4} flexWrap={"wrap"}>
                <Button
                    onClick={() => navigate("/create")}
                    minH={40}
                    minW={80}
                    bg={"blackAlpha.800"}
                    color={"white"}
                    _hover={{bg: "whiteAlpha.800", color: "inherit"}}
                    boxShadow={"md"}
                >
                    + Criar novo formulário
                </Button>
                {formsNames.map((form) => <GoToFormButton key={form.id} {...form} />)}
            </Flex>
        </Flex>
    )
}

export default FormCreationPage