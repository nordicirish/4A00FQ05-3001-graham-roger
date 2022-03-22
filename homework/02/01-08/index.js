const connection = require('./database/crudrepository.js');

const main = async () => {
  try {
    let results = await connection.findAll(() => results);
    console.log(await connection.findById(15));
    console.log(await connection.save([-200, 200]));
    console.log(await connection.deleteById(135));
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

main();
