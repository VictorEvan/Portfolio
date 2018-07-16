import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProjectSquare from './ProjectSquare';

class Portfolio extends Component {
  componentDidMount = () => {
    document.body.classList.add('stop-pull-refresh');
  }
  componentWillUnmount = () => {
    document.body.classList.remove('stop-pull-refresh');
  }
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

Portfolio.propTypes = {
  projects: PropTypes.array.isRequired,
  mostRecentProject: PropTypes.func.isRequired
}

export default Portfolio;