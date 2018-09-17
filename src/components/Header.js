import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import GitHub from './../images/social/GitHub';
import Codepen from './../images/social/Codepen';
import Linkedin from './../images/social/Linkedin';
import Logo from '../images/Logo';

import NavLinkContainer from './NavLinkContainer';

class Header extends Component {
  render() {
    return (
      <header>
        <div className="logo-container">
          <NavLink
            className={this.props.isAnimating || this.props.location.pathname === '/' ? 'navlink disable' : 'navlink'}
            exact to='/'
          >
            <Logo 
              className='logo logo-animates'
            />
          </NavLink>
        </div>
        <nav 
          className='nav'
        >
          <div className="nav__inner" onClick={e => e.stopPropagation()}>
            <div className="nav__inner__title mobile-only">
            </div>
            <ul className="nav__inner__links">
              {this.props.navLinks.map( navLink => (
                <NavLinkContainer
                  key={navLink.toPath}
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
  isAnimating: PropTypes.bool
}

export default Header;