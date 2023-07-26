const path = require("path");

const { dependencies } = require("./package.json");

const submissionPath = process.env.SUBMISSION_URL
const creationPath = process.env.CREATION_URL
const viewPath = process.env.VIEW_URL

const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = {
  webpack: {
    alias: {
      "@app": path.resolve(__dirname, "src"),
    },
    configure: {
      output: {
        publicPath: "auto",
      },
    },
    plugins: {
      add: [
        new ModuleFederationPlugin(
          (module.exports = {
            name: "admin",
            shared: {
              ...dependencies,
              react: {
                singleton: true,
                requiredVersion: dependencies.react,
              },
              "react-dom": {
                singleton: true,
                requiredVersion: dependencies["react-dom"],
              },
            },
          })
        ),
      ],
    },
  },
};
