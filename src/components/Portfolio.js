import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProjectSquare from './ProjectSquare';

class Portfolio extends Component {

  componentDidMount = () => {
    this.props.setNextCurrentPage(this.props.location.pathname);
    this.props.animateFromTo(this.props.currentPage, this.props.location.pathname);
  }

  componentWillUnmount = () => {
    this.props.animationState(false);
  }

  render() {
    return (
      <section className='projects'>
        {this.props.projects.map(output => (
          <ProjectSquare 
            project={output.title}
            description={output.description}
            key={output.title}
          />
        ))}
      </section>
    )
  }
}

Portfolio.propTypes = {
  animateFromTo: PropTypes.func.isRequired,
  currentPage: PropTypes.string,
  setNextCurrentPage: PropTypes.func.isRequired,
  animationState: PropTypes.func.isRequired,
  projects: PropTypes.array.isRequired,
}

export default Portfolio;