import React from 'react'
import deepEqual from 'deep-equal'
import Component from '~/src/tickator/instance/component'
import Unit from './unit'
import Connection from './connection'
import Pin from './pin'
import InstancesGeometry from './instances_geometry'
//import BitArrayVisualization from '~/src/ui/util/bit_array_visualization'
import {
  SELECT_INSTANCE,
  EMERGE_FROM_INSTANCE
} from '~/src/business/commands/commands'
import CommandsDispatcher from '~/src/business/commands_dispatcher'

export class ComponentSchema extends React.Component {

  constructor() {
    super()
    this.instances_geometry = new InstancesGeometry()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !deepEqual(this.props, nextProps, true)
  }

  render() {

    let instancePov = this.props.instance

    this.props.povInstancePath.forEach(name=>{
      instancePov = instancePov._findInstance(name)
    })

    this.instances_geometry.update(instancePov.definition(), this.props.width, this.props.height)

    return <svg
        style={{border: '1px solid gray', display: 'inline', userSelect: 'none'}}
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
          stroke: this.props.selectedInstanceName==='' ? '#cb4b16' : '#586e75'
        }}
        onClick={e=>this.context.commandsDispatcher.dispatch(SELECT_INSTANCE, {instance: ''})}
        onDoubleClick={e=>this.context.commandsDispatcher.dispatch(EMERGE_FROM_INSTANCE, {})}
        >
      </rect>

      {instancePov.definition().connections().map(def=><Connection
        def={def}
        geom={this.instances_geometry.getForConnection(def.uuid())}
        key={def.uuid()}
      />)}

      {instancePov.definition().instances().map(def=><Unit
        def={def}
        geom={this.instances_geometry.getForInstance(def.name())}
        key={def.name()}
        selected={this.props.selectedInstanceName===def.name()}
      />)}

      {instancePov.definition().inputs().map(i=><Pin
        key={i.name()}
        def={i}
        geom={this.instances_geometry.getSelf().inputs[i.name()]}
        isOnRoot={true}
        />)
      }

      {instancePov.definition().outputs().map(o=><Pin
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
  instance: React.PropTypes.instanceOf(Component).isRequired,
  selectedInstanceName: React.PropTypes.string.isRequired,
  povInstancePath: React.PropTypes.array.isRequired
}

ComponentSchema.contextTypes = {
  commandsDispatcher: React.PropTypes.instanceOf(CommandsDispatcher).isRequired
}
