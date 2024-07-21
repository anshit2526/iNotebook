import React from 'react';

function Alert(props) {
    const capitalize = (word) => {
        if (word === 'danger') {
            word = 'error';
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }


    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'fixed', height: '50px', width: '350px', textAlign: 'center', marginInline: 'auto' }}>
                {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                    <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
                </div>}
            </div>
        </div>
    )
}

export default Alert