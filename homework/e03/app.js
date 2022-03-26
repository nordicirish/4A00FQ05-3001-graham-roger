var express = require("express");
var app = express();
const port = 3000;

app.get("/", function (req, res) {
  res.send("hello world");
});

// node app.js to start the server or
// nodemon app.js to start using nodemon
// confirm app server running on port 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
