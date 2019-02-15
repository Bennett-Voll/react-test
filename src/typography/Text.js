import React from 'react';

const Text = (props) => {
    const style = {
        fontFamily: 'Arial, Helvetica, sans-serif',
        ...props,
    };
    
    return (
        <p style={style} {...props}>{props.children}</p>
    );
}

export default Text;