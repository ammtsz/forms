const path = require('path');
const { dependencies } = require("./package.json");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = {
  webpack: {
    alias: {
      '@app': path.resolve(__dirname, 'src'),
    },
    configure: {
      output: {
        publicPath: 'auto'
      }
    },
    plugins: {
      add: [new ModuleFederationPlugin(
        (module.exports = {
          name: "creation",
          exposes: {
            "./CreationPage": "./src/pages/FormCreation",
          },
          filename: "remoteEntry.js",
          shared: {
            ...dependencies,
            react: {
              singleton: true,
              requiredVersion: dependencies["react"],
            },
            "react-dom": {
              singleton: true,
              requiredVersion: dependencies["react-dom"],
            },
          },
        })
      )]
    }
  },
};