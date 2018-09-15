import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'; 
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './scss/App.css';

import frontEndProjects from './data/frontEndProjects';
import repetitiveProjects from './data/repetitiveProjects';
import transitionHandler from './helper/transitionHandler';

import Header from './components/Header';
import Intro from './components/Intro';
import Projects from './components/Projects';
import CaseStudy from './components/CaseStudy';
import Contact from './components/Contact';
import backEndProjects from './data/backEndProjects';

const { Lethargy } = require('lethargy');

// Cross-browser bind without using JQuery, taken from http://stackoverflow.com/a/3076693/3966682
function addEvent(el, eventType, handler) {
  if (el.addEventListener) { // DOM Level 2 browsers
    el.addEventListener(eventType, handler, false);
  } else if (el.attachEvent) { // IE <= 8
    el.attachEvent('on' + eventType, handler);
  } else { // ancient browsers
    el['on' + eventType] = handler;
  }
};
	
class App extends Component {

  state = {
    pageIsAnimating: false,
    showMouseUpIcon: false,
    sideNavIsOpen: false, // header stuff
    ariaHidden: true, // header stuff
    navIsAnimating: false, //header stuff
    mostRecentProjectVisited: null
  }

  componentDidMount = () => {
    const { location, addHistory } = this.props;
    addHistory(location);
    // scroll event listener
    /*     window.addEventListener('wheel',this.detectScroll, {passive: true}); */
    let el = document.querySelector('.app');
    this.detectSwipe(el, swipedir => {
      switch(swipedir) {
        case 'up':
          this.movementHandler('scrollDown');
          break;
        case 'down':
          this.movementHandler('scrollUp');
          break;
        default:
          break;
      }
    });
    // ============================================================
    const lethargy = new Lethargy(20,10,0.10);

    // Define the function to run on mousewheel
    const checkScroll = e => {

      // Lethargy.check() must only be called once per mouse event
      // If you need to use the result in more than one place
      // you MUST store it as a variable and use that variable instead
      // See https://github.com/d4nyll/lethargy/issues/5
      const result = lethargy.check(e);
      // false means it's not a scroll intent, 1 or -1 means it is
      if (result === 1) {
        this.movementHandler('scrollUp');
      } else if (result === -1) {
        this.movementHandler('scrollDown');
      }
    };

    // Cross-browser way to bind to mouse events
    addEvent(window, 'mousewheel', checkScroll);
    addEvent(window, 'DOMMouseScroll', checkScroll);
    addEvent(window, 'wheel', checkScroll);
    addEvent(window, 'MozMousePixelScroll', checkScroll);
    // ============================================================
  }

  handleMouseUpIcon = boolean => this.setState({showMouseUpIcon: boolean});

  handleNav = (toggle= false) => {
    const openSideNav = () => {
      document.body.style.overflow = "hidden";
      setTimeout( () => this.setState({ariaHidden: false}),10);
      setTimeout( () => this.setState({navIsAnimating: false}),500);
    }
    const closeSideNav = () => {
      if (this.state.sideNavIsOpen) {
        this.setState({ariaHidden: true});
        setTimeout( () => this.setState({sideNavIsOpen: false, navIsAnimating: false}),500);
      }
    }
    const toggleSideNav = () => {
      this.setState({sideNavIsOpen: true, navIsAnimating: true});
      this.state.sideNavIsOpen ? closeSideNav() : openSideNav();
    };
    if (!this.state.navIsAnimating) toggle ? toggleSideNav() : closeSideNav();
  }

