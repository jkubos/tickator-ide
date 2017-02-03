import React from 'react'
import {observer} from 'mobx-react'
import {Component} from '~/src/tickator/instance/Component'
import {Unit} from './Unit'
import {Connection} from './Connection'
import {Pin} from './Pin'
import {InstancesGeometry} from './InstancesGeometry'
import {BitArray} from '~/src/ui/atoms/BitArray'
import {UiState} from '~/src/business/UiState'
import {Size} from '~/src/util/geometry/Size'

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
    let instancePov = this.context.uiState.currentContextStore.getDisplayedInstance()

    let safeWidth = Math.max(200, this.props.width-20)
    let safeHeight = Math.max(200, this.props.height-20)

    this.instances_geometry.update(instancePov.definition(), safeWidth, safeHeight)

    return <svg
        style={{display: 'inline', userSelect: 'none'}}
        width={this.instances_geometry.getRealSize().width}
        height={this.instances_geometry.getRealSize().height}
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

      {/* <BitArray array={this.instances_geometry._shortestPathFinder._bitArray}/> */}

      </svg>
  }
}
