var express = require('express');
var router = express.Router();

router.get('/:upvotes&:downvotes', function(req, res) {
	var differences = req.params.upvotes - req.params.downvotes;
	if (differences > 0)
  		res.render('results', { title: 'Yolloween', count: differences, picture_path: '/assets/images/checkmark_xl.png' });
  	else
  		res.render('results', { title: 'Yolloween', count: differences, picture_path: '/assets/images/cross_xl.png' });
});

module.exports = router;
