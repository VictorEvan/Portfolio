import React, { Component } from 'react';
import styled from 'styled-components';

import { HalfSection } from './styled';

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;

  label {
    display: flex;
    flex-direction: column;
  }

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

class ContactForm extends Component {
  state = {
    name: '',
    email: '',
    message: ''
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const result = await fetch('/api/contact', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(this.state)
    });
    console.dir(result);
  }

  handleChange = (value, type) => this.setState({[type]: value});

  render() {
    const { name, email, message } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} >
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => this.handleChange(e.target.value, 'name')} /> 
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => this.handleChange(e.target.value, 'email')} />
        </label>
        <label>
          Message:
          <textarea value={message} onChange={(e) => this.handleChange(e.target.value, 'message')} />
        </label>
        <input type="submit" value="Submit" />
      </Form>
    );
  }
};

const FormHalf = () => (
  <HalfSection type="form">
    <HalfSection.Title>Contact Info</HalfSection.Title>
    <HalfSection.Description>Let's Talk</HalfSection.Description>
    <ContactForm />
  </HalfSection>
);

export default FormHalf;