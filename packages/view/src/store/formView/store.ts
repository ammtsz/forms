import { create } from 'zustand'
import { getFormResponses as getFormResponsesFromDb, getForm as getFormFromDb} from '../../api/services/forms' 
import { FormViewState, FormViewStore } from './types'

const INITIAL_STATE: FormViewState = {
  isLoading: false,
  errors: null,
  id: "",
  title: "",
  fields: [],
  responses: [],
}

const store = create<FormViewStore>((set, get) => ({
  isLoading: INITIAL_STATE.isLoading,
  errors: INITIAL_STATE.errors,
  id: INITIAL_STATE.id,
  title: INITIAL_STATE.title,
  fields: INITIAL_STATE.fields,
  responses: INITIAL_STATE.responses,

  getFormResponses: async (formId) => {
    const responses = await getFormResponsesFromDb(formId);
    set({ responses })

    return responses
  },

  getForm: async (formId) => {
    const form = await getFormFromDb(formId);
    set({
      id: form.id,
      title: form.title,
      fields: form.fields,
    })

    return form
  },

  reset: () => set(state => ({ ...state, ...INITIAL_STATE }))
}))

export default store
