import React, { Component } from 'react';
import {render} from 'react-dom';
import solarSystem from '../data/solar_system.js';

class Solar extends Component {
  render() {
  	// var bla = solarSystem.map((item) => {
  	// 	console.log(item)
   //  		return (<li>{item.diameter}</li>)
   //  	})
    return(
    	<div></div>
    );
  }
}

render(<Solar />, document.getElementById('root'));
