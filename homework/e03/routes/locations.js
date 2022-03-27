const express = require("express");
const locations = express.Router();
const locationSchema = require("../location-schema.json");
const validate = require("../my-validator.js");

//middleware to parse Json
locations.use(express.json());
id = 0;
let database = [
  { id: ++id, latitude: 60, longitude: 60 },
  { id: ++id, latitude: 40, longitude: 80 },
  { id: ++id, latitude: 40, longitude: 80 },
];

locations.get("/", (req, res) => {
  res.send({ "Getting All locations": database });
});

// number entered at the end of url is stored as a variable id
// ([0-9]+) Regex to check number is 0-9 can be chained for bigger numbers

locations.get("/:id([0-9]+)", (req, res) => {
  id = req.params.id;
  // use array find method to search database
  // Number(id) as id is converted from a string
  const found = database.find((location) => location.id === Number(id));
  if (found) {
    res.send("Getting location with id " + id);
    // res.send(found);
  } else {
    res.status(404).end();
  }
});

locations.post("/", (req, res) => {
  let newLocation = req.body;
  let validation = validate(newLocation, locationSchema);
  if (!validation.success) {
    //400 (Bad Request)
    res.status(400);
    res.send(validation.errors);
  } else {
    newLocation.id = ++id;
    database.push(newLocation);
    res.send("Adding new location");
    res.status(201).end();
  }
});

locations.delete("/:id([0-9]+)", (req, res) => {
  id = req.params.id;
  // use array filter to make a copy of the database without the location specified
  newDb = database.filter((location) => location.id !== Number(id));
  if (newDb.length !== database.length) {
    database = newDb;
    res.send("Delete location with id " + id);
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

locations.use("/location", locations);

module.exports = locations;
