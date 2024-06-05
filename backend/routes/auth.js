const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Thismustbe@secrettoken!'

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

        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.email, salt);

        // This line creates new user by taking name, email and password respectively as an input where email must be a unique and not-null value.
        user = await User.create({
            name: req.body.name,
            email: securePass,
            password: req.body.password,

        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        // Sending response
        res.json({authToken})

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }

})



module.exports = router

