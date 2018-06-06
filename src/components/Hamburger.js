import React from 'react';
import PropTypes from 'prop-types';

const Hamburger = props => (
  <button 
    className="hamburger"
    onClick={()=> {props.toggleSideNav()}}
  >
    <div className="line--top"></div>
    <div className="line--middle"></div>
    <div className="line--bottom"></div>
  </button>
)

Hamburger.propTypes = {
  toggleSideNav: PropTypes.func.isRequired
}

export default Hamburger;