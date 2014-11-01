var express = require('express');
var router = express.Router();
var querystring = require('querystring');

router.get('/yo',function(req,res){
	console.log("Yo Request");
});


router.get('/upvote',function(req,res){
	var query = querystring.parse(url.parse(request.url).query);
	console.log(query);
});


router.get('/downvote',function(req,res){
	var query = querystring.parse(url.parse(request.url).query);
	console.log(query);
});

module.exports = router;
