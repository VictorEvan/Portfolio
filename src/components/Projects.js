import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProjectSquare from './ProjectSquare';

class Projects extends Component {
  componentDidMount = () => {
    document.body.classList.add('stop-pull-refresh');
    document.body.style.overflow = "hidden";
  }
  state = {
    currentProject: ''
  }

  handleCurrentProject = project => {
    this.setState({currentProject: project});
  }

  render() {
    const { projects } = this.props;

    return (
      <section className='projects'>
        {projects.map(output => (
          <ProjectSquare 
            project={output.title}
            mostRecentProject={this.props.mostRecentProject}
            setCurrentProject={this.handleCurrentProject}
            currentActiveProject={this.state.currentProject}
            description={output.description}
            key={output.title}
          />
        ))}
      </section>
    )
  }
}

Projects.propTypes = {
  projects: PropTypes.array.isRequired,
  mostRecentProject: PropTypes.func.isRequired
}

export default Projects;