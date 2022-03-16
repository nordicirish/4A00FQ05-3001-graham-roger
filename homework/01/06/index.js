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

function readFile(file) {
  function myFunc(resolve, reject) {
    fs.readFile(file, "utf8", (err, data) => {
      //output error message
      if (err) reject(err);
      else {
        resolve(data);
      }
    });
  }

  let promise = new Promise(myFunc);
  return promise;
}

async function readFiles(path) {
  try {
    // implement await syntax here, outputs to screen
    // content of each file that is available in given path
    let files = await readFilesFromDir(path);
    // console.log(files);
    let fileArray = await Promise.all(
      files.map((file) => {
        readFile;
        return readFile(file);
        // need to specify the promise return
      })
    );
    fileArray.forEach((file) => console.log(file));
  } catch (err) {
    console.log(err);
  }
}
readFiles(".");
