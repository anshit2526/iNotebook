import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem'

export const Notes = () => {

    const context = useContext(noteContext);
    const { notes, setNotes } = context;

    return (
        <div className='row'>
            <h2 className='text-center my-3'>Your Notes</h2>
            {notes.map((note) => {
                return <NoteItem key={note._id} note={note} />
            })}
        </div>
    )
}

export default Notes;