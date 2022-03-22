const mysql = require('mysql');
// .env
require('dotenv').config();
// let readlineSync = require('readline-sync');

const dbDetails = process.env;
const connection = mysql.createConnection({
  host: dbDetails.DB_HOST,
  user: dbDetails.DB_USER,
  password: dbDetails.DB_PASSWORD,
  database: dbDetails.DB_DB,
  multipleStatements: false,
  // multiple statements: false stops the user adding additional SQL statements in their input
  // for example ; DROP table locations won't be accepted as it's an additional statement
});

// crud repository holds connections settings
// can be changed to access different types of databases SQLlite Mariadb etc
// allows dtabase connection to be configured independently of the main app

// connectionFunctions is an object holding key value pairs
// keys are connect close save etc
// values are functions
let connectionFunctions = {
  connect: (callback) => {
    connection.connect();
  },
  close: (callback) => {
    connection.end();
  },

  save: (location, callback) => {
    let sql = `insert into locations set latitude = ?, longtitude = ?`;
    connection.query(sql, [...location], (err, result) => {
      if (err) {
        throw err;
      }
      console.log(
        `Added record: latitude: ${location[0]} longtitude: ${location[1]} `
      );
      callback(result);
    });
  },

  findAll: (callback) => {
    connection.query(`select * from locations`, (err, locations) => {
      if (err) {
        throw err;
      }
      callback(locations);
    });
  },
  deleteById: (id, callback) => {
    // let sql = `select * from locations where id = ${connection.escape(id)} `;
    // use connection.escape to sanitise or alternatively use a placeholder char - ?

    let sql = `delete from locations where id = ? `;

    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      }
      console.log(`Record: ${id} deleted`);
      callback(result);
    });
  },
  findById: (
    // { id = readlineSync.question('May I have an ID ? ') },
    id,
    callback
  ) => {
    // use connection.escape to sanitise or alternatively use a placeholder char - ?
    let sql = `select * from locations where id = ? `;
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
        `Record found: ${location.id} Latitude: ${location.latitude} Longtitude: ${location.longtitude}`
      );
      callback(locations);
    });
  },
};

module.exports = connectionFunctions;
