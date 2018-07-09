import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'; 
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './css/App.css';
import './css/victor.css';

import Header from './components/Header';
import Intro from './components/Intro';
import Portfolio from './components/Portfolio';
import CaseStudy from './components/CaseStudy';
import About from './components/About';

class App extends Component {

  state = {
    pageIsAnimating: false,
    animateFromPage: null,
  }

  componentDidMount = () => {
    // sets the initial animateFromPage location on app load
    this.setState({animateFromPage: this.props.location.pathname});
    // scroll event listener
    window.addEventListener('wheel',this.changeOnScroll, {passive: true});
  }

  changeOnScroll = e => {
    const detectScrollDirection = e => {
      let delta = e.wheelDelta ? e.wheelDelta : -1 * e.deltaY;
      // Negative delta is scroll down, positive delta is scroll up
      return delta < 0 ? 'scrollDown' : 'scrollUp';
    }
    
    if (!this.state.pageIsAnimating) {
      if (detectScrollDirection(e) === 'scrollDown' && 
        this.props.location.pathname === '/'
      ) {
        this.props.history.push('/projects');
        this.setState({pageIsAnimating: true});
      }
      if (
        detectScrollDirection(e) === 'scrollUp' &&
        this.props.location.pathname === '/projects' &&
        window.pageYOffset === 0 // 0 pageYOffset is top of page
      ) {
        this.props.history.push('/');
        this.setState({pageIsAnimating: true});
      }
    }
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
          timeout: 1500, appear: false
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
          timeout: 1500, appear: false
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
          timeout: 1500, appear: false
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
          timeout: 1500, appear: false
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
      <div className='app'>
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
              <Route exact path={`/`} render={props => 
                <Intro 
                  {...props} 
                  isAnimating={this.state.pageIsAnimating}
                />} 
              />
              <Route exact path={`/projects`} render={props =>
                <Portfolio 
                  {...props}
                  projects={this.props.projects}
                />} 
              />
              <Route exact path={`/contact`} render={props =>
                <About
                  {...props}
                />} 
              />
              {this.props.projects.map( project => (
                <Route key={project.title} exact path={`/projects/${project.title}`} render={props =>
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
        {
          skill: 'Redux',
          purpose: 'Single source of truth for application state, including player and AI moves. Connected to Container Components'
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
      noteworthySkills: [
        {
          skill: 'Dynamically Rendered React Components',
          purpose: 'Calculator buttons are dynamically rendered from JavaScript data structures'
        },
        {
          skill: 'CSS Grid',
          purpose: 'Layout System used to create calculator button rows and columns'
        },
        {
          skill: 'React CSS Transitions Group',
          purpose: 'High-level API add-on used to perform simple and reusable CSS animations'
        }
      ]
    },
    {
      title: 'random-quote-machine',
      description: 'Inspirational quotes from the web',
      noteworthySkills: [
        {
          skill: 'Fetch API',
          purpose: 'Used to request JSON containing quote data from remote server API'
        },
        {
          skill: 'CSS Media Query Responsive Design',
          purpose: 'Images and layout are dynamic according to device dimensions'
        },
        {
          skill: 'Regex',
          purpose: 'Quotes and Author names are adjusted for Twitter Query with Replace method'
        }
      ]
    },
    {
      title: 'pomodoro-clock',
      description: 'Simple productivity app',
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