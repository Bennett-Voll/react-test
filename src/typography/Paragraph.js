import React from 'react';
import Text from './Text';

const Paragraph = (props) => {
    const style = {
        lineHeight: '2',
        fontSize: '15px',
        color: '#20232a',
        ...props,
    };
    
    return (
        <Text style={style} {...props}>{props.children}</Text>
    );
}

export default Paragraph;