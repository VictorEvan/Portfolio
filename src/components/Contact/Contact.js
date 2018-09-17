import React, { Component } from 'react';
import styled from 'styled-components';

import AboutHalf from './Half/AboutHalf';
import FormHalf from './Half/FormHalf';

const ContactContainer = styled.main`
  z-index: 900;
`;

export default class Contact extends Component {
  componentDidMount = () => {
    document.body.classList.remove('stop-pull-refresh');
  }
  render() {
    return (
      <ContactContainer className="about-contact">
        <AboutHalf />
        <FormHalf />
      </ContactContainer>
    )
  }
};