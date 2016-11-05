import React from 'react';
import InstanceDefinition from '~/src/tickator/definition/instance_definition'
import Pin from './pin'

export default class Unit extends React.Component {
  render() {
    return <g>

      <rect
        x={this.props.geom.bbox.x}
        y={this.props.geom.bbox.y}
        width={this.props.geom.bbox.width}
        height={this.props.geom.bbox.height}
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
        x={this.props.geom.bbox.x+this.props.geom.bbox.width/2}
        y={this.props.geom.bbox.y+this.props.geom.bbox.height/3}
        fill="white">
          {this.props.def.name()} : {this.props.def.definition().name()}
      </text>

      {this.props.def.definition().inputs().map(i=><Pin
        key={i.name()}
        def={i}
        geom={this.props.geom.inputs[i.name()]}/>)
      }

      {this.props.def.definition().outputs().map(o=><Pin
        key={o.name()}
        def={o}
        geom={this.props.geom.outputs[o.name()]}/>)
      }
    </g>
  }

  getChildContext() {
    return {}
  }
}

Unit.propTypes = {
  def: React.PropTypes.instanceOf(InstanceDefinition).isRequired,
  geom: React.PropTypes.object.isRequired
}

Unit.defaultProps = {
}

Unit.childContextTypes = {
}
