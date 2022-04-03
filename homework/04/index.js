const express = require("express");
const database = require("./database/crudrepository.js");
const app = express();
app.use(express.json());

app.get("/locations/all", async (req, res) => {
  try {
    let result = await database.findAll();
    res.status(200).send(result).end();
  } catch (err) {
    res.status(500).end();
  }
});

app.get("/locations/:id([0-9]+)", async (req, res) => {
  id = req.params.id;
  try {
    let result = await database.findById(id);
    console.log(result);
    if (!result) {
      res.status(404).send("location not found").end;
    }
    res.status(200).send(result).end();
  } catch (err) {
    res.status(500).end();
  }
});

app.get("/filter?", async (req, res) => {
  let locationRange = [req.query.lat1, req.query.lat2];
  console.log(locationRange);
  try {
    let result = await database.filterByLat(locationRange);
    if (!result) {
      // status won't change without a send message???
      res.status(404).send("no locations found").end;
    }
    res.status(200).send(result).end;
  } catch (err) {
    res.status(500).end();
  }
});
app.get("/locations/sort-by-latitude", async (req, res) => {
  try {
    let result = await database.sortByLat();
    res.status(200).send(result).end();
  } catch (err) {
    res.status(500).end();
  }
});

app.get("/locations/sort-by-longitude", async (req, res) => {
  try {
    let result = await database.sortByLong();
    res.status(200).send(result).end();
  } catch (err) {
    res.status(500).end();
  }
});

app.post("/locations/add", async (req, res) => {
  location = req.body;
  try {
    await database.save(location);
    res.status(201);
    res.send(location).end();
  } catch (err) {
    res.status(500).end();
  }
});

app.get("/locations/delete/:id([0-9]+)", async (req, res) => {
  id = req.params.id;
  console.log(id);
  try {
    let result = await database.deleteById(id);
    result === false
      ? res.status(404).send("Item not found").end()
      : res.status(200);
    res.send("Item deleted").end();
  } catch (err) {
    res.status(500).end();
  }
});

const server = app.listen(8080, () => {
  console.log(`listening on port ${server.address().port}`);
  // connect to the database only if express is running
  database.connect((err) => {
    if (err) {
      console.log("Problem connecting to MySQL");
    } else {
      console.log("MySQL running");
    }
  });
});

// if user presses ctrl c to close the app
// gracefully closing both the server and mySql connection
process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed");
    database.close(() => {
      console.log("database closed");
      // have to tell node to close the app as ctrl c is overwritten
      process.exit(1);
    });
  });
});
