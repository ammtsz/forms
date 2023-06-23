import { useCallback, useEffect, useState } from "react"
import { Box, Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

import { useFormsManagement } from "../../store/formsManagement"

import GoToFormButton from "../../components/GoToFormButton"

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
        <Box>
            {formsNames.map((form) => <GoToFormButton key={form.id} {...form} />)}
            <Button onClick={() => navigate("/create")}>Criar Form</Button>
        </Box>
    )
}

export default FormCreationPage