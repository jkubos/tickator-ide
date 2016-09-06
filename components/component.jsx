import React from 'react';

import {Pin} from "./pin"

export class Component extends React.Component {
  render() {

    const pins = [];

    const myGeometry = this.props.geometry[this.props.data.id];

    (this.props.data.pins || []).forEach(pin=>{
      pins.push(<Pin
          data={pin}
          geometry={this.props.geometry}
          key={pin.id}
        />)
    })

    return <g>
      <rect
        x={myGeometry.bbox.x}
        y={myGeometry.bbox.y}
        width={myGeometry.bbox.width}
        height={myGeometry.bbox.height}
        rx="5"
        ry="5"
        style={{fill: '#444', strokeWidth: 2, stroke: 'black'}}>
      </rect>

      <text
        textAnchor="middle"
        alignmentBaseline="middle"
        fontFamily="Helvetica, Verdana"
        fontSize="14"
        fontWeight="bold"
        x={myGeometry.bbox.x+myGeometry.bbox.width/2}
        y={myGeometry.bbox.y+myGeometry.bbox.height/3}
        fill="white">
          {this.props.data.label}
      </text>

      {pins}
    </g>
  }
}

Component.propTypes = {
};

Component.defaultProps = {
};

Component.contextTypes = {
};
