import React, { Component } from 'react';
import Page from './Page';
import Header from '../../templates/Header';
import AtomCanvas from '../../templates/AtomCanvas';
import Banner from '../../templates/Banner';

class PageHome extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="home">
                <AtomCanvas />
                <div id="foreground">
                <Header />
                <Banner />
                <Page />
                </div>
            </div>
        );
    }
}

export default PageHome;