/* eslint-disable @typescript-eslint/no-var-requires */
const NextFederationPlugin = require("@module-federation/nextjs-mf");

const { dependencies } = require("./package.json");

module.exports = {
  webpack(config, { isServer }) {
    if (!isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "admin",
          filename: "static/chunks/remoteEntry.js",
          remotes: {
            auth: "auth@http://localhost:3002/_next/static/chunks/remoteEntry.js",
          },
          exposes: {
            "./components": "./components/ConfirmationModal/index.tsx",
          },
          shared: {
            ...dependencies,
            react: {
              eager: true,
              singleton: true,
              requiredVersion: dependencies.react,
            },
            "react-dom": {
              singleton: true,
              requiredVersion: dependencies["react-dom"],
            },
          },
          extraOptions: {
            exposePages: true,
          },
        })
      );
    }

    config.reactStrictMode = true;

    return config;
  },
};
