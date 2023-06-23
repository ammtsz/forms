import { shallow } from 'zustand/shallow'

import { FormsManagementStore as Store } from './types'
import store from './store'

export const useFormsManagement = (): Store => {
  return store((state) => state, shallow)
}
