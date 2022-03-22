const main = () => {
  const connection = require('./database/crudrepositorycallback');
  connection.connect();
  connection.findAll((result) => console.log(result));
  connection.findById(15, (result) => console.log(result));
  connection.save([20, 50], (result) => console.log(result));
  connection.deleteById(82, (result) => console.log(result));
  connection.close();
};

main();
