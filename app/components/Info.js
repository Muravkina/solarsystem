import React, { Component } from 'react';
import {render, findDOMNode} from 'react-dom';

class Info extends Component {
  render() {
    return(
      <div className={`info ${this.props.visible}`}>
        <p>{this.props.planet.notes}</p>
      </div>
    )
  }
}

export default Info;