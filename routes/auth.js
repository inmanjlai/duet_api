const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

const login = (req, res, user) => {
    // create a new session and tie it to a user_id
    // set a cookie with the session_id
    // on subsequent calls when authorization is needed, pass the session cookie along
	const uuid = uuidv4();
	console.log(uuid);
    console.log(user);
}

router.post('/login', (req, res) => {
    const sql = `
        SELECT * FROM users 
            WHERE username = '${req.body.username}' 
            AND hashed_password = '${req.body.hashed_password}';
    `;

    db.get(sql, (err, row) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({error: err.message})
        }

        if (row === undefined) {
            return res.status(404).json({error: "User not found"})
        }
        
        login(req, res, row);            
        res.json({message: "Logging in"})
    })
})

module.exports = router;