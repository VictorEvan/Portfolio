import React from 'react';

import ProjectPicture from './ProjectPicture';

const Projects = props => (
  <section className='projects'>
    {props.projects.map(output => (
      <ProjectPicture 
        project={output}
        key={output}
      />
    ))}
  </section>
)

Projects.defaultProps = {
  projects: [
    'calculator',
    'random-quote-machine',
    'tic-tac-toe',
    'pomodoro-clock'
  ]
}

export default Projects;