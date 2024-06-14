import React, {useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext'


export const About = () => {
  const a = useContext(noteContext)
  useEffect(() => {
    a.update();
  })
  
  return (
    <div>{a.state.name} is the auther of this page and he is in class {a.state.class} </div>
  )
}
