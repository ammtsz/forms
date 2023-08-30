import { MakeOptional } from "@forms/types/global/makeOptional";
import { FieldProps } from "@forms/types/interfaces/field";

export interface TitleAndDescription {
  title: string;
  description: string;
  error?: string;
}

export interface Message {
  role: "user";
  content: string;
}

type Field = FieldProps & {
  error?: string;
};

type Fields = MakeOptional<FieldProps, "id">[];

export interface FormCreationState {
  topic: string;
  messages: Message[];
  isVisible: boolean;
  isDisabled: boolean;
  interval: string[];
}

export interface FormCreationStore extends FormCreationState {
  updateTopic: (topic: string) => void;
  generateTitleAndDescription: (lang: string) => Promise<TitleAndDescription>;
  generateField: (lang: string, description?: string) => Promise<Field>;
  addMessage: (content: string) => void;
  updateMessages: (fields: Fields) => void;
  setVisible: (isOpen: boolean) => void;
  setDisabled: (isOpen: boolean) => void;
  // TODO:
  // calculateInterval: () => number; // [123131231, 131231231231, 1231312312]
  // updateIntervals: (interval: number) => void;
  reset: () => void;
}
