const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const port = 3000;

//Connect to DB before running app
const pool = require('./connection.js');
const app = express();

//Import models
const Task = require ('./models/task');


//set EJS as view engine, & directory for templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// Indicate static files are served in public folder
app.use(express.static(path.join(__dirname, "public")));


// parse request stream
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json() );
app.use(express.json() );


//Receive list of To Dos
app.get('/', (req, res) => {

	const sql = "SELECT * FROM honeydolist";
		pool.getConnection((err, connection) => {
			connection.query(sql, function(err, results, fields) {
				if (err) throw err;

				Object.keys(results).forEach(function(key) {
					var tasks = results[key];
				});				
				Task.all((err, tasks) => res.status(200).json(tasks));
				res.render('index', {model: results});

				console.log(results);	
			});
		});
						// Option 1 - req.next isn't function; add console.log(render index) to see if calling next twice in middleware or pointing to wrong obj
						// Object.keys(results).forEach(function(key) {
						// 	var obj = results[key];
						// 	console.log(results);
						// 	res.render('index', {todos: obj});
						// })
			// obj = {print: results};
			// res.render('index', {todos: obj});
		});


// Insert into list of To Dos
app.post('/', (req, res) => {
	console.log(req.body);
	var newTask = JSON.parse(req.body);
	Task.add(newTask);
	res.status(201).json();
});


// Display list of ToDos
app.put('/:id', (req, res) => {
	var id = req.params.id;  //retrieve ID param val
	var updatedTask = JSON.parse(req.body);
	updatedTask.id = parseInt(id);

	Task.update(updatedTask, (err, data) => {
		if(err) {
			res.status(404, "The task is not found").send();
		} else {
			res.status(204).send(data);
		}
	});
});


//Delete Task List item
app.delete('/:id', (req, res) => {
	var id = parseInt(req.params.id);
	Task.delete(id, (err) => {
		if(err) {
			res.status(404).send();
		} else {
			res.status(200).send();
		}
	});
});


//About Page Route
app.get('/about', (req, res) => {
	res.render('about');
});

//Data Page Route
app.get('/data', (req, res) => {
	const test = {
		title: "test",
		items: ["one", "two", "three"]
	};
	res.render('data', { model: test });
});

//Books Page Route
app.get('/books', (req, res) => {
	res.render('books');
});

// In order to actually serve request, the listen method needs to be called on the server obj.
app.listen(port, () => {
	console.log('Server running on port 3000');
});
