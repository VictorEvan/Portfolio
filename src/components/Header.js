import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import GitHub from './../images/social/GitHub';
import Codepen from './../images/social/Codepen';
import Linkedin from './../images/social/Linkedin';
import Logo from '../images/Logo';

import Hamburger from './Hamburger';
import NavLinkContainer from './NavLinkContainer';

import ScrollDownIcon from './../images/icons/ScrollDownIcon';
import MouseIcon from './../images/icons/MouseIcon';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header>
        <Hamburger 
          toggleSideNav={this.props.handleHamburger}
          ariaHidden={this.props.ariaHidden}
        />
        { this.props.showMouseUpIcon ?
          <Link
            className="mouse-up-container"
            aria-label="to projects"
            to="/projects"
          >
            <div className={`carousel-scroll-btn--lone ${this.props.sideNavIsOpen ? 'lower-z-index' : ''}`}>
              <div className="carousel-scroll-btn-icon-wrapper">
                <ScrollDownIcon />
              </div>
                <MouseIcon />
            </div>
          </Link> : null
        }
        <div className="logo-container">
          <NavLink
            className={this.props.isAnimating ? 'navlink disable' : 'navlink'}
            exact to='/'
          >
            <Logo 
              className='logo logo-animates'
            />
          </NavLink>
        </div>
        <nav 
          className={this.props.sideNavIsOpen ? "nav--active" : "nav"}
          aria-hidden={this.props.ariaHidden}
          onClick={() => this.props.closeSideNav()}
        >
          <div className="nav__inner" onClick={e => e.stopPropagation()}>
            <div className="nav__inner__title mobile-only">
            </div>
            <ul className="nav__inner__links">
              {this.props.navLinks.map( navLink => (
                <NavLinkContainer
                  key={navLink.toPath}
                  closeSideNav={this.props.closeSideNav}
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
                  <GitHub/>
                </a>
              </li>
              <li className="social-link-container">
                <a className="social-link" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/victorevan">
                  <Linkedin/>
                </a>
              </li>
              <li className="social-link-container">
                <a className="social-link" target="_blank" rel="noopener noreferrer" href="https://www.codepen.io/victorevangelista">
                  <Codepen/>
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
      title: 'Projects',
      toPath: '/projects'
    },
    {
      title: 'Data',
      toPath: '/data'
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
  sideNavIsOpen: PropTypes.bool.isRequired,
  ariaHidden: PropTypes.bool.isRequired,
  handleHamburger: PropTypes.func.isRequired,
  closeSideNav: PropTypes.func.isRequired,
  showMouseUpIcon: PropTypes.bool.isRequired,
}

export default Header;