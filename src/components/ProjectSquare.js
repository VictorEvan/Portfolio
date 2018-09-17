import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import titleCase from '../util/titleCase.js';

import CoolButton from './CoolButton';

class ProjectSquare extends Component {
  render() {
    const { match } = this.props;
    return (
      <div 
        className={`project projects__project--${this.props.project}`}
        onMouseEnter={() => {this.props.setCurrentProject(this.props.project)}}
        onTouchStart={() => {this.props.setCurrentProject(this.props.project)}}
      >
        <div className={`projects__project--overlay`}>
        </div>
        <div className='project-container'>
          <Link 
            className="project-link-cover" 
            to={`${match.url}/${this.props.project}`}
            onClick={()=>this.props.mostRecentProject(`${match.url}/${this.props.project}`)}
          ></Link>
          <h2 className="project-title">{titleCase(this.props.project, "title") === 'Random Quote Machine' ? 'Quote Machine' : titleCase(this.props.project, "title")}</h2>
          <h3 className="project-description">{this.props.description}</h3>
          <div className="link-container">
            <CoolButton
              className="project-link cool-button"
              to={`${match.url}/${this.props.project}`}
              onClick={()=>this.props.mostRecentProject(`${match.url}/${this.props.project}`)}
              text="Case Study"
            >
            </CoolButton>
          </div>
        </div>
      </div>
    )
  }
};

ProjectSquare.propTypes = {
  project: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  setCurrentProject: PropTypes.func.isRequired,
  currentActiveProject: PropTypes.string.isRequired,
  mostRecentProject: PropTypes.func.isRequired
}

export default withRouter(ProjectSquare);