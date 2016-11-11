import React, { Component } from 'react';
import {render, findDOMNode} from 'react-dom';
import solarSystem from '../data/solar_system.js';
import scrollTo from 'scroll-into-view';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
    var sunLeft = this.getLeftCoords(sun);
    var windowCenter = this.getBrowserCenter();

    var centerX = (sun.offsetWidth  / 2 + sunLeft) - windowCenter;
    console.log(centerX)
    return centerX;
  }

  getLeftCoords(elem) {
  // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var left = box.left + scrollLeft - clientLeft;

    return Math.round(left);
  }

  calculateCurrentDistance(measurement) {
    var startingPoint = this.state.startingPoint;
    var currentDistance = (window.pageXOffset - startingPoint) * 200

    switch(measurement) {
      case 'mi':
        currentDistance;
        break;
      case 'km':
        currentDistance = currentDistance * 1.6;
        break;
      case 'light minutes':
        currentDistance = (currentDistance / 11176943.8231).toFixed(2);
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

    //calculate travel time from current point to athe panet
    var travelTime = Math.abs(targetPlanet.distanceFromSun / 200 - window.pageXOffset) / 300;

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
    var travelTime  =  this.calculateTimeTravel(planet)
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
          { this.state.distanceTraveled > 0 ? <DistanceWidget currentMeasurement={this.state.currentMeasurement} convertDistance={this.convertDistance.bind(this)}  distanceTraveled={this.state.distanceTraveled}/> : null }
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
        <img src="images/arrow.png" alt="arrow"/>
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
  constructor(){
    super();
    this.state = {
        open: false
    }
  }

  handleDropDown() {
    this.setState({
      open: !this.state.open
    })
  }

  select(measurement) {
    this.handleDropDown();
    this.props.convertDistance(measurement);
  }

  format(num){
    var n = num.toString(), p = n.indexOf('.');
    return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function($0, i){
        return p<0 || i<p ? ($0+',') : $0;
    });
  }

  render() {
    var list = ["mi", "km", "light minutes", "pixels"]
    var measurements = list.map((measurement) => {
              return <li onClick={this.select.bind(this, measurement)}> <p>{measurement}</p> </li>
            })
    return (
      <div className="distance_widget">
        <div>
       <span>{this.format(this.props.distanceTraveled)}</span>
       </div>
        <div>
        {
          this.state.open

          ?

          <ul className="number">{measurements}</ul>

          :

          <p onClick={this.handleDropDown.bind(this)} className="measurement">{this.props.currentMeasurement}</p>

        }
        </div>
      </div>
    )
  }

}




class Image extends Component {

  render() {
    //200 - arbitrary coeffcient to scale the width of the planets;
    var divStyle = {
      width: this.props.planet.diameter / 200,
      height: this.props.planet.diameter / 200,
      backgroundImage: `url(images/${this.props.planet.name}.png)`
    }
    return (
      <div className={`${this.props.planet.name} wrap`} style={divStyle}></div>
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
       <ReactCSSTransitionGroup 
                                  transitionName="thing" 
                                  transitionAppear={true} 
                                  transitionAppearTimeout={400} 
                                  transitionLeave={true} 
                                  transitionLeaveTimeout={300}
                                  transitionEnter={false} >
          <div className='navbar'>
              <div className="wrap">
                {planets}
              </div>
          </div>

      </ReactCSSTransitionGroup>
    )
  }

}


render(<Solar />, document.getElementById('root'));
