var express = require('express');
var router = express.Router();
let repo = require('../models/blogRepo');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { /*title: 'Express' */   blogPosts: repo.posts()});
});

module.exports = router;
