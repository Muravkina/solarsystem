import React, { Component } from 'react';
import {render, findDOMNode} from 'react-dom';
import solarSystem from '../data/solar_system.js';
import scrollTo from 'scroll-into-view';

// add distance widget
// describtion on move on move out
// satelites?



class Solar extends Component {
  constructor(){
    super();
    this.state = {
        width: 0,
        marginLeft: 0,
        distanceTraveled: 0,
        startingPoint: 0
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    this.setState({
      startingPoint: this.calculateStartingPoint()
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  calculateStartingPoint() {
    //calculate center of the 'Sun' element to determine starting point
    var sun = findDOMNode(this.refs['Sun']);
    var windowCenter = this.getBrowserCenter();
    var centerX = (sun.offsetWidth  / 2 + sun.offsetLeft) - windowCenter;
    
    return centerX;
  }

  getBrowserCenter() {
    //get current window center
    if (self.innerWidth) {
      return self.innerWidth / 2;
    }

    if (document.documentElement && document.documentElement.clientWidth) {
      return document.documentElement.clientWidth / 2;
    }

    if (document.body) {
      return document.body.clientWidth / 2;
    }
  }

  handleScroll(){
    var startingPoint = this.calculateStartingPoint();
    var currentMilage = (window.pageXOffset - startingPoint) * 200;

    this.setState({
      distanceTraveled: currentMilage
    })
  }


  calculateTimeTravel(targetPlanet) {
    //calculate travel time from one planet to another
    var currentPosition = (window.pageXOffset);
    var travelTime = Math.abs(targetPlanet.distanceFromSun / 200 - currentPosition) /100;

    // if time travel is too short
    travelTime = travelTime < 300 ? 300 : travelTime

    return travelTime;
  }

  calculateDistanceBetweenPlanets(planet) {
    var marginLeft = planet.distanceFromSun / 200;
    marginLeft = planet.name === "Sun" ? marginLeft : marginLeft - this.state.startingPoint;

    return marginLeft;
  }

  moveToPlanet(planet) {
    var travelTime  = this.calculateTimeTravel(planet)
    var planetDOM = findDOMNode(this.refs[planet.name])

    scrollTo(planetDOM, {
      time: travelTime,
      planet: planet.name
    })
  }

  render() {
    var planetList = [];

  	var planets = solarSystem.map((planet , i) => {

      //add planet's name to the array
      planetList.push(planet.name);

    	return (
        <Planet key={i} planet={planet} marginLeft={this.calculateDistanceBetweenPlanets(planet)} startingPoint={this.state.startingPoint} ref={planet.name} />
        )
    	})
    return(
      <div>
          { this.state.distanceTraveled > 0 ? <PlanetsList moveToPlanet={this.moveToPlanet.bind(this)}/> : null }
          { this.state.distanceTraveled > 0 ? <DistanceWidget distanceTraveled={this.state.distanceTraveled}/> : null }
          <div className='solar_system_wrap' onScroll={this.handleScroll}>{planets}</div>
      </div>
    );
  }
}


class Planet extends Component {
  
  render() {
    
    var divStyle = {
      //200 - arbitrary coeffcient to scale the width and distances;
      left: this.props.marginLeft
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

class DistanceWidget extends Component {
  render() {

    return (
      <div className="distanceWidget">{this.props.distanceTraveled}</div>
    )
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
