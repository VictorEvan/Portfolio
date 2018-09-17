import React from 'react';
import styled from 'styled-components';

import { HalfSection } from './styled';

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  input {
    margin-bottom: .25rem;
  }
  
  input,
  textarea {
    padding: 4px 2.5px;
    background-color: transparent;
    border: 0;
    outline: 0;
    border-bottom: 2px solid silver;
    color: white;
  }
`;

const ContactForm = () => (
  <Form>
    <label htmlFor="name">Name
    </label>
    <input id="name" type="text" /> 
    <label htmlFor="email">Email</label>
    <input id="email" type="email" />
    <label htmlFor="message">Message</label>
    <textarea id="message" name="message"/>
    <input type="submit" value="submit" />
  </Form>
);

const FormHalf = () => (
  <HalfSection type="form">
    <HalfSection.Title>Contact Info</HalfSection.Title>
    <HalfSection.Description>Let's Talk</HalfSection.Description>
    <ContactForm />
  </HalfSection>
);

export default FormHalf;