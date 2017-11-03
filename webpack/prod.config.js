var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
var fs = require('fs');
var _ = require('lodash');

var baseConfig = require('./base.config');

var statsPath = path.resolve(baseConfig.dist, 'stats');
var statsJson = fs.existsSync(statsPath) ? require(statsPath) : {};

var manifestPath = path.resolve(baseConfig.dist, 'manifest.json');
var manifestJson = fs.existsSync(manifestPath) ? require(manifestPath) : {};

module.exports = {
    devtool: "source-map",
    entry: {
        main: ['./client/app.js']
    },
    output: {
        path: baseConfig.dist,
        filename: "/js/[name]-[hash].js",
        chunkFilename: '/js/[name]-[chunkhash].js',
        publicPath: '/s/'
    },
    module: {
        rules: baseConfig.productionRules
    },
    resolve: {
        modulesDirectories: ['app', 'browser', 'node_modules'],
        extensions: ['*', '.js', '.json']
    },
    imageWebpackLoader: {
        progressive: true,
        optimizationLevel: 3,
        interlaced: false,
        pngquant: {
            quality: "65-90",
            speed: 4
        },
        svgo: {
            plugins: [{
                removeViewBox: false
            }, {
                removeEmptyAttrs: false
            }]
        }
    },
    plugins: [
        // ignore dev config
        new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
        new webpack.BannerPlugin('This file is created by newcw'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                'WEBPACK': true,
                'DISABLE_ISOMORPHISM': false
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            except: ['$super', '$', 'exports', 'require']
        }),
        new ExtractTextPlugin('css/[name]-[chunkhash].css', {
            allChunks: false
        }),
        new StatsWriterPlugin({
            filename: 'stats.json',
            transform: function(data, opts) {
                delete statsJson.main;
                delete statsJson.css;
                var output = {
                    main: data.assetsByChunkName.main[0],
                    css: data.assetsByChunkName.main[1]
                };
                output = _.merge(output, statsJson);
                return JSON.stringify(output, null, 2);
            }
        }),
        new webpack.DllReferencePlugin({
            context: baseConfig.dist,
            manifest: manifestJson
        }),
        new webpack.NoErrorsPlugin()
    ]
};
