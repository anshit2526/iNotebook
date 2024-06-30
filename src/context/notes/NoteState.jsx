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
            body: JSON.stringify({ title, description, tag }),
        });

        // eslint-disable-next-line
        const note = await response.json();
        setNotes(notes.concat(note))
    }

    // Edit Note
    const editNote = async (id, title, description, tag) => {

        //TODO: API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2NjEyZThlNDRhMWVmMWJmYWJhMTAyIn0sImlhdCI6MTcxNzk2NTYwNX0.9rb82Jxfha5HQhhUDLh7t7ZS-VXiqF3RxvpMm1I_M5w"
            },
            body: JSON.stringify({ title, description, tag }),
        });

        // eslint-disable-next-line
        const json = response.json();


        //Logic to edit in client
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes)
    }

    // Delete Note
    const deleteNote = async (id) => {
        // TODO: API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2NjEyZThlNDRhMWVmMWJmYWJhMTAyIn0sImlhdCI6MTcxNzk2NTYwNX0.9rb82Jxfha5HQhhUDLh7t7ZS-VXiqF3RxvpMm1I_M5w"
            },
        });
        const json = response.json();

        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;