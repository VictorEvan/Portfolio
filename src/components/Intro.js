import React, { Component } from 'react';

class Intro extends Component {

  state = {
    output: '',
  }

  currentTalent = 0;
  currentLetter = 0;

  componentDidMount = () => {
    setTimeout(()=>this.typeWriter('type'),500);
  }

  typeWriter = (action) => {
    if (action === 'type') {
      let i = this.currentLetter;
      let currentWord = this.props.talents[this.currentTalent];
      if (i < currentWord.length) {
        this.setState({output: this.state.output + currentWord.charAt(i)});
        this.currentLetter++;
        setTimeout( () => this.typeWriter('type'), this.props.typingSpeed);
      } else {
        setTimeout( () => this.typeWriter('delete') , 1500);
      }
    } else if (action === 'delete') {
      if (this.state.output !== '') {
        let newString = this.state.output.slice(0, this.state.output.length - 1);
        this.setState({output: newString});
        setTimeout( () => this.typeWriter('delete'), this.props.typingSpeed);
      } else {
        this.currentTalent++;
        this.currentLetter = 0;
        if (this.currentTalent === this.props.talents.length) {
          this.currentTalent = 0;
        }
        setTimeout( () => this.typeWriter('type'), 250);
      }
    }
  }

  render() {
    return (
      <section className="intro">
        <h1 className="title">Victor Evangelista</h1>
        <p className="description">A Front End Engineer skilled with</p>
        <p className="talents">{this.state.output}.</p>
        <button className="btn--portfolio">Browse Portfolio</button>
      </section>
    );
  }
};

Intro.defaultProps = {
  talents: ['React','Sass', 'Vanilla JS', 'ES6','Redux','OOJS & Functional JS', 'responsive design'],
  typingSpeed: 100
}

export default Intro;