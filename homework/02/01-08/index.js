const mysql = require("mysql");
require("dotenv").config();
const dbConnection = process.env;
// add "node":true to eslint.json if process is not defined error
// db connection details stored in .env ..read using dotenv module
// process.env loads the stored variables

const connection = mysql.createConnection({
  host: dbConnection.DB_HOST,
  user: dbConnection.DB_USER,
  password: dbConnection.DB_PASSWORD,
  database: dbConnection.DB_DB,
  multipleStatements: true,
});

connection.connect();

connection.query("select * from locations", (err, locations) => {
  if (err) {
    throw err;
  }
  locations.forEach((location) =>
    console.log(
      `ID: ${location.id} Latitude: ${location.latitude} Longtitude: ${location.longtitude}`
    )
  );
});

// will wait if previously enqueued queriest
connection.end();
