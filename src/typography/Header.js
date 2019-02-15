import React from 'react';
import Text from './Text';

const Header = (props) => {
    const style = {
        lineHeight: '1',
        fontSize: '2em',
        color: '#61D9FA',
        ...props,
    };
    
    return (
        <Text style={style} {...props}>{props.children}</Text>
    );
}

export default Header;