import { MakeOptional } from "@forms/types/global/makeOptional";
import { FieldProps } from "@forms/types/interfaces/field";

export interface TitleAndDescription {
  title: string;
  description: string;
  error?: string;
}

export interface Message {
  role: "assistant";
  content: string;
}

type Field = FieldProps & {
  error?: string;
};

type Fields = MakeOptional<FieldProps, "id">[];

export interface FormCreationState {
  topic: string;
  messages: Message[];
  interval: string[];
}

export interface FormCreationStore extends FormCreationState {
  updateTopic: (topic: string) => void;
  generateTitleAndDescription: (lang: string) => Promise<TitleAndDescription>;
  generateField: (lang: string) => Promise<Field>;
  addMessage: (content: string) => void;
  updateMessages: (fields: Fields) => void;
  // TODO:
  // calculateInterval: () => number; // [123131231, 131231231231, 1231312312]
  // updateIntervals: (interval: number) => void;
  // isAIDisabled: () => boolean;

  reset: () => void;
}
