import React, { Component } from 'react';
import LoadBootstrap from './header/LoadBootstrap';
import Header from './templates/Header';
import Page from './pages/home/Page';
import AtomCanvas from './templates/AtomCanvas';
import Banner from './templates/Banner';

import { Route } from 'react-router-dom';

import { Trigger } from './helpers';

import './css/main.css';

/*
 * @view https://react-bootstrap.github.io/
 * @view https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822
 * @view Where to use which livecycle update for what
 * @view https://www.valentinog.com/blog/redux/#React_Redux_tutorial_who_this_guide_is_for
 * @view https://reacttraining.com/react-router/web/example/auth-workflow
 * @view https://stackoverflow.com/questions/37200080/how-to-export-imported-object-in-es6
 * 
 */

/**
 * The "html tag of React componenets".
 * Puts the page together and handles a multitude of triggers
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  constructor(props) {
    super(props);

    this.scrollBoundary = 0;
    this.pastScrollBoundary = false;
    
    this.listen = this.listen.bind(this);
    this.onScroll = this.onScroll.bind(this);

    // note that these Triggers only fire upon each animation frame so to improve performance
    // if a different kind of behaviour is required, then don't use these
    Trigger.add('windowResize');
    Trigger.add('scroll');
    Trigger.add('introScroll');

    Trigger.on('scroll', this.onScroll);

    this.window = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.scroll = {
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    };

    this.listen();
  }

  /**
   * Listen to variables and execute a trigger if changes occur
   * Listen is preferenced over normal evenlisteners, as it increases accuracy whenever eg scrolling
   * and resizing is used in combination with setTimeout or requestAnimationFrame
   *
   * @memberof App
   */
  listen() {
    if (window.innerWidth !== this.window.width ||
      window.innerHeight !== this.window.height) {
      this.window = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      Trigger.fire('windowResize', {
        ...this.window,
      });
    }

    if (this.scroll.scrollX !== window.scrollX ||
      this.scroll.scrollY !== window.scrollY) {
      this.scroll = {
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      };

      Trigger.fire('scroll', {
        ...this.scroll,
      });
    }

    requestAnimationFrame(this.listen)
  }

  /**
   * Onscroll event
   *
   * @memberof App
   */
  onScroll() {
    const scrollY = this.scroll.scrollY;
    const scrollBoundary = this.scrollBoundary;
    const pastScrollBoundary = this.pastScrollBoundary;

    if (scrollY > scrollBoundary && !pastScrollBoundary) {
      Trigger.fire('introScroll', true);
      this.pastScrollBoundary = true;
    }

    if (scrollY <= scrollBoundary && pastScrollBoundary) {
      Trigger.fire('introScroll', false);
      this.pastScrollBoundary = false;
    }
  }

  render() {
    return (
      <div id="app">
        <LoadBootstrap />
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

export default App;
