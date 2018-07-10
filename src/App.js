import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'; 
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './scss/App.css';

import Header from './components/Header';
import Intro from './components/Intro';
import Portfolio from './components/Portfolio';
import CaseStudy from './components/CaseStudy';
import About from './components/About';

class App extends Component {

  state = {
    pageIsAnimating: false,
    animateFromPage: null
  }

  componentDidMount = () => {
    // sets the initial animateFromPage location on app load
    this.setState({animateFromPage: this.props.location.pathname});
    // scroll event listener
    window.addEventListener('wheel',this.detectScroll, {passive: true});
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
  }

  movementHandler = direction => {
    if (!this.state.pageIsAnimating) {
      if (direction === 'scrollDown' && 
        this.props.location.pathname === '/'
      ) {
        this.props.history.push('/projects');
        this.setState({pageIsAnimating: true});
      }
      if (
        direction === 'scrollUp' &&
        this.props.location.pathname === '/projects' &&
        window.pageYOffset === 0 // 0 pageYOffset is top of page
      ) {
        this.props.history.push('/');
        this.setState({pageIsAnimating: true});
      }
    }
  }

  detectScroll = e => {
    let delta = e.wheelDelta ? e.wheelDelta : -1 * e.deltaY;
    // Negative delta is scroll down, positive delta is scroll up
    let direction = delta < 0 ? 'scrollDown' : 'scrollUp';
    this.movementHandler(direction);
  }

