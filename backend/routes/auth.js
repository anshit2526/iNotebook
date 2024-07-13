const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Thismustbe@secrettoken!'


// Route 1: Creating a User using POST: "api/auth/createuser". No login required
router.post('/createuser', [
    // all the validators will come here
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters long.').isLength({ min: 5 }),
], async (req, res) => {

    // If there are validation errors, than return Bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.array() });
    }

    try {

        // Check whether the user with the given email already exist
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "The user with this email already exist" });
        }

        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.password, salt);
        // This line creates new user by taking name, email and password respectively as an input where email must be a unique and not-null value.
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePass,

        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);

        // Sending response
        res.json({ authToken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }

})


// Route 2: Authenticate a User using POST: "api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {

    let success = false;

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Please login with correct credentials' });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: 'Please login with correct credentials' });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// Route 3: Get logged in User Details using: POST "api/auth/getuser". Login requried
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router

