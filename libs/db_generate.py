import os
from random import randrange
from pymongo import MongoClient

def generate(street_name, numbers):
	client = MongoClient(os.environ['MONGODB_LINK'])
	locations = client['heroku_app31166658']['locations']
	for i in range(0, numbers):
		street_number = str(randrange(1000))
		full_address = street_number + " " + street_name
		data = {}
		data["full_address"] = full_address
		data["street"] = street_name
		data["street_number"] = street_number
		data["users"] = []
		data["upvote"] = randrange(10)
		data["downvote"] = randrange(10)
		# print data
		locations.insert(data)

generate("Chapel Street",24)



