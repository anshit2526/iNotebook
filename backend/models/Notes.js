const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema for notes. Schema provides structure for our database for in which way the datae will be stored in databse.
// To ensure other user cannot see someone else's notes the notes of each user's must kepts seperat. This achieved here by adding 'element' in Notes object or we say Notes Schema.
const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
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

module.exports = mongoose.model('notes', NotesSchema)