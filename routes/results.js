var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var url = require('url');

router.get('/', function(req, res) {
	var differences = parseInt(querystring.parse(url.parse(req.url).query).count);
	if (differences > 0)
  		res.render('results', { title: 'Yolloween', count: differences, picture_path: '/assets/images/checkmark_xl.png' });
  	else
  		res.render('results', { title: 'Yolloween', count: differences, picture_path: '/assets/images/cross_xl.png' });
});

module.exports = router;
