import React, { Component } from 'react';
import Main from './header/Main.js';
import Header from './Header.js';
import Page from './Page.js';
import AtomCanvas from './AtomCanvas.js';

import { connect } from "react-redux";
import { startAction } from "./redux/actions/startAction";
import { stopAction } from "./redux/actions/stopAction";

import { Callbacks } from './helpers';

import './css/main.css';

/**
 * @view https://react-bootstrap.github.io/
 * @view https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822
 * @view https://medium.freecodecamp.org/how-to-use-redux-in-reactjs-with-real-life-examples-687ab4441b85
 * @view email
 * @view https://books.goalkicker.com/
 * @view Where to use which livecycle update for what
 * 
 */
class App extends Component {
  constructor(props) {
    super(props);

    /*
      TODO:
        This callback method shouldn't be defined in any compnonent, but globally, and shouldn't be
        passed via componment to componement.
        
        I fucking need to learn redux

        EDIT: on hindsight, it may be set in a component, but should still be stored globally
    */

    this.callbackIntroScroll = new Callbacks();
  }

  componentDidMount() {
    this.scrollBoundary = 10;
    this.pastScrollBoundary = false;

    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        this.scroll = {
          scrollX: window.scrollX,
          scrollY: window.scrollY,
        };

        const scrollY = this.scroll.scrollY;
        const scrollBoundary = this.scrollBoundary;
        const pastScrollBoundary = this.pastScrollBoundary;
        
        if (scrollY > scrollBoundary && ! pastScrollBoundary) {
          this.callbackIntroScroll.fire(true);
          this.pastScrollBoundary = true;
        } 

        if (scrollY <= scrollBoundary && pastScrollBoundary) {
          this.callbackIntroScroll.fire(false);
          this.pastScrollBoundary = false;
        }
      });
    });
  }

  render() {
    console.log(this.props);
    
    return (
      <div id="root">
        <Main />
        <Header callbackIntroScroll={this.callbackIntroScroll} />
        <AtomCanvas callbackIntroScroll={this.callbackIntroScroll} />
        <Page />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  startAction: () => dispatch(startAction),
  stopAction: () => dispatch(stopAction)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
