const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('duet.db', (err) => {
	if (err) return console.log('Error:', err.message);
	console.log('Connected to database')
});

module.exports = db;
