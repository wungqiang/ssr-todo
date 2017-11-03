const server = require('./server/server');
const webpackServer = require('./server/webpack-server');
const serverPromise = server.start();
const httpProxy = require('http-proxy').createProxyServer();
const config = require('./server/config');

if (process.env.NODE_ENV === 'develop') {
  serverPromise.then(function (instance) {
    instance.app.all(config.publicPath + '/*', (req, res) => {
      proxy.web(req, res, {
        target: 'http://localhost:4001'
      });
    });
    webpackServer.start();
  });
}
