import React, { Component } from 'react';
import {render} from 'react-dom';
import solarSystem from '../data/solar_system.js';

class Solar extends Component {
  constructor(){
    super();
    this.state = {
        marginLeft:0
    }
  }
  render() {
  	var planets = solarSystem.map((planet , i) => {
  		// var image = "images/" + planet.name.toLowerCase() + '.png'
    		return (
              // Planet props
              <Planet key={i} planet={planet} distanceToSun={this.state.marginLeft}/>
              )
    	})
    return(
    	<div className='solar_system_wrap'>{planets}</div>
    );
  }
}
class Planet extends Component {
  render() {
    var divStyle = {
      left: this.props.distanceToSun
    }
    return (
      <div className='planet' className={this.props.planet.name} style={divStyle} >
        <h1>{this.props.planet.name}</h1>
        <Image name={this.props.planet} />
        <Description planet={this.props.planet} />
      </div>
    );
  }
}

class Description extends Component {
  // initial state = info
  //if state changes (once someone clicked on it - the state should change)
  render() {
    return (
      <div></div>
    );
  }
}

class Image extends Component {
  //if moon - different position
  render() {
    return (
      <div></div>
    );
  }
}
render(<Solar />, document.getElementById('root'));
