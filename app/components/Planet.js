import React, { Component } from 'react';
import {render, findDOMNode} from 'react-dom';

import arrow from '../../public/images/arrow.png';

import Image from './Image.js'
import WeightOnPlanet from './WeightOnPlanet.js'

class Planet extends Component {

  render() {

    return (

      <div className={`planet ${this.props.planet.name}`}>

        { this.props.weight > 0 ? <WeightOnPlanet weight={this.props.weight} planet={this.props.planet} /> : null }

        <h1>{ this.props.planet.name }</h1>

        <img src={ arrow } alt="arrow"/>

        <Image planet={ this.props.planet } />

      </div>

    );
  }

}

export default Planet;