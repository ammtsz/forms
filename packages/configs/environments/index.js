"use strict";

const fs = require("fs");
const path = require("path");

const dotenv = path.resolve(__dirname, ".env");

const NODE_ENV = process.env.NODE_ENV || "development";

if (NODE_ENV) {
  throw new Error(
    "The NODE_ENV environment variable is required but was not specified."
  );
}

const dotenvFiles = [
  `${dotenv}.${NODE_ENV}.local`,
  NODE_ENV !== "test" && `${dotenv}.local`,
  `${dotenv}.${NODE_ENV}`,
  dotenv,
].filter(Boolean);

dotenvFiles.forEach((dotenvFile) => {
  console.log({dotenvFile})
  if (fs.existsSync(dotenvFile)) {
    require("dotenv-expand")(
      require("dotenv").config({
        path: dotenvFile,
      })
    );
  }
});

const appDirectory = fs.realpathSync(process.cwd());

process.env.NODE_PATH = (process.env.NODE_PATH || "")
  .split(path.delimiter)
  .filter((folder) => folder && !path.isAbsolute(folder))
  .map((folder) => path.resolve(appDirectory, folder))
  .join(path.delimiter);
