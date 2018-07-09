import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Column extends Component {
  render() {
    return (
      <div className="column">
        <figure className="column__image">
          <img className="skill-icon" rel="noopener noreferrer" src={require(`../images/icons/${this.props.title.toLowerCase()}.svg`)} alt=""/>
        </figure>
        <h3 className="column__skill-name">{this.props.title}</h3>
        <p className="column__skill-description">{this.props.skillDescription}</p>
        <p className="column__skill-title">{this.props.listTitle}</p>
        { typeof this.props.noteworthyLink === "object" ? 
          <a 
            className="column__skill-link" 
            href={this.props.noteworthyLink.href} 
            target="_blank" 
            rel="noopener noreferrer">
              {this.props.noteworthyLink.text}<span> &gt;</span>
            </a> 
          : null
        }
        { typeof this.props.noteworthyItem === "object" ? 
          <ul>
            {this.props.noteworthyItem.map( skill => (
              <li key={skill} >{skill}</li>
            ))}
          </ul> : <p>{this.props.noteworthyItem}</p>
        }
      </div>
    )
  }
}

Column.propTypes = {
  title: PropTypes.string.isRequired,
  skillDescription: PropTypes.string.isRequired,
  listTitle: PropTypes.string.isRequired,
  noteworthyLink: PropTypes.object,
  noteworthyItem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired
}

export default Column;