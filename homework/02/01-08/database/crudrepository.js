const mysql = require('mysql');
// .env
require('dotenv').config();

const dbDetails = process.env;
const connection = mysql.createConnection({
  host: dbDetails.DB_HOST,
  user: dbDetails.DB_USER,
  password: dbDetails.DB_PASSWORD,
  database: dbDetails.DB_DB,
  multipleStatements: false,
});

let connectionFunctions = {
  connect: () => {
    function f(resolve, reject) {
      connection.connect((err, open) => {
        if (err) {
          reject(err);
        }
        resolve(open);
      });
    }
    let p = new Promise(f);
    return p;
  },
  close: () => {
    function f(resolve, reject) {
      connection.end((err, close) => {
        if (err) {
          reject(err);
        }
        resolve(close);
      });
    }
    let p = new Promise(f);
    return p;
  },

  save: (coordinatesArr) => {
    function f(resolve, reject) {
      let sql = `insert into locations set latitude = ?, longtitude = ?`;
      connection.query(sql, [...coordinatesArr], (err, location) => {
        console.log('\n' + 'Add a location' + '\n');
        console.log(
          `Added record: Latitude: ${coordinatesArr[0]} Longtitude: ${coordinatesArr[1]} `
        );
        if (err) {
          reject(err);
        }
        resolve(location);
      });
    }
    let p = new Promise(f);
    return p;
  },

  findAll: () => {
    function f(resolve, reject) {
      connection.query(`select * from locations`, (err, locations) => {
        console.log('\n' + 'Add location' + '\n');
        locations.forEach((location) =>
          console.log(
            // results
            `Record ID: ${location.id} latitude: ${location.latitude} longtitude: ${location.longtitude}`
          )
        );
        if (err) {
          reject(err);
        }
        resolve(locations);
      });
    }
    let p = new Promise(f);
    return p;
  },
  findById: (id) => {
    let sql = `select * from locations where id = ? `;
    function f(resolve, reject) {
      connection.query(sql, [id], (err, location) => {
        console.log('\n' + 'Find record' + '\n');
        console.log(
          `Record found: ID:  ${location[0].id} Latitude: ${location[0].latitude} Longtitude: ${location[0].longtitude}`
        );
        if (err) {
          reject(err);
        }

        resolve(location);
      });
    }
    let p = new Promise(f);
    return p;
  },
  deleteById: (id) => {
    let sql = `delete from locations where id = ? `;
    function f(resolve, reject) {
      console.log('\n' + 'Delete a record' + '\n');
      connection.query(sql, [id], (err, result) => {
        console.log(`Record: ${id} deleted`);
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    }
    let p = new Promise(f);
    return p;
  },
};

module.exports = connectionFunctions;
