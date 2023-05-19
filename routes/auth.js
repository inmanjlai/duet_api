const express = require('express');
const router = express.Router();
const db = require('../db');

const login = (req, res, user) => {
    
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