var express = require('express');
var router = express.Router();
var cors = require('../middlewares/cors');

// store data in memory
var data = [];

// get list
router.get('/', cors(), function (req, res) {
    res.json({succ: true, data: data});
});

// get item
router.get('/:id', cors(), function (req, res) {
  let items = data.filter((item) => { return item.id === req.params.id});

  res.json({succ: items.length > 0, data: items.length ? items[0] : null});
});

// add
router.post('/', cors(), function (req, res) {
  var id = Math.random().toString().substring(2);
  data.push({ id: id, content: req.body.content });
  res.json({succ: true, data: id});
});

// remove
router.delete('/:id', cors(), function (req, res) {
  data.forEach((item, index) => {
    item.id === req.params.id && data.splice(index, 1);
  });
  res.json({succ: true});
});

// edit
router.put('/:id', cors(), function (req, res) {
  data.forEach((item) => {
    if (item.id === req.params.id) {
      item.content = req.body.content;
    }
  });
  res.json({succ: true});
});

module.exports = router;
