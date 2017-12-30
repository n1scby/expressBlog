var express = require('express');
var router = express.Router();
let repo = require('../models/blogRepo');

/* GET Add Post page for rendering. */
router.get('/', function(req, res, next) {
  res.render('editPost', {author: "", title: "", blogContent: "", linkName: "", imageName: "", altDesc: "", picDesc: "", pageTitle: "Add Blog Post", addUpdate: "add a ", readOnly: "", addButtonClass: "d-block", updateButtonClass: "d-none", formAction: "/addPost" });
});

/* POST - Write data from form (add Post) to file */

router.post('/',(req, res, next) =>{
    if(req.body.passPhrase == "secretCode"){
      if(req.body.actionButton == "add") {
    let newPost = {};
    newPost.title = req.body.title;
    newPost.author = req.body.author;
    newPost.postContent = req.body.blog;
    newPost.linkName = req.body.linkName;
    newPost.altDesc = req.body.altDesc;
    newPost.imageName = req.body.imageName;
    newPost.picDesc = req.body.picDesc;

    repo.addPost(newPost);
    };
  }

    res.redirect("/");   /* send back to home page */
})
module.exports = router;