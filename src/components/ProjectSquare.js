import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProjectSquare extends Component {

  titleCase = str => {
    return str.toLowerCase().replace(/(^|\s|-)\S/g, (L) => L.startsWith("-") ? ` ${L.charAt(1).toUpperCase()}` : L.toUpperCase());
  }

  state = {
    projectIsActive: false
  }

  activeProjectHandler = (status) => this.setState({projectIsActive: status});

  render() {
    return (
      <div 
        className={`projects__project--${this.props.project}`}
        onMouseEnter={() => this.activeProjectHandler(true)}
        onMouseLeave={() => this.activeProjectHandler(false)}
      >
        {
          this.state.projectIsActive ?
            <div className={`projects__project--overlay`}>
              <h2>{this.titleCase(this.props.project)}</h2>
              <p>{this.props.description}</p>
              <div className="button-container">
                <a href={this.props.codeLink} className="btn--project">Code</a>
                <a className="btn--project">Open</a>
              </div>
            </div>
          : null
        }
      </div>
    )
  }
};

ProjectSquare.propTypes = {
  project: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  codeLink: PropTypes.string.isRequired
}

export default ProjectSquare;