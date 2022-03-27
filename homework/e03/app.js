const express = require("express");
const app = express();
const port = 3000;
const locations = require("./routes/locations.js");

app.use("/locations", locations);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// app.get("/", function (req, res) {
//   res.send("hello world");
// });

// node app.js to start the server or
// nodemon app.js to start using nodemon
// or add "start": "nodemon app.js"to package.json scripts > npm start
