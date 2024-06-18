import React from 'react';

const Alert = (props) => {

    setTimeout(()=>{
        document.getElementById('alert-box').setAttribute('hidden', 'true') 
    }, 3000)

    return (
        <div id='alert-box' className='alert alert-primary' role='alert'>
            {props.message}
        </div>

    )
}

export default Alert