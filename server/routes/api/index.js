var express = require('express');
var router = express.Router();

router.use('/todo', require('./todo'));

// 404
router.use(function (req, res, next) {
    var err = new Error('api not found');
    err.status = 404;
    next(err);
});

// err handle
router.use(function(err, req, res, next) {
    res.status(err.status || 500);

    res.json({
        succ: false,
        message: err.message
    });
});

module.exports = router;
