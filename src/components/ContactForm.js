import React from 'react';
import styled from 'styled-components';

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: .50rem 0;
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

export default () => (
  <ContactForm>
    <label htmlFor="name">Name
    </label>
    <input id="name" type="text" /> 
    <label htmlFor="email">Email</label>
    <input id="email" type="email" />
    <label htmlFor="message">Message</label>
    <textarea id="message" name="message"/>
  </ContactForm>
);