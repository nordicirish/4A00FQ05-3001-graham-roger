const connection = require('./database/crudrepository.js');

const main = async () => {
  await connection.connect();
  // using returns avoids esLint warning about unused variables
  let results = await connection.findAll(() => results);
  let findId = await connection.findById('s', () => findId);
  let addLocation = await connection.save([-201, 200], () => addLocation);
  let deleteLocation = await connection.deleteById(108, () => deleteLocation);
  await connection.close();
};

main();
