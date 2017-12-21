const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "data");
const fileName = path.join(filePath, "blogData.json");

let blogList = [];

let savePosts = () => {
    fs.writeFile(fileName, JSON.stringify(blogList), (err) => {
        if (err) {
            console.log("Error writing file!  Abort!" + err.message);
            throw (err);
        } else {
            console.log("The file: " + fileName + " has been saved.  Sweet!");
        }
    });
};

let loadPosts = () => {
    fs.readFile(fileName, "utf8", (err, data) => {
        if (err) {
            console.log("Error reading file.  Darnit! " + err.message);
         //   throw err;
        } else {
            console.log("File has been loaded!  Yay!");
            let loadPosts = JSON.parse(data);
            blogList = loadPosts;
        }

    });
};


let repository = {
    dataSource: "Filesystem",
    postCount: blogList.length,
    posts: () => { return blogList; },
    getPostByLink: (linkName) => {
        return blogList.find((blog) => {
            return blog.linkName === linkName;
        });
    },
    updatePost: (changePost) => {
        blogList.forEach(function(item, index, array){
            if (item.linkName == changePost.linkName) {
                array[index].title = changePost.title;
                array[index].author = changePost.author;
                array[index].postContent = changePost.postContent;
                savePosts();
            };
        });
    },
    addPost: (newBlog) => {
        blogList.push(newBlog);
        savePosts();


    },
    deletePost: (linkName) => {
        blogList.forEach(function(item, index, array){
            if (item.linkName == linkName){
                array.splice(index, 1);
                savePosts();
            }
        });
    }
}

loadPosts();

module.exports = repository;

