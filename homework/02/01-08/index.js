const connection = require('./database/crudrepository.js');

const main = async () => {
  await connection.connect();
  // using returns avoids esLint warning about unused variables
  let results = await connection.findAll(() => results);
  let findId = await connection.findById(42, () => findId);
  let addLocation = await connection.save([20, 50], () => addLocation);
  let deleteLocation = await connection.deleteById(90, () => deleteLocation);

  connection.close();
};

main();
