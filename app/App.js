import React, { Component } from 'react';
import {render} from 'react-dom';
import solarSystem from '../data/solar_system.js';

class Solar extends Component {
  constructor(){
    super();
    this.state = {
        width: 0,
        marginLeft:0
    }
  }
  render() {
    var prevDistanceFromSun = 0;

  	var planets = solarSystem.map((planet , i) => {

      //calculate the distance between planets
    	var marginLeft = (planet.distanceFromSun - prevDistanceFromSun) ;
      prevDistanceFromSun = planet.distanceFromSun;

    	return (
        // Planet props
        <Planet key={i} planet={planet} marginLeft={marginLeft}/>
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
      //80.65 - arbitrary coeffcient to scale the width and distances;
      marginLeft: this.props.marginLeft / 80.65,
    }
    return (
      <div className={`planet ${this.props.planet.name}`} style={divStyle} >
        <h1>{this.props.planet.name}</h1>
        <Image planet={this.props.planet} />
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
    //80.65 - arbitrary coeffcient to scale the width of the planets;
    var divStyle = {
      width: this.props.planet.diameterRatio * 80.65,
      backgroundImage: `url(images/${this.props.planet.name}.png)`
    }
    return (
      <div className={`${this.props.planet.name} wrap`} style={divStyle}>
        
      </div>
    );
  }
}


render(<Solar />, document.getElementById('root'));
