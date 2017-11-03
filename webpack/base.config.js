var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var host = process.env.HOST || '0.0.0.0';
var port = (parseInt(process.env.PORT) + 1) || 4001;
var dist = path.resolve(__dirname, '../public/js');

var rules = [{
    test: /\.less$/,
    use: [
        'style-loader',
        'css-loader',
        'less-loader'
    ]
}, {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    use: ["file-loader"]
}, {
    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)$/,
    use: ["url-loader?prefix=font/&limit=5000"]
}, {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    use: ["url-loader?limit=10000&mimetype=application/octet-stream"]
}, {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: ["url-loader?limit=10000&mimetype=image/svg+xml"]
}];

var productionRules = rules.concat([{
    test: /\.jsx?$/,
    exclude: function(path) {
      // 路径中含有 node_modules 的就不去解析。
      var isNpmModule = !!path.match(/node_modules/);
      return isNpmModule;
    },
    use: ['babel-loader']
}, {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
    })
}, {
    test: /\.scss$/,
    use: [ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
    }), 'autoprefixer-loader', 'sass-loader']
}, {
    test: /.*\.(gif|png|jpe?g|svg)$/i,
    use: [
        'url-loader?limit=8192&hash=sha512&digest=hex&name=images/[hash].[ext]',
        'image-webpack-loader'
    ]
}, {
    test: /\.(woff|woff2|eot|ttf)$/,
    use: ['url-loader?limit=10000']
}]);


var developRules = rules.concat([{
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    use: ["react-hot-loader/webpack", "babel-loader"]
}, {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
}, {
    test: /\.scss$/,
    use: ["style-loader", "css-loader", "autoprefixer-loader?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true"]
}, {
    test: /\.(jpe?g|png|gif|svg|woff(2)?|eot|ttf)$/,
    use: ["url-loader?limit=9000"]
}]);

module.exports = {
    host: host,
    port: port,
    dist: dist,
    publicPath: "http://" + host + ":" + port + "/static/",
    devtool: 'source-map',
    productionRules: productionRules,
    developRules: developRules
};
