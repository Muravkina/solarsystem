import React, { Component } from 'react';
import {render, findDOMNode} from 'react-dom';
import solarSystem from '../data/solar_system.js';
import scrollTo from 'scroll-into-view';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import styles from '../public/styles/styles.css';
import favicon from '../public/images/solar.ico';
import solar_icon from '../public/images/solar_icon.jpg';

import Planet from './components/Planet.js';
import DistanceWidget from './components/DistanceWidget.js';
import Info from './components/Info.js';
import PlanetsList from './components/PlanetList.js';
import WeightWidget from './components/WeightWidget.js'




class Solar extends Component {

  constructor(){
    super();
    this.state = {
        distanceTraveled: 0,
        currentMeasurement: "mi",
        startingPoint: 0,
        weight: 0
    }
  }

  findAllPlanetRefs() {
    //find all the planet DOM nodes
    var planetRefs = [];

    for (var ref in this.refs) {
      !ref.includes('info') ? planetRefs.push(this.refs[ref]) : null
    }

    return planetRefs;
  }

  scrollRight(e) {

    if( Math.abs(e.deltaX) ) {
        return
    } else {
        document.body.scrollLeft -= (e.deltaY * 10);
    }

    e.preventDefault();
  }

  componentDidMount() {
 
    //find all planet DOM nodes
    this.planetRefs = this.findAllPlanetRefs();
    window.addEventListener('mousewheel', this.scrollRight.bind(this));
    window.addEventListener('scroll', this.handleScroll.bind(this));
    this.setState({
      startingPoint: this.calculateStartingPoint()
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
    window.removeEventListener('mousewheel', this.scrollRight.bind(this));
  }

  calculateStartingPoint() {
    //calculate center of the 'Sun' element to determine starting point
    var sun = findDOMNode(this.refs['Sun']);
    var sunLeft = this.getLeftCoords(sun);
    var windowCenter = this.getBrowserCenter();

    var centerX = (sun.offsetWidth  / 2 + sunLeft) - windowCenter;

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


  handleScroll() {
    //change traveled distance in distance widget
    this.visiblePlanet = this.whatElementIsInViewport();

    this.setState({
      distanceTraveled: this.calculateCurrentDistance(this.state.currentMeasurement),
    })

  }

  whatElementIsInViewport() {
    //what planet is visible at the moment

    var planet = this.planetRefs.filter(function(planet){
      if (this.isElementInViewport(planet) === true) {
        return planet;
      }
    }, this)


    if(planet.length !== 0) {
      return planet[0].props.planet.name;
    }
  }

  getBrowserWidth(){
    if (self.innerWidth) {
      return self.innerWidth;
    }

    if (document.documentElement && document.documentElement.clientWidth) {
      return document.documentElement.clientWidth;
    }

    if (document.body) {
      return document.body.clientWidth;
    }
  }

  isElementInViewport(el) {
    //calculate if element is displayed in viewport
    var planetNode = findDOMNode(el)
    var rect = planetNode.getBoundingClientRect();
  
    if(el.props.planet.name === 'Sun') {
      return rect.right >= (this.getBrowserWidth() * 0.017) && rect.right <= 1340
    }
    // console.log(rect.left)
    return rect.left >=-1300 && rect.left <= 200
  }

  calculateTimeTravel(targetPlanet) {

    //calculate travel time from current point to athe panet
    var travelTime = Math.abs(targetPlanet.distanceFromSun / 200 - window.pageXOffset) / 400;

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

  changeWeight(e) {
    this.setState({
      weight: e.target.value
    })
  }


  render() {
    var planetList = [];


    var planets = solarSystem.map((planet , i) => {

      var divStyle = {
        //200 - arbitrary coeffcient to scale the width and distances;
        left: this.calculateDistanceBetweenPlanets(planet)
      }
      //add planet's name to the array
      planetList.push(planet.name);

      return (
        <div className={"planet_info_wrap " + planet.name } style={divStyle}>
          <Planet key={i} planet={planet} weight={this.state.weight}
                  ref={planet.name}  />
          <Info ref={planet.name + "_info"} visible={planet.name === this.visiblePlanet} planet={planet}/>
        </div>
      )

    })

    return(
          // show navigation and distance widget at start point
      <div>
          { this.state.distanceTraveled > 0 ? <PlanetsList    moveToPlanet={this.moveToPlanet.bind(this)}/> : null }
          { this.state.distanceTraveled > 0 ? <DistanceWidget currentMeasurement={this.state.currentMeasurement}
                                                              convertDistance={this.convertDistance.bind(this)}
                                                              distanceTraveled={this.state.distanceTraveled}/> : null }
          { this.state.distanceTraveled > 0 ? <WeightWidget   changeWeight={this.changeWeight.bind(this)}
                                                              weight={this.state.weight} /> : null }
          <div className='solar_system_wrap' onScroll={this.handleScroll.bind(this)} >{planets}</div>
      </div>
    );

  }

}

render(<Solar />, document.getElementById('root'));
