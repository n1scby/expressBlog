var express = require('express');
var router = express.Router();
let repo = require('../models/blogRepo');


/* GET Add Post page for rendering. */
router.get('/', function(req, res, next) {
  res.render('editPost', {author: "", title: "", blogContent: "", linkName: "", imageName: "", altDesc: "", picDesc: "", pageTitle: "Add Blog Post", addUpdate: "add a ", readOnly: "", addButtonClass: "d-block", updateButtonClass: "d-none", formAction: "/addPost", errorMessage: "Nothing here" });
});

/* POST - Write data from form (add Post) to file */

router.post('/', (req, res, next) =>{
    let errorCount = 0;
    let errorMessage = "";
    if (req.body.title == "") {
      errorMessage += "Title must be entered <br>";
      errorCount++;
    }
    if (req.body.blog == "") {
      errorMessage += "Blog content must be entered <br>";
      errorCount++;
    }
    if (req.body.linkName == "") {
      errorMessage += "Link Name must be entered <br>";
      errorCount++;
    }
    if (req.body.imageName == "") {
      errorMessage += "Image Name must be entered <br>";
      errorCount++;
    }
    if (req.body.picDesc == "") {
      errorMessage += "Picture description must be entered <br>";
      errorCount++;
    }
    if (req.body.passPhrase != "secretCode") {
      errorMessage += "Invalid passPhrase <br>";
      errorCount++;
    }

    if (repo.getPostByLink(req.body.linkName)) {
      errorMessage += "Link Name already used.";
      errorCount++;
    }

    if (errorCount > 0) {
  
      // There are errors. Render form again with sanitized values/errors messages.
      res.render('editPost', {author: req.body.author, title: req.body.title, blogContent: req.body.blog, linkName: req.body.linkName, imageName: req.body.imageName, altDesc: req.body.altDesc, picDesc: req.body.picDesc, pageTitle: "Add Blog Post", addUpdate: "add a ", readOnly: "", addButtonClass: "d-block", updateButtonClass: "d-none", formAction: "/addPost", errorMessage: errorMessage});
      return;
  }
  else {
      // Data from form is valid.
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
    res.redirect("/");   /* send back to home page */
    };
  }
};

    
})
module.exports = router;