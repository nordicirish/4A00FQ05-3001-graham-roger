const express = require("express");
const locations = express.Router();
const locationSchema = require("../location-schema.json");
const validate = require("../my-validator.js");
// middleware to parse Json in requests
locations.use(express.json());
locations.use("/location", locations);
id = 0;
let database = [
  { id: ++id, latitude: 60, longitude: 60 },
  { id: ++id, latitude: 40, longitude: 80 },
  { id: ++id, latitude: 40, longitude: 80 },
];

locations.get("/", (req, res) => {
  // https://www.geeksforgeeks.org/check-if-an-array-is-empty-or-not-in-javascript
  if (
    typeof database != "undefined" &&
    database != null &&
    database.length != null &&
    database.length > 0
  ) {
    res.send({ "Getting All locations": database });
    res.status(200).end();
  } else {
    //   res.status(404).end() maybe?;
    res.status(500).end;
  }
});

// number entered at the end of url is stored as a variable id
// ([0-9]+) Regex to check number is 0-9 can be chained for bigger numbers

locations.get("/:id([0-9]+)", (req, res) => {
  id = req.params.id;
  // use array find method to search database
  // Number(id) as id is converted from a string
  const found = database.find((location) => location.id === Number(id));

  if (found) {
    // res.send("Getting location with id " + id);
    res.send(found);
    res.status(200).end();
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
    //test works in cygwin
    // curl -H "Content-type: application/json" -d "{\"latitude\": 60, \"longitude\": 60}" http://localhost:8080/locations
    newLocation.id = ++id;
    database.push(newLocation);
    res.send(newLocation);
    //201 Created new resource
    res.status(201).end();
  }
});

locations.delete("/:id([0-9]+)", (req, res) => {
  id = req.params.id;
  // use array filter to make a copy of the database without the location specified
  const newDb = database.filter((location) => location.id !== Number(id));
  if (newDb.length !== database.length) {
    database = newDb;
    res.send();
    //200 Ok
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

locations.put("/:id([0-9]+)", (req, res) => {
  id = req.params.id;
  let updateLocation = req.body;
  let validation = validate(updateLocation, locationSchema);
  if (!validation.success) {
    // 400 (Bad Request)
    res.status(400);
    res.send(validation.errors);
  } else {
    const found = database.find((location) => location.id === Number(id));
    const foundIndex = database.indexOf(found);
    if (found) {
      database.splice(foundIndex, 1, {
        id: found.id,
        latitude: updateLocation.latitude,
        longitude: updateLocation.longitude,
      });
      res.send(database[foundIndex]);
      // 200 ok
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  }
});

locations.patch("/:id([0-9]+)", (req, res) => {
  id = req.params.id;
  let updateLocation = req.body;
  let validation = validate(updateLocation, locationSchema);
  if (!validation.success) {
    // 400 (Bad Request)
    res.status(400);
    res.send(validation.errors);
  } else {
    const found = database.find((location) => location.id === Number(id));
    const foundIndex = database.indexOf(found);
    if (found) {
      if (
        updateLocation.latitude !== found.latitude &&
        updateLocation.longitude === found.longitude
      ) {
        database.splice(foundIndex, 1, {
          id: found.id,
          latitude: updateLocation.latitude,
          longitude: found.longitude,
        });
      } else if (
        updateLocation.latitude === found.latitude &&
        updateLocation.longitude !== found.longitude
      ) {
        database.splice(foundIndex, 1, {
          id: found.id,
          latitude: found.latitude,
          longitude: updateLocation.longitude,
        });
      } else {
        database.splice(foundIndex, 1, {
          id: found.id,
          latitude: updateLocation.latitude,
          longitude: updateLocation.longitude,
        });
      }
      res.send(database[foundIndex]);
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  }
});

module.exports = locations;
