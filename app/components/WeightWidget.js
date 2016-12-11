import React, { Component } from 'react';
import {render, findDOMNode} from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import scale from '../../public/images/scale.png';

class WeightWidget extends Component {

  constructor(){
    super();
    this.state = {
        showInstructions: false
    }
  }

  showInstructions() {
    this.setState({
      showInstructions: !this.state.showInstructions
    })
  }

  render() {
    return (
      <div className="weight_widget">
        <div className="weights"><img src={ scale } alt="scale" onClick={ this.showInstructions.bind(this) }/> </div>

        {this.state.showInstructions
            ?
          <ReactCSSTransitionGroup
                                  transitionName="thing"
                                  transitionAppear={true}
                                  transitionAppearTimeout={400}
                                  transitionLeave={true}
                                  transitionLeaveTimeout={300}
                                  transitionEnter={false} >
            <div className="instructions">
              <p>See how much you weigh on other worlds.</p>
              <input type="text" value={ this.props.weight } onChange={ this.props.changeWeight } />
            </div>
          </ReactCSSTransitionGroup>
            :
          null
        }

      </div>
    )
  }
}

export default WeightWidget;