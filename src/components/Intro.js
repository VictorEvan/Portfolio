import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function detectScrollDown(e){
  var delta;
  if (e.wheelDelta){
      delta = e.wheelDelta;
    }else{
      delta = -1 * e.deltaY;
    }
  if (delta < 0) {
    return true;
  }
}

class Intro extends Component {

  state = {
    output: '',
    isTyping: false,
  }

  pageIsActive = null;
  currentTalent = 0;
  currentLetter = 0;

  componentDidMount = () => {
    window.addEventListener('wheel',this.changeOnScroll);
    setTimeout(()=>this.typeWriter('type'),500);
    this.pageIsActive = true;
  }

  changeOnScroll = e => {
    if (detectScrollDown(e)) {
      window.removeEventListener('wheel',this.changeOnScroll);
      this.props.animationState(true);
      this.props.history.push('/portfolio');
    }
  }

  componentWillUnmount = () => {
    this.props.animationState(false);
    window.removeEventListener('wheel',this.changeOnScroll);
    this.pageIsActive = false;
  }

  typeWriter = (action) => {
    if (this.pageIsActive) {
      if (action === 'type') {
        this.setState({isTyping: true});
        let i = this.currentLetter;
        let currentWord = this.props.talents[this.currentTalent];
        if (i < currentWord.length) {
          this.setState({output: this.state.output + currentWord.charAt(i)});
          this.currentLetter++;
          setTimeout( () => this.typeWriter('type'), this.props.typingSpeed);
        } else {
          this.setState({isTyping: false});
          setTimeout( () => this.typeWriter('delete') , 1500);
        }
      } else if (action === 'delete') {
        if (this.state.output !== '') {
          this.setState({isTyping: true});
          let newString = this.state.output.slice(0, this.state.output.length - 1);
          this.setState({output: newString});
          setTimeout( () => this.typeWriter('delete'), this.props.typingSpeed);
        } else {
          this.currentTalent++;
          this.currentLetter = 0;
          if (this.currentTalent === this.props.talents.length) {
            this.currentTalent = 0;
          }
          this.setState({isTyping: false});
          setTimeout( () => this.typeWriter('type'), 1000);
        }
      }
    }
  }

  render() {
    return (
      <section className="intro">
        <div className="intro--overlay"></div>
        <h1 className="title">Victor Evangelista</h1>
        <p className="description">A Front End Engineer skilled with</p>
        <p className="talents">{this.state.output}<span className={this.state.isTyping ? 'text-cursor' : 'text-cursor--active'}>|</span><span className="dot">.</span></p>
        <Link 
          to={`/portfolio`} 
          className={`btn--portfolio ${this.props.isAnimating || this.props.location.pathname === '/portfolio' ? 'disable' : ''}`}
        >Browse Portfolio</Link>
      </section>
    );
  }
};

Intro.defaultProps = {
  talents: ['React/React-Redux','HTML/CSS3/SCSS', 'JavaScript ES5/ES6','Object Oriented & Functional JS', 'responsive design', 'Bootstrap/jQuery'],
  typingSpeed: 100
};

Intro.propTypes = {
  isAnimating: PropTypes.bool,
  animationState: PropTypes.func.isRequired,
}

export default withRouter(Intro);