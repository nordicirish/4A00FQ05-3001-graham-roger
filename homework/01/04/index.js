// Import the filesystem module
const fs = require("fs");

function readFile(file) {
  function myFunc(resolve, reject) {
    fs.readFile(file, "utf8", (err, data) => {
      //output error message
      if (err) reject(err);
      else {
        //output filenames as an array
        resolve(data);
      }
    });
  }

  let promise = new Promise(myFunc);
  return promise;
}

readFile("package.json")
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
