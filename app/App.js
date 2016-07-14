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
  	var planets = solarSystem.map((planet) => {
  		// var image = "images/" + planet.name.toLowerCase() + '.png'
    		return (
              // Planet props
              <Planet planet={planet} />
              )
    	})
    return(
    	<div className='solar_system_wrap'>{planets}</div>
    );
  }
}
class Planet extends Component {
  render() {
    console.log(this.props)
    return (
      <div></div>
    );
  }
}

// class Description extends Component {
//   initial state = info
//   //if state changes (once someone clicked on it - the state should change)
//   render() {
//     return (
//       <p>Info</p>
//       <div></div>
//     );
//   }
// }

// class Image extends Components{
//   //if moon - different position
//   render() {
//     return (
//       <img width>
//     );
//   }
// }
render(<Solar />, document.getElementById('root'));
