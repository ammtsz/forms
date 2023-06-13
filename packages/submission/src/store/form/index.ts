import { shallow } from 'zustand/shallow'

import { FormStore as Store } from './types'
import store from './store'

export const useForm = (): Store => {
  return store((state) => state, shallow)
}
