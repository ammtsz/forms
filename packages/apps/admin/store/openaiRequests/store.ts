import { create } from "zustand";

import { OptionsField } from "@forms/types/interfaces/field";
import { isOptionTypeField, uuid } from "@forms/utils";

import { FormCreationState, FormCreationStore, Message } from "./types";

const INITIAL_STATE: FormCreationState = {
  topic: "",
  messages: [],
  interval: [],
};

const store = create<FormCreationStore>((set, get) => ({
  topic: INITIAL_STATE.topic,
  messages: INITIAL_STATE.messages,
  interval: INITIAL_STATE.interval,

  updateTopic: (topic: string) => {
    set({ topic });
  },

  generateTitleAndDescription: async (lang) => {
    const data = await fetch("/api/openai/title", {
      method: "POST",
      body: JSON.stringify({
        content: get().topic,
        lang,
      }),
    });

    const response = await data.json();

    if (response.error) {
      return { error: response.error };
    }

    const titleAndDescription = JSON.parse(response);

    return titleAndDescription;
  },

  generateField: async (lang) => {
    const data = await fetch("/api/openai/field", {
      method: "POST",
      body: JSON.stringify({
        content: get().topic,
        messages: get().messages,
        lang,
      }),
    });

    const response = await data.json();

    if (response.error) {
      return { error: response.error };
    }

    get().addMessage(response);

    const field = JSON.parse(response);

    field.id = `${field.type}--${uuid()}`;

    return field;
  },

  addMessage: (content) => {
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

  updateMessages: (fields) => {
    const currentFields = [...fields];
    const messages: Message[] = [];

    currentFields.forEach((field) => {
      if (field.label) {
        const options = isOptionTypeField(field.type)
          ? { options: (field as OptionsField).options }
          : {};

        messages.push({
          role: "assistant",
          content: JSON.stringify({
            type: field.type,
            label: field.label,
            isRequired: field.isRequired,
            placeholder: field.placeholder,
            description: field.description,
            ...options,
          }),
        });
      }
    });

    set({ messages });
  },

  reset: () => set((state) => ({ ...state, ...INITIAL_STATE })),
}));

export default store;
