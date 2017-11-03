var moment = require('moment');
var config = require('../../config');

function isOlderIE(ua) {
    return ua.indexOf('MSIE 6.0') > -1 || ua.indexOf('MSIE 7.0') > -1;
}

function getStaticPath(path) {
    return config.publicPath + '/' + path;
}

module.exports = function (req, res, next) {
    var userAgent = req.headers['user-agent'],
        language = req.headers['accept-language'],
        isEn, uri;

    isEn= language ? language.toLowerCase().indexOf('en-us') > -1 : false;
    uri = req.protocol + '://' + req.hostname + req.path;

    res.locals.Global = {
        path: getStaticPath,
        moment: moment,
        isEn: isEn,
        ip: req.ip,
        uri: uri,
        config: config
    };

    next();
};
