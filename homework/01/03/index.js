// Import the filesystem module
const fs = require("fs");

function readFilesFromDir(path) {
  function myFunc(resolve, reject) {
    fs.readdir(path, (err, files) => {
      //output error message
      if (err) reject(err);
      else {
        //output filenames as an array
        resolve(files);
      }
    });
  }

  let promise = new Promise(myFunc);
  return promise;
}

readFilesFromDir("./hello")
  .then((files) => console.log(files))
  .catch((err) => console.log("error: " + err));

/* 
doSomething that takes time working code
function doSomethingThatTakesTime() {
  function myFunc(resolve, reject) {
    let value = Math.floor(Math.random() * 2);
    if (value == 0) {
      resolve("We are done");
    } else {
      reject("Something went wrong");
    }
  }
  let promise = new Promise(myFunc);
  return promise;
}

let p = doSomethingThatTakesTime();
p.then((result) => console.log(result)).catch((err) =>
  console.log("error: " + err)
);
 */
