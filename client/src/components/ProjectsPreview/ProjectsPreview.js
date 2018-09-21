import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import queryString from 'query-string';

import tagValidator from '../../util/tagValidator';
import intoN from '../../util/intoN';

import ProjectTile from './ProjectTile';

const FullPageMain = styled.main`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-wrap: wrap;
`;

class ProjectsPreview extends Component {
  render() {
    const { projects } = this.props;
    return (
      <FullPageMain>
        {projects.map(({ _id, title, description }) => (
          <ProjectTile
            key={_id}
            title={title}
            description={description}
          />
        ))}
      </FullPageMain>
    );
  };
};

ProjectsPreview.propTypes = {
  projects: PropTypes.array.isRequired
};

function mapStateToProps({ projects }, { location }) {
  console.log('Projects mapStateToProps');
  console.log('projects: ', projects);
  let { tag, page } = queryString.parse(location.search);
  console.log(`tag: ${tag}, page: ${page}`);
  const acceptedTags = ['front-end', 'back-end'];

  if (tag && tagValidator(acceptedTags, tag)) {
    projects = projects.filter(({ tags }) => {
      let projectMatches = false;
      tags.forEach((projectTag) => {
        if (projectTag === tag) {
          projectMatches = true;
        }
      });
      return projectMatches;
    });
  }

  const projectsInGroupsOfFour = intoN(projects, 4);

  if (!page) page = 1;
  projects = projectsInGroupsOfFour[page - 1];

  return {
    projects: projects
  }
}

export default connect(mapStateToProps)(ProjectsPreview);