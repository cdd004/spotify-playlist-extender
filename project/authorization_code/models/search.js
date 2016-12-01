var mongoose = require('mongoose');

//schema for storing searches performed by a user
var SearchSchema = new mongoose.Schema({
	searchfield: String
});

var Search = mongoose.model('Search', SearchSchema);

module.exports = Search;