  detectSwipe = (el, callback) => {
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
        let touchobj = e.changedTouches[0]
        swipedir = 'none'
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        // e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchmove', e => {
      // prevents annoying browser bar glitch on mobile
      if (this.props.location.pathname === '/') {
        e.preventDefault() // prevent scrolling
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
    }, false)
  }

  animationHandler = (from, to) => {
    // handle user back button mid transition
    if (from === to) {
      return {
        classNames: {
          enter: '',
          enterActive: '',
          enterDone: 'negate',
          exit: '',
          exitActive: '',
          exitDone: ''
        }, timeout: 0, appear: false
      }
    }
    if (from !== to) {
      // from switch
      const repetitiveProjects = {
        '/projects/tic-tac-toe': true,
        '/projects/calculator': true,
        '/projects/random-quote-machine': true,
        '/projects/pomodoro-clock': true
      }
      if (repetitiveProjects[from] && to !== '/contact') from = 'any-project' 
      switch(from) {
        case '/contact':
          return {
            classNames: {
              enter: '',
              enterActive: '',
              enterDone: '',
              exit: 'move-out-halves',
              exitActive: 'move-out-halves-active',
              exitDone: ''
            }, timeout: 1250, appear: false
          }
        case 'any-project':
          return {
            classNames: 'fade', timeout: 500, appear: false
          }
        default:
          break;
      }

      // to switch
      switch(to) {
        case '/contact':
          return {
            classNames: {
              enter: 'move-in-halves',
              enterActive: 'move-in-halves-active',
              enterDone: '',
              exit: '',
              exitActive: '',
              exitDone: ''
            }, timeout: 1500, appear: false
          }
        default:
          break;
      }
    }

    // full from to switch
    const data = `${from}-${to}`;
    switch(data) {
      case '/-/projects':
        return {
          classNames: {
            enter: 'slide-up-from-bottom',
            enterActive: 'slide-up-from-bottom-active',
            enterDone: '',
            exit: 'slide-up-from-middle',
            exitActive: 'slide-up-from-middle-active',
            exitDone: 'slide-up-from-middle-done'
          },
          timeout: 1500, appear: false
        }
      case '/projects-/':
        return {
          classNames: {
            enter: 'slide-down-from-top',
            enterActive: 'slide-down-from-top-active',
            enterDone: '',
            exit: 'slide-down-from-middle',
            exitActive: 'slide-down-from-middle-active',
            exitDone: 'slide-down-from-middle-done'
          },
          timeout: 1500, appear: false
        }
      case `/projects-/projects/${this.props.projects[0].title}`:
        return {
          classNames: {
            enter: 'fade-enter',
            enterActive: 'fade-enter-active--delay',
            enterDone: '',
            exit: 'expand-project--project-one',
            exitActive: 'expand-project--project-one-active',
            exitDone: ''
          },
          timeout: 1000, appear: false
        }
      case `/projects-/projects/${this.props.projects[1].title}`:
        return {
          classNames: {
            enter: 'fade-enter',
            enterActive: 'fade-enter-active--delay',
            enterDone: '',
            exit: 'expand-project--project-two',
            exitActive: 'expand-project--project-two-active',
            exitDone: ''
          },
          timeout: 1000, appear: false
        }
      case `/projects-/projects/${this.props.projects[2].title}`:
        return {
          classNames: {
            enter: 'fade-enter',
            enterActive: 'fade-enter-active--delay',
            enterDone: '',
            exit: 'expand-project--project-three',
            exitActive: 'expand-project--project-three-active',
            exitDone: ''
          },
          timeout: 1000, appear: false
        }
      case `/projects-/projects/${this.props.projects[3].title}`:
        return {
          classNames: {
            enter: 'fade-enter',
            enterActive: 'fade-enter-active--delay',
            enterDone: '',
            exit: 'expand-project--project-four',
            exitActive: 'expand-project--project-four-active',
            exitDone: ''
          },
          timeout: 1000, appear: false
        }
      default:
        return {
          classNames: {
            enter: '',
            enterActive: '',
            enterDone: '',
            exit: '',
            exitActive: '',
            exitDone: ''
          },
          timeout: 0, appear: false
        }
    }
  }

  render() {
    const childFactoryCreator = () => {
      let animateFromPage = this.state.animateFromPage;
      let animateToPage = this.props.location.pathname;
      console.log(`${animateFromPage} to ${animateToPage}`);
      console.log(this.animationHandler(animateFromPage, animateToPage));
      let { classNames, timeout, appear } = this.animationHandler(animateFromPage,animateToPage);
        return (
        (child) => {
          return ( React.cloneElement(child, { classNames, timeout, appear }) )
        }
      );
    }

    const scrollablePages = {
      '/projects/tic-tac-toe': true,
      '/projects/calculator': true,
      '/projects/random-quote-machine': true,
      '/projects/pomodoro-clock': true
    };

    return (
      <div className={scrollablePages[`${this.props.location.pathname}`] ? 'app scrollable' : 'app'}>
        <Header 
          location={this.props.location}
          isAnimating={this.state.pageIsAnimating}
        />
        <TransitionGroup 
          component={null}
          childFactory={childFactoryCreator()}
        >
          <CSSTransition 
            key={this.props.location.pathname}
            timeout={0}
            onEnter={() => {
              // console.log(`onEnter: A <Transition> callback fired immediately after the 'enter' or 'appear' class is applied.`);
              document.body.style.overflow = "hidden";
              this.setState({pageIsAnimating: true});
            }}
            // onEntering={() => console.log(`onEntering: A <Transition> callback fired immediately after the 'enter-active' or 'appear-active' class is applied.`)}
            onEntered={() => {
              // console.log(`onEntered: A <Transition> callback fired immediately after the 'enter' or 'appear' classes are removed and the done class is added to the DOM node.`);
              if (this.props.location.pathname === '/') this.setState({pageIsAnimating: false});
            }}
            // onExit={() => console.log(`onExit: A <Transition> callback fired immediately after the 'exit' class is applied.`)}
            // onExiting={() => console.log(`onExiting: A <Transition> callback fired immediately after the 'exit-active' is applied.`)}
            onExited={() => {
              // console.log(`onExited: A <Transition> callback fired immediately after the 'exit' classes are removed and the exit-done class is added to the DOM node.`);
              // set the current Page to be the animateFromPage going forward
              setTimeout( () => {
                this.setState({animateFromPage: this.props.location.pathname, pageIsAnimating: false});
              },0 );
              document.body.style.overflow = "auto";
            }}
          >
            <Switch location={this.props.location}>
              <Route exact path={`${process.env.PUBLIC_URL}/`} render={props => 
                <Intro 
                  {...props} 
                  isAnimating={this.state.pageIsAnimating}
                />} 
              />
              <Route exact path={`${process.env.PUBLIC_URL}/projects`} render={props =>
                <Portfolio 
                  {...props}
                  projects={this.props.projects}
                />} 
              />
              <Route exact path={`${process.env.PUBLIC_URL}/contact`} render={props =>
                <About
                  {...props}
                />} 
              />
              {this.props.projects.map( project => (
                <Route key={project.title} exact path={`${process.env.PUBLIC_URL}/projects/${project.title}`} render={props =>
                  <CaseStudy
                    {...props}
                    project={project}
                  />}
                />
              ))}
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

App.defaultProps = {
  projects: [
    {
      title: 'tic-tac-toe',
      description: 'Single or Multiplayer Redux Game',
      programmingDescription: "React's reusable presentational components and Redux' store for app state proved to make a delightful cocktail for this game.",
      programmingLink: {
        href: "https://github.com/VictorEvan/Tic-Tac-Toe/blob/master/src/redux/redux.js",
        text: "Redux Source Code"
      },
      programmingLinkDescription: "Take a deeper look into the state and logic behind the app. Action Type Creators, Reducers, a MiniMax algorithm- Oh my!",
      designDescription: "Using Sass as my CSS preprocessor proved to be quintessential in rapidly developing quality styles with variables, mixins, and extends.",
      designLink: {
        href: "https://github.com/VictorEvan/Tic-Tac-Toe/blob/master/src/scss/layout/_layout.scss",
        text: "Layout Source Code"
      },
      designLinkDescription: "Check out how CSS Flex, Grid, and Position are used to create the game layout. Also noteworthy- Sass extends!",
      thoughtsDescription: "Creating this application from scratch taught me a lot about how React lifecycle methods can be used in conjunction with Redux.",
      notableSkillsUsed: [
        "React Component Lifecycle Methods",
        "React CSS Transitions",
        "Redux State Management",
        "Sass CSS Preprocessor",
      ],
    },
    {
      title: 'calculator',
      description: 'Fully functional & responsive',
      programmingDescription: "Using React for this application was a pleasure. The majority of the UI is dynamically rendered by reusable React Components.",
      programmingLink: {
        href: "https://github.com/VictorEvan/Calculator/blob/master/src/App.js",
        text: "App Source Code"
      },
      programmingLinkDescription: "Take a look at the building blocks and logic behind the app, all following industry patterns.",
      designDescription: "Inspired by the UI of the Android calculator app, I sought to create my own fullscreen responsive design using CSS Grid and Flex.",
      designLink: {
        href: "https://github.com/VictorEvan/Calculator/blob/master/src/scss/_layout.scss",
        text: "Layout Source Code"
      },
      designLinkDescription: "Take a look at the short, simple, and beautiful layout rules that make the app just work.",
      thoughtsDescription: "This made for a fun project to practice programmatically generating UI elements each with their own callback functions built in.",
      notableSkillsUsed: [
        "CSS Grid/Flexbox",
        "Dynamically Rendered UI Components",
        "JavaScript Closures",
        "Edge Case Handling",
      ],
    },
    {
      title: 'random-quote-machine',
      description: 'Inspirational quotes from the web',
      programmingDescription: "All the quotes behind this beautiful app are pulled from the web using the fetch API, and can be easily be shared on Twitter.",
      programmingLink: {
        href: "https://github.com/VictorEvan/Random-Quote-Machine/blob/master/src/App.js",
        text: "App Source Code"
      },
      programmingLinkDescription: "Take a look behind the scenes at the built in methods that handle changing the app state.",
      designDescription: "The design for this app was greatly inspired by quotefancy who combine beautiful background images with fantastic quotes.",
      designLink: {
        href: "https://github.com/VictorEvan/Random-Quote-Machine/blob/master/src/scss/App.scss",
        text: "Styles Source Code"
      },
      designLinkDescription: "Check out the Sass mixins, lists and control directives that bring the app to life!",
      thoughtsDescription: "This was a highly enjoyable and uplifting project to work on. I love designing and coding beautifully simple apps.",
      notableSkillsUsed: [
        "JavaScript fetch API",
        "Sass Mixins, Lists & Control Directives",
        "Image Caching",
        "Regex Data Cleansing",
      ],
    },
    {
      title: 'pomodoro-clock',
      description: 'Simple productivity app',
      programmingDescription: "",
      programmingLink: {
        href: "",
        text: ""
      },
      programmingLinkDescription: "",
      designDescription: "",
      designLink: {
        href: "",
        text: ""
      },
      designLinkDescription: "",
      thoughtsDescription: "",
      notableSkillsUsed: [
        "",
        "",
        "",
        "",
      ],
      noteworthySkills: [
        {
          skill: '',
          purpose: ''
        },
        {
          skill: '',
          purpose: ''
        },
        {
          skill: '',
          purpose: ''
        }
      ]
    }
  ]
};

export default App;