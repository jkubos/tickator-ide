import React from 'react';
import Point from "~/src/util/geometry/point"

export default class BitArrayVisualization extends React.Component {

  render() {

    const rects = [];

    const cellSize = 2

    for (let x=0;x<this.props.array.getWidth();++x) {
      for (let y=0;y<this.props.array.getHeight();++y) {
        if (this.props.array.get(new Point(x, y))) {
          rects.push(<rect
            x={600+x*cellSize}
            y={20+y*cellSize}
            width={cellSize}
            height={cellSize}
            style={{fill: "black", stroke: "#ddd"}}
            key={`${x}_${y}`}
            >
          </rect>)
        }
      }
    }

    return <g>
        <rect
          x={600}
          y={20}
          width={cellSize*this.props.array.getWidth()}
          height={cellSize*this.props.array.getHeight()}
          style={{fill: "#ddd"}}
          >
        </rect>

        {rects}
      </g>
  }
}

BitArrayVisualization.propTypes = {
};

BitArrayVisualization.defaultProps = {
};
