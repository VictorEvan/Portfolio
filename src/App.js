import React, { Component } from 'react';
/* import { BrowserRouter, Route } from 'react-router-dom'; */
import './css/App.css';

import Header from './components/Header';
import Intro from './components/Intro';

class App extends Component {

  state = {
    sideNavIsOpen: false,
    navIsHidden: true
  }

  handleHamburger = () => {
    if (!this.state.sideNavIsOpen) {
      this.setState({
        sideNavIsOpen: !this.state.sideNavIsOpen
      });
      setTimeout( () => this.setState({navIsHidden: !this.state.navIsHidden}),100);
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
      <div className="app">
        <Header 
          isOpen={this.state.sideNavIsOpen}
          isHidden={this.state.navIsHidden}
          toggleSideNav={this.handleHamburger}
          closeSideNav={this.handleCloseSideNav}
        />
        <Intro />
        <Intro />
        <footer></footer>
      </div>
    );
  }
}

App.defaultProps = {
  
};

export default App;