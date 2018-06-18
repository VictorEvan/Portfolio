import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
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
    sideNavIsOpen: false,
    navIsHidden: true,
    pageIsAnimating: null
  }

  handleFullPageChange = bool => this.setState({fullPage: bool});

  handleAnimationState = status => {
    let overflow = document.body.style.overflow;
    this.setState({pageIsAnimating: status});
    status ? overflow = "hidden" : overflow = "auto";
  }

  handleHamburger = () => {
    if (!this.state.sideNavIsOpen) {
      this.setState({sideNavIsOpen: true});
      setTimeout( () => this.setState({navIsHidden: false}),100);
    }
  }

  handleCloseSideNav = () => {
    this.setState({navIsHidden: true});
    setTimeout( () => this.setState({sideNavIsOpen: false}),300);
  }

  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Route render={({ location }) => (
          <div className={`app ${this.state.fullPage ? 'fullpage' : ''}`}>
            <Header 
              isAnimating={this.state.pageIsAnimating}
              isOpen={this.state.sideNavIsOpen}
              isHidden={this.state.navIsHidden}
              toggleSideNav={this.handleHamburger}
              closeSideNav={this.handleCloseSideNav}
            />
            <TransitionGroup component='div' className='container--section'>
              <CSSTransition 
                key={location.key} 
                classNames="slide" 
                timeout={1500}
                onEnter={() => document.body.style.overflow = "hidden"}
                onExited={() => document.body.style.overflow = "auto"}
              >
                <Switch location={location}>
                  <Route exact path={`/`} render={props => 
                    <Intro 
                      {...props} 
                      isAnimating={this.state.pageIsAnimating}
                    />} 
                  />
                  <Route exact path={`/portfolio`} render={props =>
                    <Portfolio 
                      {...props}
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
        )}/>
      </BrowserRouter>
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
          skill: 'React',
          purpose: 'Front End Framework used to create reusable Presentational Components'
        },
        {
          skill: 'Redux',
          purpose: 'Single source of truth for application state, including player and AI moves. Connected to Container Components'
        },
        {
          skill: 'Sass',
          purpose: 'Used preprocessor to create cleaner and more maintainable styles'
        },
        {
          skill: 'React Lifecycle Methods',
          purpose: ''
        },
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