import { FieldProps } from "@forms/types/interfaces/field";

interface TitleAndDescription {
  title: string;
  description: string;
  error?: string;
}

interface Message {
  role: "assistant";
  content: string;
}

type Field = FieldProps & {
  error?: string;
};

export interface FormCreationState {
  topic: string;
  messages: Message[];
  interval: string[];
  lastMessage: string;
  newField: string;
}

export interface FormCreationStore extends FormCreationState {
  updateTopic: (topic: string) => void;
  generateTitleAndDescription: () => Promise<TitleAndDescription>;
  generateField: () => Promise<Field>;
  updateMessages: (content: string) => void;
  // calculateInterval: () => number; // [123131231, 131231231231, 1231312312]
  // updateIntervals: (interval: number) => void;
  // isAIDisabled: () => boolean;

  reset: () => void;
}
