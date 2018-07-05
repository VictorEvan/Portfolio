import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProjectSquare from './ProjectSquare';

class Portfolio extends Component {
  state = {
    currentProject: ''
  }

  handleCurrentProject = project => {
    this.setState({currentProject: project});
  }

  render() {
    return (
      <section className='projects'>
        {this.props.projects.map(output => (
          <ProjectSquare 
            project={output.title}
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

Portfolio.propTypes = {
  projects: PropTypes.array.isRequired
}

export default Portfolio;