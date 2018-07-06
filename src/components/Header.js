import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Logo from '../images/Logo';
import Hamburger from './Hamburger';
import NavLinkContainer from './NavLinkContainer';

class Header extends Component {

  state = {
    sideNavIsOpen: false,
    navIsHidden: true,
  }

  handleHamburger = () => {
    if (!this.state.sideNavIsOpen) {
      console.log('toggle on');
      this.setState({sideNavIsOpen: true, navIsHidden: false});
    } else {
      console.log('toggle off');
      this.setState({navIsHidden: true});
      setTimeout( () => this.setState({sideNavIsOpen: false}),700);
    }
  }

  closeSideNav = () => {
    this.setState({navIsHidden: true});
    setTimeout( () => this.setState({sideNavIsOpen: false}),700);
  }

  render() {
    return (
      <header>
        <Hamburger 
          toggleSideNav={this.handleHamburger}
          sideNavIsOpen={this.state.sideNavIsOpen}
          navIsHidden={this.state.navIsHidden}
        />
        <div className="logo-container">
          <Logo />
        </div>
        <nav 
          className={this.state.sideNavIsOpen ? "nav--active" : "nav"}
          aria-hidden={this.state.navIsHidden}
        >
          <div className="nav__inner" onClick={e => e.stopPropagation()}>
            <div className="nav__inner__title mobile-only">
              <Logo />
            </div>
            <ul className="nav__inner__links">
              {this.props.navLinks.map( navLink => (
                <NavLinkContainer
                  key={navLink.toPath}
                  closeSideNav={this.closeSideNav}
                  isAnimating={this.props.isAnimating}
                  currentPath={this.props.location.pathname}
                  toPath={navLink.toPath}
                  title={navLink.title}
                />
              ))}
            </ul>
            <ul className="nav__inner__social mobile-only">
              <li className="social-link-container">L</li>
              <li className="social-link-container">G</li>
              <li className="social-link-container">C</li>
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}

Header.defaultProps = {
  navLinks: [
    {
      title: 'Home',
      toPath: '/'
    },
    {
      title: 'Portfolio',
      toPath: '/portfolio'
    },
    {
      title: 'Contact',
      toPath: '/contact'
    }
  ]
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
  isAnimating: PropTypes.bool,
}

export default Header;