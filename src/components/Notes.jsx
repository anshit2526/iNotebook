import React, {useContext, useEffect} from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import { AddNote } from './AddNote';

export const Notes = () => {

    const context = useContext(noteContext);
    const { notes, getNotes } = context;
    useEffect(() => {
      getNotes();
    }, [])
    

    return (
        <>

            <AddNote />
            
            <div className='row'>
                <h2 className='text-center my-3'>Your Notes</h2>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes;
