import React, { Component } from 'react';

import Page from './Page';
import Banner from 'templates/Banner';
import Footer from 'templates/Footer';

class PageHome extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="home">
                <div id="foreground">
                <Banner />
                <Page />
                <Footer />
                </div>
            </div>
        );
    }
}

export default PageHome;