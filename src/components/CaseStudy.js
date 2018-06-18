import React from 'react';
import PropTypes from 'prop-types';

const CaseStudy = props => {
  return (
    <section className={props.project.title}>
    </section>
  )
}

CaseStudy.propTypes = {
  project: PropTypes.object.isRequired
}

export default CaseStudy;