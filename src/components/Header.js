import React from 'react';
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
        className={props.isOpen ? "navbar--active" : "navbar"}
        aria-hidden={props.isHidden}
        onClick={() => props.closeSideNav()}
      >
        <ul 
          className="navbar__links"
          onClick={e => e.stopPropagation()}
        >
          <li>
            Victor Evangelista
          </li>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Projects</a>
          </li>
          <li>
            <a>Contact</a>
          </li>
          <li id="mobile-only" className="navbar__links__social">
            <div>L</div>
            <div>G</div>
            <div>C</div>
          </li>
        </ul>
      </nav>
    </header>
  )
}

Header.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isHidden: PropTypes.bool.isRequired,
  toggleSideNav: PropTypes.func.isRequired,
  closeSideNav: PropTypes.func.isRequired
}

export default Header;