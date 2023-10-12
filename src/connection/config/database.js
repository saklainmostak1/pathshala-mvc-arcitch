var mysql = require('mysql');

var connections = mysql.createConnection({
  // host: 'localhost',
  //  host: '192.168.0.110',
  port: '3306',
  user: 'root',
  password: '',
  database: 'college'
});
// var connections = mysql.createConnection({
//    host: '198.187.30.101',
//   port: '3306',
//   user: 'urbanit101_mern',
//   password: 'Urb@n!t101#_@merN',
//   database: 'urban101_mern'
// });

connections.query(function (error) {
  if (!!error) {
    console.log('connected')
    const data = "select * from 	admin_page_list";
    connections.query(data, function (error, result) {
      console.log(result)
    })
  } else {
    console.log(error, 'Error')
  }
});

module.exports = connections