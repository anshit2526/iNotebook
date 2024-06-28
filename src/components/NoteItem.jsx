import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext)
    const { note, updateNote } = props;
    const { deleteNote } = context;
    return (
        <div className='col-md-4'>
            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-regular fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                    <i className="fa-regular fa-trash-can mx-2" onClick={() => { deleteNote(note._id) }}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;