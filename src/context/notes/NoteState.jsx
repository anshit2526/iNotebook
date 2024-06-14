import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {

    const s1 = {
        name: "Anshit",
        class: "5",
    }

    const update = () => {
        setTimeout(() => {
            setState({
                name: "Phansit",
                class: "400",
            });
        }, 2000)
    }

    const [state, setState] = useState(s1);
    return (
        <NoteContext.Provider value={{ state, update }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;