import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProjectSquare from './ProjectSquare';

class Portfolio extends Component {

  componentDidMount = () => {
    console.log('Portfolio has mounted');
  }

  componentWillUnmount = () => {
    console.log('Portfolio will unmount');
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
  animationState: PropTypes.func.isRequired,
  projects: PropTypes.array.isRequired,
}

export default Portfolio;