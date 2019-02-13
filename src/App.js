import React, { Component } from 'react';
import Main from './header/Main';
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
 * 
 */
class App extends Component {
  constructor(props) {
    super(props);

    Trigger.add('windowResize');
    Trigger.add('introScroll');

    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this); 

    this.window = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  componentDidMount() {
    this.scrollBoundary = 10;
    this.pastScrollBoundary = false;

    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('scroll', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }

  onScroll() {
    requestAnimationFrame(() => {
      this.scroll = {
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      };

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
    requestAnimationFrame(() => {
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
      <div id="root">
        <Main />
        <Header />
        <Banner />
        <Page />
        <AtomCanvas />
      </div>
    );
  }
}

export default App;
