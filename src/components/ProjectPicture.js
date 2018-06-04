import React from 'react';
import PropTypes from 'prop-types';

const ProjectPicture = props => (
  <div className={`projects__project ${props.project}`}>
  </div>
);

ProjectPicture.propTypes = {
  project: PropTypes.string.isRequired
}

export default ProjectPicture;