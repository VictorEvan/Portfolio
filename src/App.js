import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; 
import {
  TransitionGroup,
  CSSTransition
 } from 'react-transition-group';
import './css/App.css';

import Header from './components/Header';
import Intro from './components/Intro';
import Projects from './components/Projects';

class App extends Component {

  state = {
    sideNavIsOpen: false,
    navIsHidden: true
  }

  handleHamburger = () => {
    if (!this.state.sideNavIsOpen) {
      this.setState({
        sideNavIsOpen: true
      });
      setTimeout( () => this.setState({navIsHidden: false}),100);
    }
  }

  handleCloseSideNav = () => {
    this.setState({
      navIsHidden: true
    });
    setTimeout( () => this.setState({sideNavIsOpen: false}),300);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header 
            isOpen={this.state.sideNavIsOpen}
            isHidden={this.state.navIsHidden}
            toggleSideNav={this.handleHamburger}
            closeSideNav={this.handleCloseSideNav}
          />
          <Route exact path='/' component={Intro} />
          <Route path='/portfolio' render={(props) => <Projects {...props} projects={this.props.projects} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

App.defaultProps = {
  projects: [
    {
      title: 'calculator',
      description: 'simple calculator app',
      codeLink: 'https://github.com/VictorEvan/Calculator',
      projectLink: ''
    },
    {
      title: 'random-quote-machine',
      description: 'beautiful quote display',
      codeLink: 'https://github.com/VictorEvan/Random-Quote-Machine',
      projectLink: ''
    },
    {
      title: 'tic-tac-toe',
      description: 'one or two player game',
      codeLink: 'https://github.com/VictorEvan/Tic-Tac-Toe',
      projectLink: ''
    },
    {
      title: 'pomodoro-clock',
      description: 'useful app for productivity',
      codeLink: 'https://github.com/VictorEvan/Pomodoro-Clock',
      projectLink: ''
    }
  ]
};

export default App;