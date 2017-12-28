var express = require('express');
var router = express.Router();
let repo = require('../models/blogRepo');
let picRepo = require('../models/picDesc');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { /*title: 'Express' */   blogPosts: repo.posts(), asideContent: picRepo.getDescByLink("contact")});
});

module.exports = router;
