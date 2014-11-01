var db = require('monk')(process.env.MONGODB_LINK);
var users = db.get('users');
var location = db.get('locations');

function upVote(username, location){
	
}

function downVote(username, location){

}

function getRating(location){

}

exports.upVote = upVote;
exports.downVote = downVote;
exports.getRating = getRating;