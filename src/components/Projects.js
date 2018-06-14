import React from 'react';
import PropTypes from 'prop-types';

import ProjectSquare from './ProjectSquare';

const Projects = props => (
  <section className='projects'>
    {props.projects.map(output => (
      <ProjectSquare 
        project={output.title}
        description={output.description}
        codeLink={output.codeLink}
        key={output.title}
      />
    ))}
  </section>
)

Projects.propTypes = {
  projects: PropTypes.array.isRequired
}

export default Projects;