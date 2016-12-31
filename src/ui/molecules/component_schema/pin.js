import React from 'react';
import {InputDefinition} from '~/src/tickator/definition/input_definition'
import {OutputDefinition} from '~/src/tickator/definition/output_definition'

export class Pin extends React.Component {
  render() {
    return <g>
      <circle
        cx={this.props.geom.headCenter.x}
        cy={this.props.geom.headCenter.y}
        r={this.props.geom.headRadius}
        stroke="#586e75"
        strokeWidth="2"
        fill={(this.props.def instanceof OutputDefinition) ^ this.props.isOnRoot ? '#586e75' : 'white'} />

      <line
        x1={this.props.geom.instanceMountPosition.x}
        y1={this.props.geom.instanceMountPosition.y}
        x2={this.props.geom.headMountPosition.x}
        y2={this.props.geom.headMountPosition.y}
        stroke="#586e75"
        strokeWidth="2" />

      <text
        textAnchor={this.props.geom.textAlignHorizontal}
        alignmentBaseline={this.props.geom.textAlignVertical}
        fontFamily="Helvetica, Verdana"
        fontSize="10"
        x={this.props.geom.textPosition.x}
        y={this.props.geom.textPosition.y}
        fill={this.props.isOnRoot ? "black" : "white"}>
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
  geom: React.PropTypes.object.isRequired,
  isOnRoot: React.PropTypes.bool.isRequired
}

Pin.defaultProps = {
}

Pin.childContextTypes = {
}
