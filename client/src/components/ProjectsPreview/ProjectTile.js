import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ProjectTileContainer = styled.div`
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

ProjectTileContainer.InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectTile = ({ title, description }) => (
  <ProjectTileContainer>
    {/* TODO: implement picture for project*/}
    <ProjectTileContainer.InfoContainer>
      <h2>{title}</h2>
      <h3>{description}</h3>
      <Link to={`/case-studies/TODO`}>Case Study</Link>
    </ProjectTileContainer.InfoContainer>
  </ProjectTileContainer>
);

export default ProjectTile;