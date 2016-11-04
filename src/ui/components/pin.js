import React from 'react';
import InputDefinition from '../../tickator/input_definition'
import OutputDefinition from '../../tickator/output_definition'

export default class Pin extends React.Component {
  render() {
    return <g>
      <circle
        cx={this.props.geom.headCenter.x}
        cy={this.props.geom.headCenter.y}
        r={this.props.geom.headRadius}
        stroke="black"
        strokeWidth="2"
        fill={(this.props.def instanceof OutputDefinition) ? 'black' : 'white'} />

      <line
        x1={this.props.geom.instanceMountPosition.x}
        y1={this.props.geom.instanceMountPosition.y}
        x2={this.props.geom.headMountPosition.x}
        y2={this.props.geom.headMountPosition.y}
        stroke="black"
        strokeWidth="2" />

      <text
        textAnchor={this.props.geom.textAlignHorizontal}
        alignmentBaseline={this.props.geom.textAlignVertical}
        fontFamily="Helvetica, Verdana"
        fontSize="10"
        x={this.props.geom.textPosition.x}
        y={this.props.geom.textPosition.y}
        fill="white">
          {this.props.def.name()}
      </text>

    </g>
  }

  getChildContext() {
    return {}
  }
}

Pin.propTypes = {
  def: React.PropTypes.oneOfType([React.PropTypes.instanceOf(InputDefinition),
    React.PropTypes.instanceOf(OutputDefinition)]).isRequired,
  geom: React.PropTypes.object.isRequired
}

Pin.defaultProps = {
}

Pin.childContextTypes = {
}
