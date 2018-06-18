import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'; 
import PropTypes from 'prop-types';

import Hamburger from './Hamburger';

class Header extends Component {

  state = {
    sideNavIsOpen: false,
    navIsHidden: true,
  }

  handleHamburger = () => {
    if (!this.state.sideNavIsOpen) {
      this.setState({sideNavIsOpen: true});
      setTimeout( () => this.setState({navIsHidden: false}),100);
    }
  }

  closeSideNav = () => {
    this.setState({navIsHidden: true});
    setTimeout( () => this.setState({sideNavIsOpen: false}),300);
  }

  render() {
    return (
      <header>
        <Hamburger 
          toggleSideNav={this.handleHamburger}
        />
        <div className="logo">logo</div>
        <nav 
          className={this.state.sideNavIsOpen ? "nav--active" : "nav"}
          aria-hidden={this.state.navIsHidden}
          onClick={() => this.closeSideNav()}
        >
          <div 
            className="nav__inner"
            onClick={e => e.stopPropagation()}
          >
            <div className="nav__inner__title mobile-only">
              Victor Evangelista
            </div>
            <ul className="nav__inner__links">
              <li>
                <NavLink 
                  className={
                    this.props.isAnimating || this.props.location.pathname === '/' ?
                    'disable' : ''
                  }
                  exact to={`/`}
                  onClick={() => this.props.animationState(true)}
                >HOME</NavLink>
              </li>
              <li>
                <NavLink 
                  className={
                    this.props.isAnimating || this.props.location.pathname === '/portfolio' ?
                    'disable' : ''
                  }
                  to={`/portfolio`}
                  onClick={() => this.props.animationState(true)}
                >PORTFOLIO</NavLink>
              </li>
              <li>
                <NavLink 
                  className='disable'
                  // className={
                  //   this.props.isAnimating ?
                  //   'disable' : ''
                  // }
                  to={`/contact`}
                  onClick={() => this.props.animationState(true)}
                >CONTACT</NavLink>
              </li>
            </ul>
            <ul className="nav__inner__social mobile-only">
              <li>L</li>
              <li>G</li>
              <li>C</li>
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
  isAnimating: PropTypes.bool,
  animationState: PropTypes.func.isRequired
}

export default Header;