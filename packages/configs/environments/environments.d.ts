declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly APP_ENV: "staging" | "production";
    readonly PUBLIC_URL: string;

    REACT_APP_FIREBASE_API_KEY: string;
    REACT_APP_FIREBASE_PROJECT_ID: string;
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID: string;
    REACT_APP_FIREBASE_APP_ID: string;
  }
}
