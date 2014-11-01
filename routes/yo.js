var express = require('express');
var router = express.Router();
var querystring = require('querystring');

router.get('/',function(req,res){
	var query = querystring.parse(url.parse(request.url).query);
	console.log(query);
});

module.exports = router;
