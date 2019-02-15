import React, { Component } from 'react';
import LoadBootstrap from './header/LoadBootstrap';
import Header from './templates/Header';

import { Route, Switch } from 'react-router-dom';

import { Trigger } from './helpers';

import PageHome from './pages/home/PageHome';
import Page404 from './pages/page404/Page404';

import './css/main.css';

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

    Trigger.add('frame');

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

    Trigger.fire('frame', (new Date()).getTime());

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
        <Header />
        <Switch>
          <Route exact path="/" component={PageHome} />
          <Route component={Page404} />
        </Switch>
      </div>
    );
  }
}

export default App;
