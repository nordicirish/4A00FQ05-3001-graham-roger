// SQL injection - user can add SQL commands via the user interface
// It's a common hacking technique and can allow the user to run malicious SQL statements
// For example input of 1; DROP table locations would delete the table locations

const mysql = require('mysql');
// .env
require('dotenv').config();
let readlineSync = require('readline-sync');
const dbConnection = process.env;
// add "node":true to eslint.json if process is not defined error
// db connection details stored in .env ..read using dotenv module
// process.env loads the stored variables

const connection = mysql.createConnection({
  host: dbConnection.DB_HOST,
  user: dbConnection.DB_USER,
  password: dbConnection.DB_PASSWORD,
  database: dbConnection.DB_DB,
  multipleStatements: false,
  // multiple statements: false stops the user adding additional SQL statements in their input
  // for example ; DROP table locations won't be accepted as it's an additional statement
});

function searchId() {
  let id = readlineSync.question('May I have an ID ? ');
  // let sql = `select * from locations where id = ${connection.escape(id)} `;
  // use connection.escape to sanitise or alternatively us a placholder char - ?
  let sql = `select * from locations where id = ? `;

  connection.connect();
  //connection.escape
  // connection.query(sql, (err, locations) => {

  // ? value passed to an array, can hold the values of multiple placeholder chars [Placeholder1, Placeholder2...]
  connection.query(sql, [id], (err, locations) => {
    if (err) {
      throw err;
    }
    //initialise location as first item in an array locations
    // otherwise escape fails
    let location = locations[0];
    console.log(
      `ID: ${location.id} Latitude: ${location.latitude} Longtitude: ${location.longtitude}`
    );
  });

  connection.end();
}

searchId();

/* connection.connect();

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

connection.end(); */

// will wait if previously enqueued queriest
