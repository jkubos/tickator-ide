import React from 'react'
import deepEqual from 'deep-equal'
import ComponentDefinition from '~/src/tickator/definition/component_definition'
import Unit from './unit'
import Connection from './connection'
import Pin from './pin'
import InstancesGeometry from '~/src/ui/util/instances_geometry'
import BitArrayVisualization from '~/src/ui/util/bit_array_visualization'

export default class ComponentSchema extends React.Component {

  constructor() {
    super()
    this.instances_geometry = new InstancesGeometry()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !deepEqual(this.props, nextProps, true)
  }

  render() {
    this.instances_geometry.update(this.props.def, this.props.width, this.props.height)

    return <svg
        style={{border: '1px solid gray', display: 'inline', }}
        width={this.props.width}
        height={this.props.height}
      >

      <rect
        x={this.instances_geometry.getSelf().bbox.x}
        y={this.instances_geometry.getSelf().bbox.y}
        width={this.instances_geometry.getSelf().bbox.width}
        height={this.instances_geometry.getSelf().bbox.height}
        rx="5"
        ry="5"
        style={{
          fill: '#fdf6e3' ,
          strokeWidth: 2,
          stroke: '#586e75'
        }}>
      </rect>

      {this.props.def.connections().map(def=><Connection
        def={def}
        geom={this.instances_geometry.getForConnection(def.uuid())}
        key={def.uuid()}
      />)}

      {this.props.def.instances().map(def=><Unit
        def={def}
        geom={this.instances_geometry.getForInstance(def.name())}
        key={def.name()}
      />)}

      {this.props.def.inputs().map(i=><Pin
        key={i.name()}
        def={i}
        geom={this.instances_geometry.getSelf().inputs[i.name()]}
        isOnRoot={true}
        />)
      }

      {this.props.def.outputs().map(o=><Pin
        key={o.name()}
        def={o}
        geom={this.instances_geometry.getSelf().outputs[o.name()]}
        isOnRoot={true}
        />)
      }

      {/*<BitArrayVisualization array={this.instances_geometry.getForInstance('karel')}/>*/}

      </svg>
  }
}

ComponentSchema.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  def: React.PropTypes.instanceOf(ComponentDefinition).isRequired
}
