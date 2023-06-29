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
          name: "container",
          remotes: {
            submission: `submission@http://localhost:3001/remoteEntry.js`,
            creation: `creation@http://localhost:3002/remoteEntry.js`,
            view: `view@http://localhost:3003/remoteEntry.js`,
          },
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