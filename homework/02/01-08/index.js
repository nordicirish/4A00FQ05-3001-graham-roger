const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "mydb.tamk.fi",
  user: "pkrogr",
  password: "*******",
  database: "dbpkrogr1",
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
