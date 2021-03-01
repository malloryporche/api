const mysql = require('mysql');
const pool  = mysql.createPool({
  connectionLimit : 20,
  host            : 'animadigitalmarketing.com',
  user            : 'upuonyrbgq3yz',
  password        : ')45`@GvG1%1$',
  database        : 'dbd8zlqtt8c3fg'
});

const tasks = require('./seeding').tasks;
const insertSeeds = require('./seeding').insertSeeds;

pool.getConnection(function(err, connection) {
  if (err) throw err; // not connected!

	//Create table for DB
	const sql_create = `CREATE TABLE IF NOT EXISTS honeydolist (
	  task_ID MEDIUMINT NOT NULL AUTO_INCREMENT,
	  task VARCHAR(100) DEFAULT '',
	  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
	  taskComplete TINYINT DEFAULT 0,
	  PRIMARY KEY (task_ID)
	);`;

	console.log("Successful connection to the database 'honeydolist.db' ");

connection.query(sql_create, (err, result) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful creation of the 'HoneyDoListItems' table");

});
// Insert tasks 
	// connection.query(insertSeeds, tasks, (err, result) => {
	// 	if(err) throw err;
	// 	console.log('succesfully added seeding data');
	// 	console.log(result);
	// });

  // Don't use the connection here, it has been returned to the pool.
  // //Use the connection
  // connection.query('SELECT * FROM honeydolist', function (error, results, fields) {
  //   // When done with the connection, release it.
  //   connection.release();
 
  //   // Handle error after the release.
  //   if (error) throw error;

  });
// });


// pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

module.exports = {
	getConnection: (callback) => {
		return pool.getConnection(callback);
	}
}
exports.tasks = tasks;
