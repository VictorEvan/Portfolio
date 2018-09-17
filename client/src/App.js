import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'; 
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Sidebar from 'react-sidebar';
import './scss/App.css';

import frontEndProjects from './data/frontEndProjects';
import repetitiveProjects from './data/repetitiveProjects';

import transitionHandler from './util/transitionHandler';
import addEvent from './util/addEvent';

import SidebarContent from './components/SidebarContent';
import Header from './components/Header';
import Intro from './components/Intro';
import Projects from './components/Projects';
import CaseStudy from './components/CaseStudy';
import Contact from './components/Contact';

const { Lethargy } = require('lethargy');

class App extends Component {

  state = {
    sidebarOpen: false,
    pageIsAnimating: false,
    mostRecentProjectVisited: null
  }

  onSetSidebarOpen = (open) => this.setState(() => ({sidebarOpen: open}));

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

  movementHandler = direction => {
    const { location } = this.props;
    const { pageIsAnimating } = this.state;

    if (!pageIsAnimating) {
      if (direction === 'scrollDown' && 
        location.pathname === '/'
      ) {
        this.props.history.push('/projects');
      } else if (
        direction === 'scrollUp' &&
        location.pathname === '/projects'
      ) {
        this.props.history.push('/');
      } else if (
        direction === 'scrollUp' &&
        repetitiveProjects[location.pathname]
      ) {
        this.props.history.push('/projects');
      } else if (
        direction === 'scrollDown' &&
        location.pathname === '/projects' &&
        this.state.mostRecentProjectVisited
      ) {
        this.props.history.push(`${this.state.mostRecentProjectVisited}`);
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
    const { location, history } = this.props;
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
          isAnimating={pageIsAnimating}
        />
        <Sidebar
          sidebar={<SidebarContent/>}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          shadow={true}
          styles={{ 
            sidebar: { 
              zIndex: 2000, background: "white", width: "70%"
            },
            dragHandle: {
              zIndex: 1000
            },
            overlay: {
              zIndex: 1000
            }
          }}
        >
          <button onClick={() => this.onSetSidebarOpen(true)} style={{color: 'white'}} >TOGGLE</button>
        </Sidebar>
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
              const { to } = this.props.historyObject;
              this.setState(() => ({pageIsAnimating: false}));
              if (to !== '/' && to !== '/projects') {
                document.body.style.overflow = "auto";
              }  
            }}
          >
            <Switch location={location}>
              <Route exact path={`/`} render={props => 
                <Intro 
                  {...props} 
                  isAnimating={pageIsAnimating}
                />} 
              />
              <Route exact path={`/projects/`} render={props =>
                <Projects
                  location={location}
                  mostRecentProject={this.handleMostRecentProject}
                />}
              />
              {frontEndProjects.map( project => (
                <Route key={project.title} exact path={`/projects/${project.title}`} render={props =>
                  <CaseStudy
                    {...props}
                    project={project}
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

export default App;