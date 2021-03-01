var pool = require('../connection.js');

class Task {
	constructor(id, 
				title,
				createdAt,
				dateDue,
				isComplete) {
		this.id = id;
		this.title = title;
		this.createdAt = new Date.getTime();
		this.dateDue = null;
		this.isComplete = 0;
		// this.taskOwner = ownerId
	}

static all(callback) {
	pool.getConnection((err, connection) => {
		connection.query('SELECT * FROM todos', callback);
});
}

static add(task) {
	const sql = 'INSERT INTO todos(title) VALUES(?)';
	pool.getConnection((err, connection) => {
		connection.run(sql, task.title);
	});
}

static update(task) {
	console.log(task);
	const sql = 'UPDATE tasks SET title = ? WHERE id = ?';
	pool.getConnection((err, connection) => {
		connection.run(sql, task.title, task.id, callback);
	});
};

static delete(id, callback) {
	const sql = 'DELETE FROM todos where id = ?';
	pool.getConnection((err, connection) => {
		connection.run(sql, id, callback);
	});
	};
}


module.exports = Task;
