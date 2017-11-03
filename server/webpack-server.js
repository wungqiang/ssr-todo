import baseConfig from '../webpack/base.config';
import config from '..//webpack/dev.config';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const options = {
    contentBase: `http://${baseConfig.host}:${baseConfig.port}`,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: config.output.publicPath,
    headers: {
        "Access-Control-Allow-Origin": "*"
    },
    stats: {
        colors: true
    }
};

exports.start = function() {
    const compiler = webpack(config);
    const webpackDevServer = new WebpackDevServer(compiler, options);

    return webpackDevServer.listen(baseConfig.port, baseConfig.host, function() {
        console.log("webpack: Compiling on %s:%s", baseConfig.host, baseConfig.port);
    });
}
