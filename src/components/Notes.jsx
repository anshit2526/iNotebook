import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import { AddNote } from './AddNote';

export const Notes = () => {

    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, []);

    const refModal = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({id: "", updatedTitle: "", updatedDescription: "", updatedTag: ""});

    const updateNote = (currentNote) => {
        refModal.current.click();
        setNote({
            id: currentNote._id,
            updatedTitle: currentNote.title, 
            updatedDescription: currentNote.description, 
            updatedTag: currentNote.tag
        });
    }

    const handleUpdateNote = (event) => {
        editNote(note.id, note.updatedTitle, note.updatedDescription, note.updatedTag)
        refClose.current.click();
    }

    const onInput = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    }


    return (
        <>

            <AddNote />

            <button type="button" ref={refModal} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="updated-title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="updateTitle" name="updatedTitle" aria-describedby="emailHelp" onInput={onInput} value={note.updatedTitle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="updated-description" className="form-label">Description</label>
                                    <textarea type="text" className="form-control" id="updatedDescription" name="updatedDescription" onInput={onInput} value={note.updatedDescription} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="updatedTag" name="updatedTag" onInput={onInput} value={note.updatedTag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleUpdateNote}>Update note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row'>
                <h2 className='text-center my-3'>Your Notes</h2>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes;
