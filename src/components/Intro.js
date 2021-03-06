import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CoolButton from './CoolButton';
import ScrollDownIcon from './../images/icons/ScrollDownIcon';
import MouseIcon from './../images/icons/MouseIcon';
import { Link } from 'react-router-dom';

class Intro extends Component {

  state = {
    output: '',
    isTyping: false,
  }

  pageIsActive = null;
  currentTalent = 0;
  currentLetter = 0;

  componentDidMount = () => {
    document.body.classList.remove('stop-pull-refresh');
    document.body.style.overflow = "hidden";
    setTimeout(()=>this.typeWriter('type'),500);
    this.pageIsActive = true;
  }

  componentWillUnmount = () => {
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
          setTimeout( () => this.typeWriter('delete'), this.props.typingSpeed - 20);
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
    const coolButtonClassName = this.props.isAnimating || this.props.location.pathname === '/projects' ? 'disable' : '';
    return (
      <section className="intro">
        <div className="intro--overlay"></div>
        <h1 className="title">Victor Evangelista</h1>
        <p className="description">A Full Stack Engineer skilled with</p>
        <p className="talents">{this.state.output}<span className={this.state.isTyping ? 'text-cursor' : 'text-cursor--active'}>|</span><span className="dot">.</span></p>
        <CoolButton 
          className={`cool-button ${coolButtonClassName}`}
          to={`/projects`} 
          text={'Browse Portfolio'}
        />
        <div className="bar--bottom">
          <Link
            aria-label="to projects"
            to="/projects"
          >
            <div className="carousel-scroll-btn">
              <div className="carousel-scroll-btn-icon-wrapper">
                <ScrollDownIcon />
              </div>
                <MouseIcon />
            </div>
          </Link>
        </div>
      </section>
    );
  }
};

Intro.defaultProps = {
  path: '/',
  talents: ['React/React-Redux' ,'Node.js/Express', 'NoSQL/MongoDB' , 'HTML/CSS3/Sass', 'Object Oriented & Functional JS', 'responsive design', 'Bootstrap/jQuery'],
  typingSpeed: 70
};

Intro.propTypes = {
  isAnimating: PropTypes.bool,
}

export default Intro;