import React from 'react';
import PropTypes from 'prop-types';

const Hamburger = props => (
  <button 
    className={!props.ariaHidden ? 'hamburger is-active' : 'hamburger'}
    onClick={()=> {props.toggleSideNav()}}
  >
    <span className="line"></span>
    <span className="line"></span>
    <span className="line"></span>
  </button>
)

Hamburger.propTypes = {
  toggleSideNav: PropTypes.func.isRequired,
  ariaHidden: PropTypes.bool.isRequired
}

export default Hamburger;