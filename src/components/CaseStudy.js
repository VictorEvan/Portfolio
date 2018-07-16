import React, { Component } from 'react';
import PropTypes from 'prop-types';

import titleCase from '../helper/titleCase.js';
import Column from './Column';

class CaseStudy extends Component {

  componentDidMount = () => {
    setTimeout(() => this.props.enableMouseUpIcon(true),2500);
  }

  componentWillUnmount = () => {
    this.props.enableMouseUpIcon(false);
  }

  render() {
    return (
      <main className={`case-study--${this.props.project.title}`}>
        <section className="hero-container">
          <div className="hero-container__header">
            <h1>{titleCase(this.props.project.title, "title")}</h1>
            <h2>A Case Study</h2>
            <div className="button-container">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://github.com/VictorEvan/${this.props.project.title}`}
                className="outline-button"
              >GitHub Repo
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://victorevan.github.io/${titleCase(this.props.project.title, "link")}`}
                className="outline-button"
              >View Website
              </a>
            </div>
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
  enableMouseUpIcon: PropTypes.func.isRequired
}

export default CaseStudy;