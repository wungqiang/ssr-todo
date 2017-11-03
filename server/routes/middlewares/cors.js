module.exports = function () {
    var method = 'GET,POST,PUT,OPTIONS,DELETE';

    return function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', method);
        next();
    };
};
