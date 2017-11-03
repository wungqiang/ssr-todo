var path = require('path');
var webpack = require('webpack');
var WebpackErrorNotificationPlugin = require("webpack-error-notification");
var baseConfig = require('./base.config');
var appEntry = './client/app.js';

module.exports = {
    devtool: "source-map",
    entry: [
        "webpack-dev-server/client?http://" + baseConfig.host + ":" + baseConfig.port,
        "webpack/hot/only-dev-server",
        appEntry
    ],
    output: {
        filename: "bundle.js",
        chunkFilename: "[name].bundle.js",
        path: baseConfig.dist,
        publicPath: baseConfig.publicPath
    },
    module: {
        rules: baseConfig.developRules
    },
    resolve: {
        modules: [
            'node_modules'
        ],
        extensions: ['*', '.js', '.json']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development'),
                'WEBPACK': true,
                'BROWSER': true
            }
        }),
        new WebpackErrorNotificationPlugin()
    ]
};
