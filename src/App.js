import React, { Component } from 'react';
import LoadBootstrap from './header/LoadBootstrap';
import Header from './Header';
import Page from './Page';
import AtomCanvas from './AtomCanvas';
import Banner from './Banner';

import { Trigger } from './helpers';

import './css/main.css';

/**
 * @view https://react-bootstrap.github.io/
 * @view https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822
 * @view Where to use which livecycle update for what
 * @view https://www.valentinog.com/blog/redux/#React_Redux_tutorial_who_this_guide_is_for
 * @view https://reacttraining.com/react-router/web/example/auth-workflow
 * 
 */
class App extends Component {
  constructor(props) {
    super(props);

    Trigger.add('windowResize');
    Trigger.add('scroll');
    Trigger.add('introScroll');

    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this); 

    // the below are used to store the ids returned by requestAnimationFrame
    // so to not repeat a callback multiple times during a frame 
    this.frameScroll = null;
    this.frameResize = null;

    this.window = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  componentDidMount() {
    this.scrollBoundary = 10;
    this.pastScrollBoundary = false;

    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }

  onScroll() {
    if (this.frameScroll) {
      return;
    }

    this.frameScroll = requestAnimationFrame(() => {
      this.frameScroll = null;

      this.scroll = {
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      };

      Trigger.fire('scroll', this.scroll);

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
    });
  }

  onResize() {
    if (this.frameResize) {
      return;
    }

    this.frameResize = requestAnimationFrame(() => {
      this.frameResize = null;
      
      if (window.innerWidth !== this.window.width ||
        window.innerHeight !== this.window.height) {
        Trigger.fire('windowResize', {
          ...this.window,
        });
      }

      this.window = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    });
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
