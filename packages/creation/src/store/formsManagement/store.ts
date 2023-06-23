import { create } from 'zustand'

import { FormsManagementState, FormsManagementStore} from './types'

import { getForms as getFormsFromDb } from '../../api/services/forms'

const INITIAL_STATE: FormsManagementState = {
  isLoading: false,
  errors: null,
  forms: []
}

const store = create<FormsManagementStore>((set, get) => ({
  isLoading: INITIAL_STATE.isLoading,
  errors: INITIAL_STATE.errors,
  forms: INITIAL_STATE.forms,

  getForms: async () => {
    if(get().forms.length) return get().forms
    // TODO: stop calling forms from db in both management and submission pages 
    const forms = (await getFormsFromDb())
    set({ forms })

    return forms
  },

  getFormsNamesAndIds: () => {
    return get().forms.map(form => ({ title: form.title as string, id: form.id as string}))
  },

  reset: () => set(state => ({ ...state, ...INITIAL_STATE }))
}))

export default store
