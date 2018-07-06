import React from 'react';
import PropTypes from 'prop-types';

const Hamburger = props => (
  <button 
    className={!props.navIsHidden ? 'hamburger is-active' : 'hamburger'}
    onClick={()=> {props.toggleSideNav()}}
  >
    <span className="line"></span>
    <span className="line"></span>
    <span className="line"></span>
  </button>
)

Hamburger.propTypes = {
  toggleSideNav: PropTypes.func.isRequired,
  sideNavIsOpen: PropTypes.bool.isRequired
}

export default Hamburger;