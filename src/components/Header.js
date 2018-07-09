import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Logo from '../images/Logo';

import Hamburger from './Hamburger';
import NavLinkContainer from './NavLinkContainer';

class Header extends Component {

  state = {
    sideNavIsOpen: false,
    ariaHidden: true,
    navIsAnimating: false,
    logoClass: ''
  }

  handleHamburger = () => {
    if (!this.state.isAnimating) {
      this.setState({sideNavIsOpen: true, navIsAnimating: true});
    if (!this.state.sideNavIsOpen) {
        setTimeout( () => this.setState({ariaHidden: false}),10);
        setTimeout( () => this.setState({navIsAnimating: false}),500);
    } else {
        this.setState({ariaHidden: true});
        setTimeout( () => this.setState({sideNavIsOpen: false, navIsAnimating: false}),500);
    }
  }
  }

  closeSideNav = () => {
    this.setState({ariaHidden: true});
    setTimeout( () => this.setState({sideNavIsOpen: false}),500);
  }

  componentDidMount = () => {
    this.setState({logoClass: 'logo logo-animates'});
    setTimeout(()=>this.setState({logoClass: 'logo'}),5800)
  }

  render() {
    return (
      <header>
        <Hamburger 
          toggleSideNav={this.handleHamburger}
          ariaHidden={this.state.ariaHidden}
        />
        <div className="logo-container">
          <NavLink
            className={this.props.isAnimating ? 'navlink disable' : 'navlink'}
            exact to='/'
          >
            <Logo 
              className={this.state.logoClass}
            />
          </NavLink>
        </div>
        <nav 
          className={this.state.sideNavIsOpen ? "nav--active" : "nav"}
          aria-hidden={this.state.ariaHidden}
          onClick={() => this.closeSideNav()}
        >
          <div className="nav__inner" onClick={e => e.stopPropagation()}>
            <div className="nav__inner__title mobile-only">
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
              <li className="social-link-container">
                <a className="social-link" target="_blank" rel="noopener noreferrer" href="https://www.github.com/victorevan">
                  <img className="social-link__image--github" src={require('../images/social/github.png')} alt="GitHub"/>
                </a>
              </li>
              <li className="social-link-container">
                <a className="social-link" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/victorevan">
                  <img className="social-link__image--linkedin" src={require('../images/social/linkedin.png')} alt="Linkedin"/>
                </a>
              </li>
              <li className="social-link-container">
                <a className="social-link" target="_blank" rel="noopener noreferrer" href="https://www.codepen.io/victorevangelista">
                  <img className="social-link__image--codepen" src={require('../images/social/codepen.png')} alt=""/>
                </a>
              </li>
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