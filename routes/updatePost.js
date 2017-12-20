var express = require('express');
var router = express.Router();
let repo = require('../models/blogRepo');

/* GET Update Post page for rendering. */
router.get('/:linkName', function(req, res, next) {
    var post = req.params.linkName;
    var blog = repo.getPostByLink(post);
  res.render('updatePost', {author: blog.author, title: blog.title , blogContent: blog.postContent, linkName: blog.linkName});
});

/* POST - Write data from form (edit Post) to file */

router.post('/',(req, res, next) =>{
    if(req.body.passPhrase == "secretCode"){
    if(req.body.actionButton == "update"){
    let changePost = {};
    changePost.title = req.body.title;
    changePost.author = req.body.author;
    changePost.postContent = req.body.blog;
    changePost.linkName = req.body.linkName;

    repo.updatePost(changePost);
    } else {
        repo.deletePost(req.body.linkName);
    }
    };

    res.redirect("/");   /* send back to home page */
})
module.exports = router;