import React, { Component } from 'react';
import PropTypes from 'prop-types';

import titleCase from '../helper/titleCase.js';
import Column from './Column';

class CaseStudy extends Component {
  render() {
    return (
      <main className={`case-study--${this.props.project.title}`}>
        <section className="hero-container">
          <div className="hero-container__header">
            <h1>{titleCase(this.props.project.title, "title")}</h1>
            <h2>{this.props.project.description}</h2>
          </div>
        </section>
        <section className="card-hero column-container">
          <Column 
            title="Programming"
            skillDescription={this.props.project.programmingDescription}
            listTitle="Notable Code:"
            noteworthyLink={this.props.project.programmingLink}
            noteworthyItem={this.props.project.programmingLinkDescription}
          />
          <Column 
            title="Design"
            skillDescription={this.props.project.designDescription}
            listTitle="Notable Code:"
            noteworthyLink={this.props.project.designLink}
            noteworthyItem={this.props.project.designLinkDescription}
          />
          <Column 
            title="Thoughts"
            skillDescription={this.props.project.thoughtsDescription}
            listTitle="Notable Techs Used:"
            noteworthyItem={this.props.project.notableSkillsUsed}
          />
        </section>
      </main>
    )
  }
}

CaseStudy.propTypes = {
  project: PropTypes.object.isRequired,
}

export default CaseStudy;