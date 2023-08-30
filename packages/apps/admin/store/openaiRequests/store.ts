import { create } from "zustand";

import { OptionsField } from "@forms/types/interfaces/field";
import { isOptionTypeField, uuid } from "@forms/utils";

import { FormCreationState, FormCreationStore, Message } from "./types";

const INITIAL_STATE: FormCreationState = {
  topic: "",
  messages: [],
  isVisible: false,
  isDisabled: true,
  interval: [],
};

const store = create<FormCreationStore>((set, get) => ({
  topic: INITIAL_STATE.topic,
  messages: INITIAL_STATE.messages,
  isVisible: INITIAL_STATE.isVisible,
  isDisabled: INITIAL_STATE.isDisabled,
  interval: INITIAL_STATE.interval,

  updateTopic: (topic: string) => {
    set({ topic });
  },

  generateTitleAndDescription: async (lang) => {
    const messages = [
      ...get().messages,
      {
        role: "user",
        content: "Give me a title and a description based on existing fields.",
      },
    ];

    const data = await fetch("/api/openai/title", {
      method: "POST",
      body: JSON.stringify({
        content: get().topic,
        messages: get().messages.length ? messages : [],
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

  generateField: async (lang, description) => {
    const formDescription = description
      ? [
          {
            role: "user",
            content: `form description: ${description}`,
          },
        ]
      : [];

    const messages = [
      ...formDescription,
      ...get().messages,
      {
        role: "user",
        content: "Give me a new field, different from previous ones.",
      },
    ];

    const data = await fetch("/api/openai/field", {
      method: "POST",
      body: JSON.stringify({
        content: get().topic,
        messages: get().messages.length ? messages : [...formDescription],
        lang,
      }),
    });

    const response = await data.json();

    if (response.error) {
      return { error: response.error };
    }

    get().addMessage(response);

    const field = JSON.parse(response);

    field.id = `${field.type || "text"}--${uuid()}`;

    return field;
  },

  addMessage: (content) => {
    set(({ messages }) => ({
      messages: [
        ...messages,
        {
          role: "user",
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
        const options =
          isOptionTypeField(field.type) &&
          (field as OptionsField).options?.map(({ label }) => label).join(", ");

        messages.push({
          role: "user",
          content: `just created a field of type '${field.type}' with label: '${
            field.label
          }' ${options ? `and options: ${options}` : ""}`,
        });
      }
    });

    set({ messages });
  },

  setVisible: (isVisible) => {
    set({ isVisible });
  },

  setDisabled: (isDisabled) => {
    set({ isDisabled });
  },

  reset: () => set((state) => ({ ...state, ...INITIAL_STATE })),
}));

export default store;
