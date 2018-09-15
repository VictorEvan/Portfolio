import React, { Component } from 'react';
import styled from 'styled-components'

import ContactForm from './ContactForm';

import GitHub from '../images/social/GitHub';
import Codepen from '../images/social/Codepen';
import Linkedin from '../images/social/Linkedin';

const ContactContainer = styled.main`
  z-index: 900;
  @media (min-height: 600px) {
    display: flex;
    flex-direction: column;
    section {
      flex: 1;
    }
  }
`;

class Contact extends Component {

  componentDidMount = () => {
    document.body.classList.remove('stop-pull-refresh');
  }

  render() {
    return (
      <ContactContainer className="about-contact">
        <section className="about-contact__about-half">
          <div className="contact-info">
            <h2 className="contact-info__title">About Me</h2>
            <h3 className="contact-info__description">Full Stack Engineer</h3>
            <p className="contact-info__paragraph">
              I'm Victor Evangelista, a Web Developer focused on MERN development. I make cool things with the latest technologies the ever fast changing web has to offer. I love to create smart and dynamic user interfaces, develop rich web experiences, and think creatively to solve design problems. Available for hire.
            </p>
          </div>
        </section>
        <section className="about-contact__contact-half">
          <div className="contact-info">
            <h2 className="contact-info__title">Contact Info</h2>
            <h3 className="contact-info__description">Let's Talk</h3>
            <ContactForm />
            <ul className="contact-info__list">
              <li className="social-link-container">
                <a className="social-link" target="_blank" rel="noopener noreferrer" href="https://www.github.com/victorevan">
                  <GitHub/>
                </a>
              </li>
              <li className="social-link-container">
                <a className="social-link" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/victorevan">
                  <Linkedin/>
                </a>
              </li>
              <li className="social-link-container">
                <a className="social-link" target="_blank" rel="noopener noreferrer" href="https://www.codepen.io/victorevangelista">
                  <Codepen/>
                </a>
              </li>
            </ul>
          </div>
        </section>
      </ContactContainer>
    )
  }
}

export default Contact;