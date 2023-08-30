import { Session } from "next-auth";

export interface UserSession extends Session {
  user?: Session["user"] & {
    id?: string;
    forms?: string[];
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  picture: string;
}

export interface FieldComponentProps {
  id: string;
  isDisabled?: boolean;
}