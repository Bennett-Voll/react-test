import React from 'react';
import Text from './Text';

const Paragraph = (props) => {
    const style = {
        ...props,
    };
    
    return (
        <Text style={style} {...props} className={`paragraph ${(props.className || '').trim()}`}>{props.children}</Text>
    );
}

export default Paragraph;