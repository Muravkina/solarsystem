import React, { Component } from 'react';
import {render, findDOMNode} from 'react-dom';

const WeightOnPlanet = function WeightOnPlanetComponent(props) {

 function scaleWeight(weight, planet) {
    return (weight * planet.gravitationalFactor).toFixed(1);
  }

  var planet = props.planet;

	return (
	  <div className="description">
	    <p>{scaleWeight(props.weight, props.planet)}</p>
	  </div>
	);
  

}

export default WeightOnPlanet;