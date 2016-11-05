import React, { Component } from 'react';
import {render, findDOMNode} from 'react-dom';
import solarSystem from '../data/solar_system.js';
import scrollTo from 'scroll-into-view';


// describtion on move on move out
// satelites?



class Solar extends Component {
  constructor(){
    super();
    this.state = {
        distanceTraveled: 0,
        currentMeasurement: "mi",
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


  calculateCurrentDistance(measurement) {
    var startingPoint = this.calculateStartingPoint();
    var currentDistance = (window.pageXOffset - startingPoint) * 200

    switch(measurement) {
      case 'mi':
        currentDistance;
        break;
      case 'km':
        currentDistance = currentDistance * 1.6;
        break;
      case 'light minutes':
        currentDistance = currentDistance / 11176943.8231;
        break;
      case 'pixels':
        currentDistance = currentDistance / 200;
        break;
      default:
        currentDistance;
    }

    return currentDistance;
  }

  convertDistance(measurement){
    this.setState({
      currentMeasurement: measurement,
      distanceTraveled: this.calculateCurrentDistance(measurement)
    })
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
    //change traveled distance in distance widget
    this.setState({
      distanceTraveled: this.calculateCurrentDistance(this.state.currentMeasurement)
    })
  }

  calculateTimeTravel(targetPlanet) {
    //calculate travel time from one planet to another
    var currentPosition = (window.pageXOffset);
    var travelTime = Math.abs(targetPlanet.distanceFromSun / 200 - currentPosition) / 300;

    // if time travel is too short
    travelTime = travelTime < 300 ? 300 : travelTime;

    return Math.round(travelTime);
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
        <Planet key={i} planet={planet} marginLeft={this.calculateDistanceBetweenPlanets(planet)} ref={planet.name} />
        )
    	})
    return(
          // show navigation and distance widget at start point
      <div>
          { this.state.distanceTraveled > 0 ? <PlanetsList moveToPlanet={this.moveToPlanet.bind(this)}/> : null }
          { this.state.distanceTraveled > 0 ? <DistanceWidget currentMeasurement={this.state.currentMeasurement} convertDistance={this.convertDistance.bind(this)} distanceTraveled={this.state.distanceTraveled}/> : null }
          <div className='solar_system_wrap' onScroll={this.handleScroll.bind(this)}>{planets}</div>
      </div>
    );
  }
}


class Planet extends Component {
  constructor(){
    super();
    this.state = {
        showDescription: false
    }
  }

  showDescription() {
    this.setState({
      showDescription: !this.state.showDescription
    })
  }

  render() {

    var divStyle = {
      //200 - arbitrary coeffcient to scale the width and distances;
      left: this.props.marginLeft
    }

    return (

      <div className={`planet ${this.props.planet.name}`} style={divStyle}>

        <h1 onClick={this.showDescription.bind(this)}>{this.props.planet.name}</h1>
        { this.state.showDescription ? <Description planet={this.props.planet} /> : null }
        <Image planet={this.props.planet} />

      </div>

    );
  }
}


class Description extends Component {

  render() {
    return (
      <div className="description">
        <p>ama</p>
      </div>
    );
  }
}

class DistanceWidget extends Component {

  handleChange(e){
    this.props.convertDistance(e.target.value);
  }

  render() {

    return (
      <div className="distanceWidget">
        {this.props.distanceTraveled}
         <select value={this.props.currentMeasurement} onChange={this.handleChange.bind(this)} >
          <option value="mi">mi</option>
          <option value="km">km</option>
          <option value="light minutes">Light Minutes</option>
          <option value="pixels">Pixels</option>
        </select>
      </div>
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
