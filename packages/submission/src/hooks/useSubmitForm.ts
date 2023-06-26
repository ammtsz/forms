import { useFormSubmission } from "@app/store/formSubmission"
import { FormValuesProps } from "@app/types"

const useSubmitForm = () => {
    const { submitForm, fields } = useFormSubmission()

    const handleSubmit: React.FormEventHandler = async (event) => {
        event.preventDefault()

        const formResponse = {} as FormValuesProps

        fields.forEach(field => {
            formResponse[field.id] = {
                id: field.id,
                value: field.value as string
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