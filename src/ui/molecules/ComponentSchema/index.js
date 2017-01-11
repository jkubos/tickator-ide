import React from 'react'
import {observer} from 'mobx-react'
import {Component} from '~/src/tickator/instance/Component'
import {Unit} from './Unit'
import {Connection} from './Connection'
import {Pin} from './Pin'
import {InstancesGeometry} from './InstancesGeometry'
//import BitArrayVisualization from '~/src/ui/util/bit_array_visualization'
import {UiState} from '~/src/business/UiState'

@observer
export class ComponentSchema extends React.Component {

  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    selectedInstanceName: React.PropTypes.string.isRequired,
    povInstancePath: React.PropTypes.array.isRequired
  }

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  constructor() {
    super()
    this.instances_geometry = new InstancesGeometry()
  }

  render() {
    if (this.props.width<=0 || this.props.height<=0) {
      return null
    }

    let instancePov = this.context.uiState.currentContextStore.getDisplayedInstance()

    this.instances_geometry.update(instancePov.definition(), this.props.width, this.props.height)

    return <svg
        style={{display: 'inline', userSelect: 'none'}}
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
          stroke: this.context.uiState.currentContextStore.selectedInstanceName===undefined ? '#cb4b16' : '#586e75'
        }}
        onClick={e=>this.context.uiState.currentContextStore.selectInstance(undefined)}
        onDoubleClick={e=>this.context.uiState.currentContextStore.rollUp()}
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
        selected={this.context.uiState.currentContextStore.selectedInstanceName===def.name()}
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
