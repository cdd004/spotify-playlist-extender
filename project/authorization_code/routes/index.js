var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Search = mongoose.model('Search');
var config = require('../../config.json');

var fm_key = config.fm_key;
console.log(fm_key);

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/* get a previous search */
router.get('/searches', function(req, res, next) {
	Search.find(function(err, search) {
		if(err) {return next(err);}
		console.log(search);
		res.json(search);
	});
});

/* post a performed search into mongo db */
router.post('/searches', function(req, res, next) {
	var search = new Search(req.body);
	console.log('req.body = ' + req.body);

	search.save(function(err, search) {
		if(err) {return next(err);}

        res.json(search);
	});
});

// router.get('/config', function(req, res, next){
// 	var configinfo = req.body;
// 	res.json(configinfo);
// });



module.exports = router;






