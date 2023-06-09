import { useForm } from "../store/form"

const useSubmitForm = () => {
    const { fieldsIds, fields } = useForm()

    // const validateForm = () => {

    // }

    const handleSubmit = () => {
        const formResponse = fieldsIds.map(fieldId => {
            return ({
                id: fields[fieldId].id,
                value: fields[fieldId].value
            })
        })

        console.log({ formResponse })
    }

    return ({
        handleSubmit
    })
}

export default useSubmitForm