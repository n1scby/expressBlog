const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "data");
const fileName = path.join(filePath, "picData.json");

let picList = [];

let loadDesc = () => {
    fs.readFile(fileName, "utf8", (err, data) => {
        if (err) {
            console.log("Error reading pic file.  Darnit! " + err.message);
         //   throw err;
        } else {
            console.log("Pic File has been loaded!  Yay!");
            let loadData = JSON.parse(data);
            picList = loadData;
        }

    });
};

let repository = {
    dataSource: "Filesystem",
    picDescList: () => { return picList; },
    getDescByLink: (linkName) => {
        let page = picList.find((pageLink) => {
            return pageLink.page === linkName;
        });
        return page.picDesc;
    }
}


loadDesc();

module.exports = repository;