  movementHandler = direction => {
    const { location } = this.props;

    if (!this.state.pageIsAnimating) {
      if (direction === 'scrollDown' && 
        location.pathname === '/'
      ) {
        this.props.history.push('/projects');
        this.setState({pageIsAnimating: true});
      } else if (
        direction === 'scrollUp' &&
        location.pathname === '/projects'
      ) {
        this.props.history.push('/');
        this.setState({pageIsAnimating: true});
      } else if (
        direction === 'scrollUp' &&
        this.props.repetitiveProjects[location.pathname] &&
        window.pageYOffset === 0 // 0 pageYOffset is top of page
      ) {
        this.props.history.push('/projects');
        this.setState({pageIsAnimating: true});
      } else if (
        direction === 'scrollDown' &&
        location.pathname === '/projects' &&
        this.state.mostRecentProjectVisited
      ) {
        this.props.history.push(`${this.state.mostRecentProjectVisited}`);
        this.setState({pageIsAnimating: true});
      }
    }
  }

  
  handleMostRecentProject = projectPathName => this.setState({mostRecentProjectVisited: projectPathName});

/*   detectScroll = e => {
    let delta = e.wheelDelta ? e.wheelDelta : -1 * e.deltaY;
    // Negative delta is scroll down, positive delta is scroll up
    let direction = delta < 0 ? 'scrollDown' : 'scrollUp';
    this.movementHandler(direction);
  } */

  detectSwipe = (el, callback) => {
    const { location } = this.props;

    let touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 100, //required min distance traveled to be considered swipe
    restraint = 200, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 500, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}
  
    touchsurface.addEventListener('touchstart', e => {
        const touchobj = e.changedTouches[0];
        swipedir = 'none';
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime(); // record time when finger first makes contact with surface
        // e.preventDefault()
    }, {passive: true})
  
    touchsurface.addEventListener('touchmove', e => {
      if (
        location.pathname === '/' || 
        location.pathname === '/projects'
      ) {
        e.preventDefault();
      }
    }, false)
  
    touchsurface.addEventListener('touchend', e => {
        let touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        // e.preventDefault();
    }, {passive: true})
  }

  childFactoryCreator = () => {
    const { historyObject } = this.props;
    const { from, to } = historyObject;
    const { classNames, enter, timeout } = transitionHandler(from, to);
    return (
      (child) => {
        return ( React.cloneElement(child, { classNames, enter, timeout }) )
      }
    );
  }

  render() {
    const { location, history, frontEndProjects } = this.props;
    const { pageIsAnimating } = this.state;

    // do not allow transition interruptions
    if (!this.unblock && pageIsAnimating) {
      this.unblock = history.block();
    }

    if (this.unblock && !pageIsAnimating) {
      this.unblock();
      this.unblock = null;
    }

    const scrollablePages = {
      '/projects/tic-tac-toe': true,
      '/projects/calculator': true,
      '/projects/random-quote-machine': true,
      '/projects/pomodoro-clock': true
    };

    return (
      <div className={scrollablePages[`${location.pathname}`] ? 'app scrollable' : 'app'}>
        <Header 
          location={location}
          isAnimating={this.state.pageIsAnimating}
          sideNavIsOpen={this.state.sideNavIsOpen}
          ariaHidden={this.state.ariaHidden}
          navIsAnimating={this.state.navIsAnimating}
          handleHamburger={this.handleNav}
          closeSideNav={this.handleNav}
          showMouseUpIcon={this.state.showMouseUpIcon}
        />
        <TransitionGroup 
          component={null}
          childFactory={this.childFactoryCreator()}
        >
          <CSSTransition 
            key={location.pathname}
            timeout={0}
            onEnter={() => {
              document.body.style.overflow = "hidden";
              this.setState(() => ({pageIsAnimating: true}));
            }}
            onExited={() => {
              this.setState(() => ({pageIsAnimating: false}));
              if (location.pathname !== '/' && location.pathname !== '/projects') {
                document.body.style.overflow = "auto";
              }  
            }}
          >
            <Switch location={location}>
              <Route exact path={`/`} render={props => 
                <Intro 
                  {...props} 
                  isAnimating={this.state.pageIsAnimating}
                />} 
              />
              <Route exact path={`/projects/`} render={props =>
                <Projects 
                  {...props}
                  projects={frontEndProjects}
                  mostRecentProject={this.handleMostRecentProject}
                />}
              />
              {frontEndProjects.map( project => (
                <Route key={project.title} exact path={`/projects/${project.title}`} render={props =>
                  <CaseStudy
                    {...props}
                    project={project}
                    enableMouseUpIcon={this.handleMouseUpIcon}
                  />}
                />
              ))}
              <Route exact path={`/contact`} render={props =>
                <Contact
                  {...props}
                />} 
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

App.defaultProps = {
  repetitiveProjects,
  frontEndProjects
};

export default App;