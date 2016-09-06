import React from 'react';

export default class Wire extends React.Component {

  render() {
    return <g>
        <polyline
          points={this.props.geometry.points.map(a=>`${a.x},${a.y}`).join(" ")}
          stroke="white"
          strokeWidth="8"
          fill="none" />

        <polyline
          points={this.props.geometry.points.map(a=>`${a.x},${a.y}`).join(" ")}
          stroke="red"
          strokeWidth="2"
          fill="none" />
      </g>
  }
}

Wire.propTypes = {
};

Wire.defaultProps = {
};
