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
        <Route render={({ location }) => (
          <div className="app">
            <Header 
              isOpen={this.state.sideNavIsOpen}
              isHidden={this.state.navIsHidden}
              toggleSideNav={this.handleHamburger}
              closeSideNav={this.handleCloseSideNav}
            />
            <TransitionGroup>
              <CSSTransition 
                key={location.key} 
                classNames="slide" 
                timeout={1500}
                onEnter={() => document.body.style.overflow = "hidden"}
                onExited={() => document.body.style.overflow = "auto"}
              >
                <Switch location={location}>
                  <Route exact path="/" component={Intro} />
                  <Route exact path="/portfolio" render={props =>
                    <Portfolio {...props} projects={this.props.projects}/>
                  } />
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
      description: 'Built with React and Redux, face off an unbeatable AI or play with a friend.'
    },
    {
      title: 'calculator',
      description: 'A responsive calculator app built with React'
    },
    {
      title: 'random-quote-machine',
      description: 'View beautiful backgrounds along with inspirational quotes.'
    },
    {
      title: 'pomodoro-clock',
      description: 'Useful app for productivity built with React'
    }
  ]
};

export default App;