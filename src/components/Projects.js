import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';

import projects from '../data/projects';

import tagValidator from '../util/tagValidator';
import intoN from '../util/intoN';

import ProjectSquare from './ProjectSquare';

const ProjectTileContainer = styled.li`
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProjectTile = ({ content }) => (
  <ProjectTileContainer>
    {content}
  </ProjectTileContainer>
);

const ProjectTilesContainer = styled.ul`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

class ProjectTiles extends Component {
  state = {
    currentProject: null
  }

  handleCurrentProject = project => this.setState({currentProject: project});

  render() {
    const { projects } = this.props;
    return (
      <ProjectTilesContainer>
        {projects.map((project) => (
          <ProjectTile
            key={project.title}
            content={JSON.stringify(project.title)}
          />
        ))}
      </ProjectTilesContainer>
    );
  }
};

const FullPageMain = styled.main`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

class Projects extends Component {
  state = {
    projects: null,
    tag: null
  }

  componentDidMount = () => {
    document.body.classList.add('stop-pull-refresh');
    document.body.style.overflow = "hidden";

    const { tag } = queryString.parse(this.props.location.search);
    const acceptedTags = ['front-end', 'back-end'];    
    const { projects } = this.props;

    if (tag && tagValidator(acceptedTags, tag)) {
      this.setState({tag: tag});
      this.filterProjectsByTag(projects, tag);
    } else {
      this.setState({tag: 'all'});
      this.setProjects(projects);
    }
  }

  componentDidUpdate() {
    const { tag: prevTag } = this.state;
    const { tag: newTag } = queryString.parse(this.props.location.search);

    if (newTag && prevTag !== newTag) {
      this.setState(() => ({tag: newTag}));
      this.filterProjectsByTag(projects, newTag);
    } else if (!newTag && prevTag !== 'all') {
      this.setState(() => ({tag: 'all'}));
      this.setProjects(projects);
    }
  }

  setProjects = (projects) => this.setState(() => ({ projects: intoN(projects, 4) }));

  filterProjectsByTag = (projects, userTag) => {
    const filteredProjects = projects
      .filter(({ tags }) => {
        let projectMatches = false;
        tags.forEach((tag) => {
          if (tag === userTag) {
            projectMatches = true;
          }
        });
        return projectMatches;
      });
    this.setProjects(filteredProjects);
  };

  render() {
    const { projects: newProjects } = this.state;
    let { page } = queryString.parse(this.props.location.search);

    if (!page) page = 1;

    return (
      <FullPageMain className="projects">
        
        {newProjects 
          ? <ProjectTiles projects={newProjects[page - 1]} />
          : null}
      </FullPageMain>
    )
  }
}

Projects.propTypes = {
  projects: PropTypes.array.isRequired,
  mostRecentProject: PropTypes.func.isRequired
}

Projects.defaultProps = {
  projects: projects
}

export default Projects;