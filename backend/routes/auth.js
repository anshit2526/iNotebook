const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Creating a User using POST: "api/auth/". Doesn't require Auth
router.post('/', [
    // all the validators will come here
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters long.').isLength({ min: 5 }),
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.array() });
    }

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,

    }).then(user => res.json(user))
        .catch((err) => {
            console.log("\n" + err)
            console.log("\nUser with", req.body.email, "already exist");
            res.json({ error: `User with ${req.body.email} already exist`, message: err.message });
        })

})



module.exports = router

