import React from 'react';
import Text from './Text';

const Paragraph = (props) => {
    const style = {
        ...props,
    };
    
    return (
        <Text style={style} {...props} className={`paragraph ${props.className || ''}`}>{props.children}</Text>
    );
}

export default Paragraph;