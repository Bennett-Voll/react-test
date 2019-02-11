import React, { Component } from 'react';
import Main from './header/Main.js';
import Header from './Header.js';
import Page from './Page.js';
import AtomCanvas from './AtomCanvas.js';

import './css/main.css';

/**
 * @view https://react-bootstrap.github.io/
 * @view https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822
 * @view Where to use which livecycle update for what
 * 
 */
class Root extends Component {
  render() {
    return (
      <div id="root">
        <Main />
        <Header />
        <AtomCanvas />
        <Page />
      </div>
    );
  }
}

export default Root;
