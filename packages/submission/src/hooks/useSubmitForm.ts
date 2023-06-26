import { useFormSubmission } from "../store/formSubmission"
import { FormResponse } from "../store/formSubmission/types"

const useSubmitForm = () => {
    const { submitForm, fields } = useFormSubmission()

    const handleSubmit: React.FormEventHandler = async (event) => {
        event.preventDefault()

        const formResponse = {} as FormResponse

        fields.forEach(field => {
            formResponse[field.id] = {
                id: field.id,
                value: field.value
            }
        })

        console.log({ formResponse })
        await submitForm(formResponse)
    }

    return ({
        handleSubmit
    })
}

export default useSubmitForm