/* eslint-disable @typescript-eslint/no-var-requires */
const NextFederationPlugin = require("@module-federation/nextjs-mf");

const { dependencies } = require("./package.json");

module.exports = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "auth",
          filename: "static/chunks/remoteEntry.js",
          remotes: {
            admin:
              "admin@http://localhost:3000/_next/static/chunks/remoteEntry.js",
            submission: "submission@http://localhost:3001/remoteEntry.js",
          },
          exposes: {
            "./Navbar": "./components/Navbar/index.tsx",
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

    config.images = {
      domains: ["lh3.googleusercontent.com"],
    };
  },
};
