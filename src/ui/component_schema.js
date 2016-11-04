import React from 'react'
import ComponentDefinition from '../tickator/component_definition'
import Unit from './components/unit'
import Connection from './components/connection'
import InstancesGeometry from '../geometry/instances_geometry'
import BitArrayVisualization from './bit_array_visualization'

export default class ComponentSchema extends React.Component {

  constructor() {
    super()
    this.instances_geometry = new InstancesGeometry()
  }

  render() {
    this.instances_geometry.update(this.props.def, this.props.width, this.props.height)

    return <svg
        style={{border: '1px solid gray', display: 'inline-block'}}
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

      {/**/}<BitArrayVisualization array={this.instances_geometry.getForInstance('karel')}/>

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
