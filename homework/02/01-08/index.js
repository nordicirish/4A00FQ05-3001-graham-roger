const connection = require('./database/crudrepository.js');

const main = async () => {
  try {
    let results = await connection.findAll(() => results);
    // let findId = await connection.findById("a", () => findId);
    let findId = await connection.findById(15, () => findId);
    let addLocation = await connection.save([-201, 200], () => addLocation);
    let deleteLocation = await connection.deleteById(108, () => deleteLocation);
  } catch (err) {
    console.log(err);
  } finally {
    try {
      console.log(await connection.close());
    } catch (err) {
      console.log(err);
    }
  }
};

// const main = async () => {
//   await connection.connect();
//   // using returns avoids esLint warning about unused variables
//   let results = await connection.findAll(() => results);
//   let findId = await connection.findById('s', () => findId);
//   let addLocation = await connection.save([-201, 200], () => addLocation);
//   let deleteLocation = await connection.deleteById(108, () => deleteLocation);
//   await connection.close();
// };
main();
