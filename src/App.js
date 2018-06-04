import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; 
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
          <Route path='/projects' component={Projects} />
        </div>
      </BrowserRouter>
    );
  }
}

App.defaultProps = {
  
};

export default App;