import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

class ProjectSquare extends Component {

  titleCase = (str, mode) => {
    let regex = /(^|\s|-)\S/g;
    if (mode === "link") {
      return str.toLowerCase().replace(regex, (L) => L.toUpperCase());
    } else if (mode === "title") {
      return str.toLowerCase().replace(regex, (L) => L.startsWith("-") ? ` ${L.charAt(1).toUpperCase()}` : L.toUpperCase());
    }

  }

  state = {
    projectIsActive: false
  }

  activeProjectHandler = (status) => this.setState({projectIsActive: status});

  render() {
    let url = this.props.match.url;
    return (
      <div 
        className={`projects__project--${this.props.project}`}
        onMouseEnter={() => this.activeProjectHandler(true)}
        onMouseLeave={() => this.activeProjectHandler(false)}
      >
        {this.state.projectIsActive ?
          <CSSTransition
            in={this.state.projectIsActive}
            classNames="fade"
            appear={true}
            timeout={2000}
          >
            <div className={`projects__project--overlay`}>
              <h2 className="project-title">{this.titleCase(this.props.project, "title")}</h2>
              <p className="project-description">{this.props.description}</p>
              <div className="button-container">
                <a 
                  target="_blank"
                  href={`https://github.com/VictorEvan/${this.props.project}`} 
                  className="btn--project"
                >Repo</a>
                <Link 
                  className="btn--project"
                  to={`${url}/${this.props.project}-details`}
                >Details</Link>
                <a 
                  target="_blank"
                  href={`https://victorevan.github.io/${this.titleCase(this.props.project, "link")}`} 
                  className="btn--project"
                >View</a>
              </div>
            </div>
          </CSSTransition> : null}
      </div>
    )
  }
};

ProjectSquare.propTypes = {
  project: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default withRouter(ProjectSquare);