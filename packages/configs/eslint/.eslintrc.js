module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  ignorePatterns: [
    ".eslintrc.js",
    "jest.config.js",
    "/**/*.spec.js",
    "/**/*.spec.ts",
    "/**/*.spec.tsx",
    "dist",
    "types",
    "/**/types",
    "build",
    "craco.config.js",
    "environments",
  ],
  extends: [
    "standard",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:react/jsx-runtime",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    "react",
    "import",
    "@typescript-eslint",
    "prettier",
    "eslint-plugin-import-helpers",
    "promise",
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/no-unescaped-entities": 0,
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "import-helpers/order-imports": [
      "error",
      {
        newlinesBetween: "always",
        groups: [
          "module",
          "/^@forms/",
          "/^@app/",
          ["parent", "sibling", "index"],
        ],
        alphabetize: { order: "asc", ignoreCase: true },
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "_",
        varsIgnorePattern: "_",
      },
    ],
    "import/extensions": "off",
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: ["packages/**/tsconfig.json"],
      },
    },
    react: {
      version: "detect",
    },
  },
};
