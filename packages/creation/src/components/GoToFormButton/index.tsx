import { useCallback } from "react"
import { Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

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
        <Button m={3} onClick={handleRedirect} height={40} width={80}>
            {title || <i>Sem título</i>}
        </Button>
    )
}

export default GoToFormButton