import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'; 
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './css/App.css';

import Header from './components/Header';
import Intro from './components/Intro';
import Portfolio from './components/Portfolio';
import CaseStudy from './components/CaseStudy';

class App extends Component {

  state = {
    fullPage: true,
    pageIsAnimating: false,
    pageTransitionAnimation: ''
  }

  componentDidMount = () => {
    window.addEventListener('wheel',this.changeOnScroll);
  }

  handleTransitionAnimation = className => this.setState({pageTransitionAnimation: className});

  handleAnimationState = status => this.setState({pageIsAnimating: status});

  handleFullPageChange = bool => this.setState({fullPage: bool});

  detectScrollDirection = e => {
    let delta = e.wheelDelta ? e.wheelDelta : -1 * e.deltaY;
    // Negative delta is scroll down, positive delta is scroll up
    return delta < 0 ? 'scrollDown' : 'scrollUp';
  }

  changeOnScroll = e => {
    if (!this.state.pageIsAnimating) {
      if (this.detectScrollDirection(e) === 'scrollDown' && this.props.location.pathname === '/') {
        console.log('Scroll transition begin');
        this.setState({pageTransitionAnimation: 'slide-up'});
        this.props.history.push('/portfolio');
      }
      if (this.detectScrollDirection(e) === 'scrollUp' && this.props.location.pathname === '/portfolio') {
        console.log('Scroll transition begin');
        this.setState({pageTransitionAnimation: 'slide-down'});
        this.props.history.push('/');
      }
    }
  }

  render() {
    const childFactoryCreator = (classNames) => {
        return (
        (child) => {
          console.log(child);
          return ( React.cloneElement(child, { classNames }) )
        }
      );
    }

    return (
      <div className={`app ${this.state.fullPage ? 'fullpage' : ''}`}>
        <Header 
          location={this.props.location}
          isAnimating={this.state.pageIsAnimating}
          animationState={this.handleAnimationState}
          changeAnimationTo={this.handleTransitionAnimation}
        />
        <TransitionGroup 
          component='div' 
          className='container--section'
          childFactory={childFactoryCreator( this.state.pageTransitionAnimation )}
        >
          <CSSTransition 
            key={this.props.location.pathname} 
            classNames={ this.state.pageTransitionAnimation }
            timeout={1500}
            onEnter={() => {
              console.log('onEnter triggered');
              document.body.style.overflow = "hidden";
              this.handleAnimationState(true);
              }
            }
            onExited={() => {
              console.log('onExited triggered');
              document.body.style.overflow = "auto";
            }}
          >
            <Switch location={this.props.location}>
              <Route exact path={`/`} render={props => 
                <Intro 
                  {...props} 
                  isAnimating={this.state.pageIsAnimating}
                  animationState={this.handleAnimationState} 
                  changeAnimationTo={this.handleTransitionAnimation}
                />} 
              />
              <Route exact path={`/portfolio`} render={props =>
                <Portfolio 
                  {...props}
                  animationState={this.handleAnimationState}
                  projects={this.props.projects}
                />} 
              />
              {this.props.projects.map( project => (
                <Route key={project.title} exact path={`/portfolio/${project.title}`} render={props =>
                  <CaseStudy
                    {...props}
                    project={project}
                    changeFullPage={this.handleFullPageChange}
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
      description: 'Built with React and Redux, face off an unbeatable AI or play with a friend.',
      noteworthySkills: [
        {
          skill: 'React Lifecycle Methods',
          purpose: 'componentDidUpdate proved useful for dynamically initiating player turns on state change.'
        },
        {
          skill: 'Redux',
          purpose: 'Single source of truth for application state, including player and AI moves. Connected to Container Components'
        },
        {
          skill: 'Sass',
          purpose: 'Used preprocessor to create cleaner and more maintainable styles'
        }
      ]
    },
    {
      title: 'calculator',
      description: 'A responsive calculator app built with React',
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
      description: 'View beautiful backgrounds along with inspirational quotes.',
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
      description: 'Useful app for productivity built with React',
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