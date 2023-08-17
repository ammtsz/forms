import { create } from "zustand";

import { uuid } from "@forms/utils";

import { FormCreationState, FormCreationStore } from "./types";

const INITIAL_STATE: FormCreationState = {
  topic: "",
  messages: [],
  interval: [],
  lastMessage: "",
  newField: "",
};

const store = create<FormCreationStore>((set, get) => ({
  topic: INITIAL_STATE.topic,
  messages: INITIAL_STATE.messages,
  interval: INITIAL_STATE.interval,
  lastMessage: INITIAL_STATE.lastMessage,
  newField: INITIAL_STATE.newField,

  updateTopic: (topic: string) => {
    set({ topic });
  },

  generateTitleAndDescription: async () => {
    const data = await fetch("/api/openai/title", {
      method: "POST",
      body: JSON.stringify({
        content: get().topic,
      }),
    });

    console.log({ data });
    const response = await data.json();

    if (response.error) {
      return { error: response.error };
    }

    console.log({ response });

    const titleAndDescription = JSON.parse(response);

    console.log({ titleAndDescription });

    return titleAndDescription;
  },

  generateField: async () => {
    const data = await fetch("/api/openai/field", {
      method: "POST",
      body: JSON.stringify({
        content: get().topic,
        messages: get().messages,
      }),
    });

    console.log({ data });
    const response = await data.json();

    if (response.error) {
      return { error: response.error };
    }

    console.log({ response });

    get().updateMessages(response);

    const field = JSON.parse(response);

    field.id = `${field.type}--${uuid()}`;

    console.log({ field });

    return field;
  },

  updateMessages: (content) => {
    set(({ messages }) => ({
      messages: [
        ...messages,
        {
          role: "assistant",
          content,
        },
      ],
    }));
  },

  reset: () => set((state) => ({ ...state, ...INITIAL_STATE })),
}));

export default store;
