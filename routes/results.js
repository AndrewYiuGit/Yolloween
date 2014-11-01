var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var url = require('url');

router.get('/', function(req, res) {
	var differences = parseInt(querystring.parse(url.parse(req.url).query).count);
	if (differences > 0)
  		res.render('results', { title: 'Yolloween', count: differences, picture_path: '/assets/images/checkmark_m.png' });
  	else
  		res.render('results', { title: 'Yolloween', count: differences, picture_path: '/assets/images/cross_m.png' });
});

module.exports = router;
