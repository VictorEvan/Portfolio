import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'; 
import {
  TransitionGroup,
  CSSTransition
 } from 'react-transition-group';
import './css/App.css';

import Header from './components/Header';
import Intro from './components/Intro';
import Portfolio from './components/Portfolio';
import CaseStudy from './components/CaseStudy';

class App extends Component {

  state = {
    fullPage: true,
    currentPage: this.props.location.pathname,
    previousPage: null,
    nextPage: null,
    pageIsAnimating: null,
  }

  componentDidMount = () => {
    window.addEventListener('wheel',this.changeOnScroll);
  }

  handleAnimationToAndFrom = (from, to) => 
    this.setState({
      previousPage: from,
      nextPage: to 
    });

  handleNextCurrentPage = page => this.setState({currentPage: page});

  handleFullPageChange = bool => this.setState({fullPage: bool});

  handleAnimationState = status => this.setState({pageIsAnimating: status});

  detectScrollDirection = e => {
    let delta = e.wheelDelta ? e.wheelDelta : -1 * e.deltaY
    // Negative delta is scroll down, positive delta is scroll up
    return delta < 0 ? 'scrollDown' : 'scrollUp'
  }

  changeOnScroll = e => {
    if (!this.state.pageIsAnimating) {
      if (this.detectScrollDirection(e) === 'scrollDown' && this.state.currentPage === '/') {
        this.props.history.push('/portfolio');
      }
      if (this.detectScrollDirection(e) === 'scrollUp' && this.state.currentPage === '/portfolio') {
        this.props.history.push('/');
      }
    }
  }

  render() {
    const childFactoryCreator = (classNames) => (
      (child) => (
        React.cloneElement(child, {
          classNames
        })
      )
    );

    const condition = () => {
      return this.props.location.pathname === '/portfolio';
    }

    return (
      <div className={`app ${this.state.fullPage ? 'fullpage' : ''}`}>
        <Header 
          location={this.props.location}
          isAnimating={this.state.pageIsAnimating}
          animationState={this.handleAnimationState}
        />
        <TransitionGroup 
          component='div' 
          className='container--section'
          childFactory={childFactoryCreator( condition() ? 'slide-up' : 'slide-down')}
        >
          <CSSTransition 
            key={this.props.location.key} 
            classNames={ condition() ? 'slide-up' : 'slide-down'}
            timeout={1500}
            onEnter={() => {
              document.body.style.overflow = "hidden";
              this.handleAnimationState(true);
              }
            }
            onExited={() => document.body.style.overflow = "auto"}
          >
            <Switch location={this.props.location}>
              <Route exact path={`/`} render={props => 
                <Intro 
                  {...props} 
                  animateFromTo={this.handleAnimationToAndFrom}
                  currentPage={this.state.currentPage}
                  setNextCurrentPage={this.handleNextCurrentPage}
                  isAnimating={this.state.pageIsAnimating}
                  animationState={this.handleAnimationState} 
                />} 
              />
              <Route exact path={`/portfolio`} render={props =>
                <Portfolio 
                  {...props}
                  animateFromTo={this.handleAnimationToAndFrom}
                  currentPage={this.state.currentPage}
                  setNextCurrentPage={this.handleNextCurrentPage}
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