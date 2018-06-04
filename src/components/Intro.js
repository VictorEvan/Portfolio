import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

function findScrollDirectionOtherBrowsers(e){
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
    pageIsActive: null
  }

  currentTalent = 0;
  currentLetter = 0;

  componentDidMount = () => {
    window.addEventListener('wheel',this.changeOnScroll);
    setTimeout(()=>this.typeWriter('type'),500);
    this.setState({pageIsActive: true});
  }

  changeOnScroll = e => {
    if (findScrollDirectionOtherBrowsers(e)) {
      window.removeEventListener('wheel',this.changeOnScroll);
      this.props.history.push('/projects');
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener('wheel',this.changeOnScroll);
    this.setState({pageIsActive: false});
  }

  typeWriter = (action) => {
    if (this.state.pageIsActive) {
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
        <Link to='/projects' className="btn--portfolio">Browse Portfolio</Link>
      </section>
    );
  }
};

Intro.defaultProps = {
  talents: ['React','Sass', 'Vanilla JS', 'ES6','Redux','OOJS & Functional JS', 'responsive design'],
  typingSpeed: 100
}

export default withRouter(Intro);