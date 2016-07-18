import React, { Component } from 'react';
import {render, findDOMNode} from 'react-dom';
import solarSystem from '../data/solar_system.js';

class Solar extends Component {
  constructor(){
    super();
    this.state = {
        width: 0,
        marginLeft: 0
    }
  }

  moveToPlanet(planet) {
    var planet = findDOMNode(this.refs[planet])
    planet.scrollIntoView({block: 'end', behavior: 'smooth'});
  }

  render() {
    var prevDistanceFromSun = 0;
    var planetList = [];

  	var planets = solarSystem.map((planet , i) => {

      //calculate the distance between planets
    	var marginLeft = (planet.distanceFromSun - prevDistanceFromSun) ;
      prevDistanceFromSun = planet.distanceFromSun;
      planetList.push(planet.name);

    	return (
        <Planet key={i} planet={planet} marginLeft={marginLeft} ref={planet.name}/>
        )
    	})
    return(
      <div>
          <PlanetsList moveToPlanet={this.moveToPlanet.bind(this)}/>
    	    <div className='solar_system_wrap'>{planets}</div>
      </div>
    );
  }
}


class Planet extends Component {
  render() {
    var divStyle = {
      //110 - arbitrary coeffcient to scale the width and distances;
      marginLeft: this.props.marginLeft / 110
    }
    return (
      <div className={`planet ${this.props.planet.name}`} style={divStyle} ref="bla">
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
    //110 - arbitrary coeffcient to scale the width of the planets;
    var divStyle = {
      width: this.props.planet.diameter / 110,
      backgroundImage: `url(images/${this.props.planet.name}.png)`
    }
    return (
      <div className={`${this.props.planet.name} wrap`} style={divStyle}>

      </div>
    );
  }
}

class PlanetsList extends Component {

  handleClick(event) {
    this.props.moveToPlanet(event.target.textContent.trim())
  }

  render() {
    var planets = solarSystem.map((planet , i) => {
      return ( <li key={i} onClick={this.handleClick.bind(this)} > {planet.name} </li>)
    })
    return (
      <div className='navbar'>
        <ul>
          {planets}
        </ul>
      </div>
    )
  }
}


render(<Solar />, document.getElementById('root'));
