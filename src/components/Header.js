import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Hamburger from './Hamburger';
import NavLinkContainer from './NavLinkContainer';

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
        <Hamburger toggleSideNav={this.handleHamburger}/>
        <div className="logo">VE</div>
        <nav 
          className={this.state.sideNavIsOpen ? "nav--active" : "nav"}
          aria-hidden={this.state.navIsHidden}
          onClick={() => this.closeSideNav()}
        >
          <div className="nav__inner" onClick={e => e.stopPropagation()}>
            <div className="nav__inner__title mobile-only">
              Victor Evangelista
            </div>
            <ul className="nav__inner__links">
              {this.props.navLinks.map( navLink => (
                <NavLinkContainer
                  key={navLink.toPath}
                  changeAnimationTo={this.props.changeAnimationTo}
                  animationState={this.props.animationState}
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
  animationState: PropTypes.func.isRequired,
  changeAnimationTo: PropTypes.func.isRequired
}

export default Header;