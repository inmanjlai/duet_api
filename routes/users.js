const express = require('express');
const router = express.Router();
const db = require('../db')

router.get('/', (req, res) => {
	const sql = `SELECT id, fname, lname, username, email FROM users;`;

	db.all(sql, (err, rows) => {
		if (err) return console.log(err.message);
		res.json(rows)
	});
});

router.get('/:id', (req, res) => {
	const sql = `SELECT id, fname, lname, username, email FROM users WHERE id = ${req.params.id};`;

	db.get(sql, (err, row) => {
		if (err) return console.log(err.message);
		res.json(row);
	})
})

router.post('/', (req, res) => {
	const sql = `
		INSERT INTO users (fname, lname, username, email, hashed_password)
		VALUES ('${req.body.fname}', '${req.body.lname}', '${req.body.username}', '${req.body.email}', '${req.body.hashed_password}');
		`;

	db.run(sql, (err) => {
		if (err) {
			console.log(err.message)
			res.json({error: err.message, body: req.body})
		};
		res.json({message: 'User Created'})
	})
})

router.put('/:id', (req, res) => {
	const sql = `
		UPDATE users
		SET
			fname = '${req.body.fname}',
			lname = '${req.body.lname}',
			username = '${req.body.username}',
			email = '${req.body.email}'
		WHERE id = ${req.params.id};
	`;

	db.run(sql, (err, row) => {
		if (err) {
			console.log(err.message)
			res.json({error: err.message, body: req.body})
		}
		res.json({message: 'User updated'})
	})
})

module.exports = router;
