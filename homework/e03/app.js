var express = require("express");
var app = express();
const port = 3000;
var router = express.Router();
const location = { id: 1, latitude: 60, longitude: 60 };

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

router.get("/1", (req, res) => {
  res.send(location);
});

// router level middleware
// router has a base path of location
app.use("/location", router);

app.get("/", function (req, res) {
  res.send("hello world");
});

// app.use("/hello", (req, res, next) => {
//   console.log("hello");
//   next();
// });
// app.use("/world", (req, res, next) => {
//   console.log("world");
//   next();
// });
// node app.js to start the server or
// nodemon app.js to start using nodemon
// or add "start": "nodemon app.js"to package.json scripts > npm start
