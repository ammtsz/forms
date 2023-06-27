import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@chakra-ui/react"

interface GoToFormButtonProps {
    title: string
    id: string
}

const GoToFormButton: React.FC<GoToFormButtonProps> = ({ title, id }) => {
    const navigation = useNavigate()

    const handleRedirect = useCallback(() => {
        navigation(`/form?id=${id}`)
    }, [id, navigation])

    return (
        <Button
            onClick={handleRedirect}
            minH={40}
            minW={80}
            boxShadow={"md"}
        >
            {title || <i>Sem título</i>}
        </Button>
    )
}

export default GoToFormButton