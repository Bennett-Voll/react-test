import React from 'react';
import Text from './Text';

const Header = (props) => {
    const style = {
        ...props,
    };
    
    let className = '';

    if (props.size) {
        className += ` header-${props.size}`;
    }

    return (
        <Text style={style} {...props} className={`header ${className} ${props.className || ''}`}>{props.children}</Text>
    );
}

export default Header;