import { shallow } from 'zustand/shallow'

import { FormCreationStore as Store } from './types'
import store from './store'

export const useFormCreation = (): Store => {
  return store((state) => state, shallow)
}
