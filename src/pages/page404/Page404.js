import React, { Component } from 'react';
import Page from './Page';

import '../../css/404.css';

class Page404 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="page404">
                <Page />
            </div>
        );
    }
}

export default Page404;