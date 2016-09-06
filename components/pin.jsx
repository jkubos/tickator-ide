import React from 'react';

export class Pin extends React.Component {

  render() {

    const myGeometry = this.props.geometry[this.props.data.id];

    const fill = this.props.data.type=="out" ? "#555" : "white"

    return <g>
        <circle
          cx={myGeometry.head.x}
          cy={myGeometry.head.y}
          r={myGeometry.radius}
          stroke="black"
          strokeWidth="2"
          fill={fill} />

        <line
          x1={myGeometry.headTouch.x}
          y1={myGeometry.headTouch.y}
          x2={myGeometry.mount.x}
          y2={myGeometry.mount.y}
          stroke="black"
          strokeWidth="2" />

        <text
          textAnchor={myGeometry.textAlignHorizontal}
          alignmentBaseline={myGeometry.textAlignVertical}
          fontFamily="Helvetica, Verdana"
          fontSize="10"
          x={myGeometry.textX}
          y={myGeometry.textY}
          fill="white">
            {this.props.data.name}
        </text>
      </g>
  }
}

Pin.propTypes = {
};

Pin.defaultProps = {
};
