import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

export const AddNote = () => {

    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "Testing", });

    const handleAddNote = (event) => {
        event.preventDefault();
        addNote(note.title, note.description);
    }

    const onInput = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <h2 className='text-center my-3'>Add Notes</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Note Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onInput={onInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Note Description</label>
                    <input type="text" className="form-control" id="description" name="description" onInput={onInput} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleAddNote}>Add Note</button>
            </form>
        </div>
    )
}
