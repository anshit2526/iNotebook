const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


// Route 1: Fetching all the notes of logged-in User using: GET "api/notes/fetchallnotes". Login requried
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {

        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)

    } catch (error) {

    }
})

// Route 2: Add a new node using: POST "api/notes/addnote". Login requried
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters long').isLength({ min: 5 })
], async (req, res) => {

    try {

        const { title, description, tag } = req.body;

        // If there are any validation error than, return with Bad request and array of errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        const saveNote = await note.save()

        res.json(saveNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router

