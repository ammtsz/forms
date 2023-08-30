export type AlertTypes = "info" | "success" | "warning" | "error";

export interface AlertState {
  type: AlertTypes;
  message: string;
  isClosable: boolean;
}

export interface AlertStore extends AlertState {
  setType(type: AlertTypes): void;
  setMessage(message: string): void;
  setClosable(isClosable: boolean): void;
  reset(): void;
}
