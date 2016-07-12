import React, { Component } from 'react';
import {render} from 'react-dom';
import solarSystem from '../data/solar_system.js';

class Solar extends Component {
  constructor(){
    super();
    this.state = {
        width: 7,
        marginLeft:8
    }
  }
  render() {
  	var planets = solarSystem.map((planet) => {
  		var image = "images/" + planet.image
    		return (<div className='planet'>
                  <h1>{planet.name}</h1>
                  <img src= {image}/>
                  <div className="description">
                    <ul>
                      <li>{planet.diameter}</li>
                      <li>{planet.lengthOfDay}</li>
                      <li>{planet.distanceFromEarth} {planet.shuttleTraveled}</li>
                    </ul>
                  </div>
                </div>
              )
    	})
    return(
    	<div className='solar_system_wrap'>{planets}</div>
    );
  }
}
class Description extends Component {

}

class Image extends Components {

}
render(<Solar />, document.getElementById('root'));
