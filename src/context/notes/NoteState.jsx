import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "66661417e44a1ef1bfaba10d",
            "user": "666612e8e44a1ef1bfaba102",
            "title": "At the end",
            "description": "Get Rumbled, Stay Humble.",
            "tag": "",
            "date": "2024-06-09T20:44:07.560Z",
            "__v": 0
        },
        {
            "_id": "666e0a53d6fa14db5f63b907",
            "user": "666612e8e44a1ef1bfaba102",
            "title": "For Mikasa",
            "description": "I was the luckiest person on the planet having you by side!",
            "tag": "",
            "date": "2024-06-15T21:40:35.255Z",
            "__v": 0
        },
        {
            "_id": "666e0a7ad6fa14db5f63b909",
            "user": "666612e8e44a1ef1bfaba102",
            "title": "For Armin",
            "description": "You were the only friend that was too close to me which I can rely on.",
            "tag": "",
            "date": "2024-06-15T21:41:14.187Z",
            "__v": 0
        },
        {
            "_id": "666e0adbd6fa14db5f63b90c",
            "user": "666612e8e44a1ef1bfaba102",
            "title": "Levi",
            "description": "\"I know those eyes. I saw them on the streets underground. I never thought that one day I will see them on you\"",
            "tag": "",
            "date": "2024-06-15T21:42:51.215Z",
            "__v": 0
        }
    ];

    const [notes, setNotes] = useState(notesInitial);


    // Add Note
    const addNote = (title, description, tag) => {
        // TODO: API Call
        console.log('Adding a note')
        const note = {
            "user": "666612e8e44a1ef1bfaba102",
            "title": title,
            "description": description,
            "tag": tag,
        };
        setNotes(notes.concat(note))
    }

    // Edit Note
    const handleEditNote = (id, title, description, tag) => {
        console.log("Editing your note");
    }

    // Delete Note
    const handleDeleteNote = (id) => {
        // TODO: API Call
        console.log("Deleting the note..." + id);
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, handleEditNote, handleDeleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;