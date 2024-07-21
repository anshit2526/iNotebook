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
                    <div className="d-flex align-items-baseline justify-content-between">

                        <h5 className="card-title flex-fill">{note.title}</h5>

                        <div className="" style={{ fontSize: '0.85rem' }}>

                            <i className="fa-solid fa-tag" style={{ cursor: 'default' }}></i>
                            <span className='fw-medium mx-1'>{note.tag}</span>

                        </div>
                    </div>

                    <p className="card-text">{note.description}</p>
                    <i className="fa-regular fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                    <i className="fa-regular fa-trash-can mx-2" onClick={() => { deleteNote(note._id); props.showAlert('Note deleted successfully', 'success'); }}></i>

                </div>
            </div>
        </div>
    )
}

export default NoteItem;