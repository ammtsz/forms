import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  output: {
    dir: "build",
    format: "esm",
  },
  plugins: [typescript()],
};
