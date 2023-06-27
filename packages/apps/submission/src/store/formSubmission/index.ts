import { shallow } from 'zustand/shallow'

import { FormSubmissionStore as Store } from './types'
import store from './store'

export const useFormSubmission = (): Store => {
  return store((state) => state, shallow)
}
