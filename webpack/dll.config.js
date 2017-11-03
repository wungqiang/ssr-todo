var path = require('path');
var webpack = require('webpack');
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
var distPath = path.resolve(__dirname, '../public');

var vendors = [
    'react',
    'react-dom',
    'react-router',
    'redux',
    'react-redux',
    'history',
    'isomorphic-fetch'
];

module.exports = {
    devtool: "source-map",
    output: {
        path: distPath,
        filename: "js/core/[name].dll.js",
        library: '[name]_[chunkhash]'
    },
    entry: {
        vendor: vendors
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            except: ['$super', '$', 'exports', 'require']
        }),
        new webpack.DllPlugin({
            path: path.resolve(distPath, 'manifest.json'),
            name: '[name]_[chunkhash]',
            context: distPath
        }),
        new StatsWriterPlugin({
            filename: 'stats.json',
            transform: function(data, opts) {
                return JSON.stringify({
                    vendor: data.assetsByChunkName.vendor[0]
                }, null, 2);
            }
        })
    ]
};
