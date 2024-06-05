const mongoose = require("mongoose");

// Creating a schema for notes. Schema provides structure for our database for in which way the datae will be stored in databse.
const NotesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.module('user', NotesSchema)