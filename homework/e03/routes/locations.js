const express = require("express");
const locations = express.Router();

const location = { id: 1, latitude: 60, longitude: 60 };
locations.get("/1", (req, res) => {
  res.send(location);
});
locations.use("/location", locations);

module.exports = locations;
