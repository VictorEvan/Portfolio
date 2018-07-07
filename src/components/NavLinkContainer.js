import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavLinkContainer = props => {
  return (
    <li className={`navlink-container ${props.title.toLowerCase()}`}>
      <NavLink 
        className={props.isAnimating || props.currentPath === props.toPath ? 'navlink disable' : 'navlink'}
        onClick={() => {
          setTimeout(() => props.closeSideNav(),250);
        }}
        exact to={props.toPath}
      >
        {props.title}
      </NavLink>
    </li>
  );
}

NavLinkContainer.propTypes = {
  closeSideNav: PropTypes.func.isRequired,
  isAnimating: PropTypes.bool,
  currentPath: PropTypes.string,
  toPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default NavLinkContainer;