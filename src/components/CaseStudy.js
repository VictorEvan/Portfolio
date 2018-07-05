import React, { Component } from 'react';
import PropTypes from 'prop-types';

import titleCase from '../helper/titleCase.js';

class CaseStudy extends Component {
  render() {
    return (
      <main className={`case-study--${this.props.project.title}`}>
        <section className="title-section">
          <div className="hero-container">
            <h2>{titleCase(this.props.project.title, "title")}</h2>
            <h3>{this.props.project.description}</h3>
          </div>
        </section>
      </main>
    )
  }
}

CaseStudy.propTypes = {
  project: PropTypes.object.isRequired,
}

export default CaseStudy;