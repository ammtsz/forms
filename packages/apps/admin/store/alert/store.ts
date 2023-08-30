import { create } from "zustand";

import { AlertStore, AlertState } from "./types";

const INITIAL_STATE: AlertState = {
  type: "info",
  message: "",
  isClosable: true,
};

const store = create<AlertStore>((set) => ({
  type: INITIAL_STATE.type,
  message: INITIAL_STATE.message,
  isClosable: INITIAL_STATE.isClosable,

  setType: (type) => set({ type }),

  setMessage: (message) => set({ message }),

  setClosable: (isClosable) => set({ isClosable }),

  reset: () => set((state) => ({ ...state, ...INITIAL_STATE })),
}));

export default store;
