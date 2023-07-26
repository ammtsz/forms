const eslintConfig = require("@forms/eslint-config");

module.exports = {
  ...eslintConfig,
  plugins: [
    ...eslintConfig.plugins,
    "react-hooks",
  ],
  extends: [
  ...eslintConfig.extends,
    "plugin:react-hooks/recommended"
  ]
};
