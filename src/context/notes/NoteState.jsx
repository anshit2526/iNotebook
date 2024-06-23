import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {
    const host = 'http://localhost:5000'
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);


     // Get all Notes
     const getNotes = async () => {

        // TODO: API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2NjEyZThlNDRhMWVmMWJmYWJhMTAyIn0sImlhdCI6MTcxNzk2NTYwNX0.9rb82Jxfha5HQhhUDLh7t7ZS-VXiqF3RxvpMm1I_M5w"
            }
        });
        const json = await response.json();

        console.log(json)
        setNotes(json)
    }


    // Add Note
    const addNote = async (title, description, tag) => {

        // TODO: API Call
        const response = await fetch(`${host}/api/notes/addnote/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2NjEyZThlNDRhMWVmMWJmYWJhMTAyIn0sImlhdCI6MTcxNzk2NTYwNX0.9rb82Jxfha5HQhhUDLh7t7ZS-VXiqF3RxvpMm1I_M5w"
            },
            body: JSON.stringify({title, description, tag}),
        });
        const json = response.json();

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
    const handleEditNote = async (id, title, description, tag) => {

        //TODO: API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2NjEyZThlNDRhMWVmMWJmYWJhMTAyIn0sImlhdCI6MTcxNzk2NTYwNX0.9rb82Jxfha5HQhhUDLh7t7ZS-VXiqF3RxvpMm1I_M5w"
            },
            body: JSON.stringify({title, description, tag}),
        });

        const json = response.json();


        //Logic to edit in client
        console.log("Editing your note");
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }

    // Delete Note
    const handleDeleteNote = (id) => {
        // TODO: API Call
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, handleEditNote, handleDeleteNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;