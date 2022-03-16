const fs = require("fs");

function readFilesFromDir(path) {
  function myFunc(resolve, reject) {
    fs.readdir(path, (err, files) => {
      //output error message
      if (err) reject(err);
      else {
        //output filenames as an array
        resolve(files);
        return files;
      }
    });
  }

  let promise = new Promise(myFunc);
  return promise;
}

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

readFilesFromDir(".")
  // need to use Promise.all to wait for the output of the map loop
  .then((files) =>
    Promise.all(
      files.map((file) => {
        readFile;
        return readFile(file);
        // need to specify the promise return
      })
    )
  )

  .then((files) => files.forEach((file) => console.log(file)))
  // thank f*** it works at last!!
  .catch((err) => console.log("error: " + err));
