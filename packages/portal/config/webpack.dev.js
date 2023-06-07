const { merge } = require("webpack-merge")
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const commonConfig = require('./webpack.common.js')
const packageJson = require('../package.json')

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:3000/'
    },
    devServer: {
        port: 3000,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'portal',
            filename: 'remoteEntry.js',
            remotes: {
                forms: 'forms@http://localhost:3001/remoteEntry.js',
            },
            shared: packageJson.dependencies,
        }),
    ]
}

module.exports = merge(commonConfig, devConfig)