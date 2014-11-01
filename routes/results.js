var express = require('express');
var router = express.Router();

router.get('/good', function(req, res) {
  res.render('yo_good_results', { title: 'Yolloween' });
});

router.get('/bad', function(req, res) {
  res.render('yo_bad_results', { title: 'Yolloween' });
});

module.exports = router;
