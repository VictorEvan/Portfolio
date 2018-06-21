import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavLinkContainer = props => {
  return (
    <li className="navlink-container">
      <NavLink 
        className={props.isAnimating || props.currentPath === props.toPath ? 'navlink disable' : 'navlink'}
        onClick={() => {
          props.changeAnimationTo(props.toPath === '/portfolio' ? 'slide-up' : 'slide-down');
          props.animationState(true);
          setTimeout(() => props.closeSideNav(),250);
          console.log('NavLink clicked');
        }}
        exact to={props.toPath}
      >
        {props.title.toUpperCase()}
      </NavLink>
    </li>
  );
}

NavLinkContainer.propTypes = {
  animationState: PropTypes.func.isRequired,
  closeSideNav: PropTypes.func.isRequired,
  isAnimating: PropTypes.bool,
  currentPath: PropTypes.string,
  toPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  changeAnimationTo: PropTypes.func.isRequired
}

export default NavLinkContainer;