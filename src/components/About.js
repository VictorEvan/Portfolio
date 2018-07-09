import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <main className="about-contact">
        <section className="about-contact__about-half">
          <div className="contact-info">
            <h2 className="contact-info__title">About Me</h2>
            <h3 className="contact-info__description">Front End Engineer</h3>
            <p className="contact-info__paragraph">
              I'm Victor Evangelista, a Web Developer focused on Front End Engineering. I make cool things with the latest technologies the ever fast changing web has to offer. I love to create smart and dynamic user interfaces, develop rich web experiences, and think creatively to solve design problems. Available for hire.
            </p>
          </div>
        </section>
        <section className="about-contact__contact-half">
          <div className="contact-info">
            <h2 className="contact-info__title">Contact Info</h2>
            <h3 className="contact-info__description">Let's Talk</h3>
            <p className="contact-info__paragraph">Email: victorevangelista@protonmail.com</p>
            <p className="contact-info__paragraph">Phone: 725-696-1583</p>
            <ul className="contact-info__list">
              <li className="social-link-container">
                <a className="social-link" target="_blank" rel="noopener noreferrer" href="https://www.github.com/victorevan">
                  <img className="social-link__image--github" src={require('../images/social/github.png')} alt="GitHub"/>
                </a>
              </li>
              <li className="social-link-container">
                <a className="social-link" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/victorevan">
                  <img className="social-link__image--linkedin" src={require('../images/social/linkedin.png')} alt="Linkedin"/>
                </a>
              </li>
              <li className="social-link-container">
                <a className="social-link" target="_blank" rel="noopener noreferrer" href="https://www.codepen.io/victorevangelista">
                  <img className="social-link__image--codepen" src={require('../images/social/codepen.png')} alt=""/>
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>
    )
  }
}

export default About;