import React, { Component } from 'react';
import Page from './Page';
import Header from '../../templates/Header';

class Page404 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="404">
                <Page />
            </div>
        );
    }
}

export default Page404;