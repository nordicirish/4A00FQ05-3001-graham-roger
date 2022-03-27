const express = require("express");
const locations = express.Router();
// const location1 = { id: 1, latitude: 60, longitude: 60 };
// const location2 = { id: 2, latitude: 40, longitude: 80 };

locations.get("/", (req, res) => {
  res.send("Getting All locations");
});

locations.get("/1", (req, res) => {
  res.send("Getting location with id 1");
});

locations.get("/2", (req, res) => {
  res.send("Getting location with id 2");
});

locations.post("/", (req, res) => {
  res.send("Adding new location");
});

locations.delete("/1", (req, res) => {
  res.send("Delete location with id 1");
});

locations.use("/location", locations);

module.exports = locations;
