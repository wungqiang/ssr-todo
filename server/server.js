require('babel-core/register');
require('babel-polyfill');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');

var app = express();
var routes = require('./routes');
var staticPath = path.join(__dirname, '../public');
var viewPath = path.join(__dirname, './views');
var config = require('./config');

app.engine('swig', swig.renderFile);
app.set('view engine', 'swig');
app.set('views', viewPath);
app.set('view cache', false);
swig.setDefaults({ cache: false });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(config.staticRoute, express.static(staticPath));
app.use(routes);

app.disable('x-powered-by');

exports.start = () => {
    return new Promise((resolve, reject) => {
      var server = app.listen(config.port, function () {
        console.log('listen on ', config.port);
        resolve({ app: app, server: server });
      });
    });
};
