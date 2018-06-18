import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProjectSquare from './ProjectSquare';

class Portfolio extends Component {

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
  projects: PropTypes.array.isRequired,
}

export default Portfolio;