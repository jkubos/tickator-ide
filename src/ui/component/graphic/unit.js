import React from 'react';
import InstanceDefinition from '~/src/tickator/definition/instance_definition'
import Pin from './pin'

export default class Unit extends React.Component {
  render() {

    console.log();

    return <g>

      <rect
        x={this.props.geom.bbox.x}
        y={this.props.geom.bbox.y}
        width={this.props.geom.bbox.width}
        height={this.props.geom.bbox.height}
        rx="5"
        ry="5"
        style={{
          fill: this.props.def.definition().type()==='ticklet' ? '#859900' : '#268BD2' ,
          strokeWidth: 2,
          stroke: '#586e75'
        }}>
      </rect>

      <text
        textAnchor="middle"
        alignmentBaseline="middle"
        fontFamily="Helvetica, Verdana"
        fontSize="12"
        fontWeight="bold"
        x={this.props.geom.bbox.x+this.props.geom.bbox.width/2}
        y={this.props.geom.bbox.y+this.props.geom.bbox.height/3}
        fill="white">
          {this.props.def.name()}
      </text>

      <text
        textAnchor="middle"
        alignmentBaseline="middle"
        fontFamily="Helvetica, Verdana"
        fontSize="8"
        fontWeight="bold"
        x={this.props.geom.bbox.x+this.props.geom.bbox.width/2}
        y={this.props.geom.bbox.y+this.props.geom.bbox.height/3+15}
        fill="white">
          {this.props.def.definition().name()}
      </text>

      <text
        textAnchor="middle"
        alignmentBaseline="middle"
        fontFamily="FontAwesome"
        fontSize="15"
        fontWeight="bold"
        x={this.props.geom.bbox.x+this.props.geom.bbox.width-12}
        y={this.props.geom.bbox.y+12}
        fill="#586e75">
          {this.props.def.definition().type()==='ticklet' ? "\uf013" : "\uf12e"}
      </text>

      {this.props.def.definition().inputs().map(i=><Pin
        key={i.name()}
        def={i}
        geom={this.props.geom.inputs[i.name()]}
        isOnRoot={false}
        />)
      }

      {this.props.def.definition().outputs().map(o=><Pin
        key={o.name()}
        def={o}
        geom={this.props.geom.outputs[o.name()]}
        isOnRoot={false}
        />)
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
