import React, { Component } from 'react';


const Image = function ImageComponent(props) {

    //200 - arbitrary coeffcient to scale the width of the planets;
    var divStyle = {
      width: props.planet.diameter / 200,
      height: props.planet.diameter / 200
    }
    
    return (
      <div className={`${props.planet.name} wrap`} style={divStyle}></div>
    )

}

export default Image;