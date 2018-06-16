import React from 'react';
import PropTypes from 'prop-types';

import ProjectSquare from './ProjectSquare';

const Portfolio = props => (
  <section className='projects'>
    {props.projects.map(output => (
      <ProjectSquare 
        project={output.title}
        description={output.description}
        key={output.title}
      />
    ))}
  </section>
)

Portfolio.propTypes = {
  projects: PropTypes.array.isRequired
}

export default Portfolio;