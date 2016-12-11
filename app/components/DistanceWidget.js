import React, { Component } from 'react';
import {render, findDOMNode} from 'react-dom';

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

export default DistanceWidget;