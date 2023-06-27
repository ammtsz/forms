import { shallow } from 'zustand/shallow'

import { FormViewStore as Store } from './types'
import store from './store'

export const useFormView = (): Store => {
  return store((state) => state, shallow)
}
