import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

class CoolButton extends Component {
  render() {
    return (
      <Link 
        className={this.props.className}
        to={this.props.to} 
      >
        <span className="button-text">
          {this.props.text}
        </span>
        <div className="button-mask"></div>
      </Link>
    )
  }
}

CoolButton.propTypes = {
  className: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default CoolButton;