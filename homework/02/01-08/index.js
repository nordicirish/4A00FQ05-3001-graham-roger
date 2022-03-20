const main = () => {
  const connection = require('./database/crudrepository');
  connection.connect();
  connection.findAll((result) => console.log(result));
  connection.findById(1, (result) => console.log(result));
  connection.save([20, 50], (result) => console.log(result));
  connection.deleteById(9, (result) => console.log(result));
  connection.close();
};

main();
