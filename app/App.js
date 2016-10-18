import React, { Component } from 'react';
import {render, findDOMNode} from 'react-dom';
import solarSystem from '../data/solar_system.js';
import scrollTo from 'scroll-into-view';




class Solar extends Component {
  constructor(){
    super();
    this.state = {
        width: 0,
        marginLeft: 0
    }
  }


  calculateTimeTravel(targetPlanet) {
    //calculate travel time from one planet to another
    var currentPosition = (window.pageXOffset);
    var travelTime = Math.abs(targetPlanet.distanceFromSun / 200 - currentPosition) /100;

    // if time travel is too short
    travelTime = travelTime < 300 ? 300 : travelTime

    return travelTime;
  }

  moveToPlanet(planet) {
    var travelTime  = this.calculateTimeTravel(planet)
    var planetDOM = findDOMNode(this.refs[planet.name])
    scrollTo(planetDOM, {
      time: travelTime
    })
  }

  render() {
    var planetList = [];

  	var planets = solarSystem.map((planet , i) => {

      //add planet's name to the array
      planetList.push(planet.name);

    	return (
        <Planet key={i} planet={planet} marginLeft={planet.distanceFromSun} ref={planet.name} />
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
      //200 - arbitrary coeffcient to scale the width and distances;
      left: this.props.marginLeft / 200
    }
    return (

      <div className={`planet ${this.props.planet.name}`} style={divStyle}>

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
  render() {
    //200 - arbitrary coeffcient to scale the width of the planets;
    var divStyle = {
      width: this.props.planet.diameter / 200,
      backgroundImage: `url(images/${this.props.planet.name}.png)`
    }
    return (
      <div className={`${this.props.planet.name} wrap`} style={divStyle}>

      </div>
    );
  }
}

class PlanetsList extends Component {

  handleClick(target) {
    this.props.moveToPlanet(target)
  }

  render() {



    var planets = solarSystem.map((planet , i) => {
      return ( <a key={i}  id={planet.name} onClick={this.handleClick.bind(this, planet)}> {planet.name} </a>)
    })
    return (
      <div className='navbar'>

          {planets}

      </div>
    )
  }
}


render(<Solar />, document.getElementById('root'));