import React from 'react';

const Text = (props) => {
    const style = {
        ...props,
    };

    let className = '';

    if (props.className) {
        className += ` ${props.className}`;
    }
    
    return (
        <p style={style} {...props} className={`text ${className.trim()}`}>{props.children}</p>
    );
}

export default Text;