const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');


// Creating a User using POST: "api/auth/createuser". No login required
router.post('/createuser', [
    // all the validators will come here
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters long.').isLength({ min: 5 }),
], async (req, res) => {

    // If there are errors, than return Bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.array() });
    }

    try {

        // Check whether the user with the given email already exist
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Sorry the user with this email already exist" });
        }

        // This line creates new user by taking name, email and password respectively as an input where email must be a unique and not-null value.
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,

        })

        // Sending response
        res.json(`Hi ${user.name}, It's nice to meet you! Your user name is your email id ${user.email}`)

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }

})



module.exports = router

