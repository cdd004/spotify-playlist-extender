var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Search = mongoose.model('Search');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* get a previous search */
router.get('/searches', function(req, res, next) {
	Search.find(function(err, search) {
		if(err) {return next(err);}

		res.json(search);
	});
});

/* post a performed search into mongo db */
router.post('/searches', function(req, res, next) {
	var search = new Search(req.body);

	search.save(function(err, search) {
		if(err) {return next(err);}

        res.json(search);
	});
});

module.exports = router;
