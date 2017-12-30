var express = require('express');
var router = express.Router();
let repo = require('../models/blogRepo');

/* GET Update Post page for rendering. */
router.get('/:linkName', function(req, res, next) {
    var post = req.params.linkName;
    var blog = repo.getPostByLink(post);
  res.render('editPost', {author: blog.author, title: blog.title, blogContent: blog.postContent, linkName: blog.linkName, imageName: blog.imageName, altDesc: blog.altDesc, picDesc: blog.picDesc, pageTitle: "Update Blog Post", addUpdate: "update the ", readOnly: "readonly", addButtonClass: "d-none", updateButtonClass: "d-inline", formAction: "/updatePost" });
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
    changePost.altDesc = req.body.altDesc;
    changePost.imageName = req.body.imageName;
    changePost.picDesc = req.body.picDesc;

    repo.updatePost(changePost);
    } else {
        repo.deletePost(req.body.linkName);
    }
    };

    res.redirect("/");   /* send back to home page */
})
module.exports = router;