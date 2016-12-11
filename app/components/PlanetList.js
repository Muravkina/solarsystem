import React, { Component } from 'react';
import {render, findDOMNode} from 'react-dom';

import solarSystem from '../../data/solar_system.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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

export default PlanetsList;

