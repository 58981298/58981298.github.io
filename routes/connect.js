var mongo = require("mongodb")
	, monk = require("monk");
var db = monk("localhost:27017/clary")

db.get("usercollection")