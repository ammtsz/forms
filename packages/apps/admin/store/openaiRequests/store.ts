import { create } from "zustand";

import { OptionsField } from "@forms/types/interfaces/field";
import { isOptionTypeField, uuid } from "@forms/utils";

import { FormCreationState, FormCreationStore, Message } from "./types";

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

    get().addMessage(response);

    const field = JSON.parse(response);

    field.id = `${field.type}--${uuid()}`;

    console.log({ field });

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
    console.log({ fields });
    const currentFields = [...fields];
    const messages: Message[] = [];

    currentFields.forEach((field) => {
      if (field.label) {
        console.log({ field });

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

    console.log({ messages });
  },

  reset: () => set((state) => ({ ...state, ...INITIAL_STATE })),
}));

export default store;
