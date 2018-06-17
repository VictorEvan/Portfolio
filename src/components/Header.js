import React from 'react';
import { withRouter, NavLink } from 'react-router-dom'; 
import PropTypes from 'prop-types';

import Hamburger from './Hamburger';

const Header = props => {
  return (
    <header>
      <Hamburger 
        toggleSideNav={props.toggleSideNav}
      />
      <div className="logo">logo</div>
      <nav 
        className={props.isOpen ? "nav--active" : "nav"}
        aria-hidden={props.isHidden}
        onClick={() => props.closeSideNav()}
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
                  props.isAnimating || props.location.pathname === '/' ?
                  'disable' : ''
                }
                exact to={`/`}
                onClick={() => props.animationState(true)}
              >HOME</NavLink>
            </li>
            <li>
              <NavLink 
                className={
                  props.isAnimating || props.location.pathname === '/portfolio' ?
                  'disable' : ''
                }
                to={`/portfolio`}
                onClick={() => props.animationState(true)}
              >PORTFOLIO</NavLink>
            </li>
            <li>
              <NavLink 
                className='disable'
                // className={
                //   props.isAnimating ?
                //   'disable' : ''
                // }
                to={`/contact`}
                onClick={() => props.animationState(true)}
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

Header.propTypes = {
  isAnimating: PropTypes.bool,
  animationState: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isHidden: PropTypes.bool.isRequired,
  toggleSideNav: PropTypes.func.isRequired,
  closeSideNav: PropTypes.func.isRequired
}

export default withRouter(Header);