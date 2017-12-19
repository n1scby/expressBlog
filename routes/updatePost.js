var express = require('express');
var router = express.Router();
let repo = require('../models/blogRepo');

/* GET Add Post page for rendering. */
router.get('/', function(req, res, next) {
  res.render('editPost', { });
});

/* POST - Write data from form (edit Post) to file */

router.post('/',(req, res, next) =>{
    if(req.body.passPhrase == "secretCode"){
    let newPost = {};
    newPost.title = req.body.title;
    newPost.author = req.body.author;
    newPost.postContent = req.body.blog;
    newPost.linkName = req.body.linkName;

    repo.addPost(newPost);
    };

    res.redirect("/");   /* send back to home page */
})
module.exports = router;