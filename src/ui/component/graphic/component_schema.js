import React from 'react'
import ComponentDefinition from '~/src/tickator/definition/component_definition'
import Unit from './unit'
import Connection from './connection'
import InstancesGeometry from '~/src/ui/util/instances_geometry'
import BitArrayVisualization from '~/src/ui/util/bit_array_visualization'

export default class ComponentSchema extends React.Component {

  constructor() {
    super()
    this.instances_geometry = new InstancesGeometry()
  }

  render() {
    this.instances_geometry.update(this.props.def, this.props.width, this.props.height)

    return <svg
        style={{border: '1px solid gray', display: 'inline', }}
        width={this.props.width}
        height={this.props.height}
      >

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

      {/*<BitArrayVisualization array={this.instances_geometry.getForInstance('karel')}/>*/}

      </svg>
  }

  getChildContext() {
    return {}
  }
}

ComponentSchema.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  def: React.PropTypes.instanceOf(ComponentDefinition).isRequired
}

ComponentSchema.defaultProps = {
}

ComponentSchema.childContextTypes = {
}
