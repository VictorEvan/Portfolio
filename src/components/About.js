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
        </section>
      </main>
    )
  }
}

export default About;