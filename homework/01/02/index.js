// Node.js program to demonstrate the
// fs.readdir() method

// Import the filesystem module
const fs = require("fs");

// Function to get current filenames
// in directory
fs.readdir(__dirname, (err, files) => {
  if (err) console.log("error reading directory");
  else {
    console.log(files);
    files.forEach((file) => {
      fs.readFile(file, "utf8", function (err, data) {
        if (err) console.log("error reading file");
        // Display the file content
        else {
          console.log("reading " + file);
          console.log(data);
        }
      });
    });
  }
});
