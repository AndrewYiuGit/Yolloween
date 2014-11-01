var express = require('express');
var router = express.Router();

router.get('/good/:count', function(req, res) {
  res.render('results', { title: 'Yolloween', count: req.params.count, picture_path: '/assets/images/checkmark_xl.png' });
});

router.get('/bad/:count', function(req, res) {
  res.render('results', { title: 'Yolloween', count: req.params.count, picture_path: '/assets/images/cross_xl.png' });
});

module.exports = router;
