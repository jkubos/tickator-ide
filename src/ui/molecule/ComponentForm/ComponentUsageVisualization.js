import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import classNames from 'classnames'

import styles from './style.less'

import {UiState} from '~/src/business/UiState'
import {Modals} from '~/src/business/Modals'

import {Rectangle} from '~/src/util/geometry/Rectangle'

import {ComponentUsage} from '~/src/tickator/definition/ComponentUsage'
import {ComponentImplementation} from '~/src/tickator/definition/ComponentImplementation'

import {InterfaceUsageVisualization} from './InterfaceUsageVisualization'

@observer
export class ComponentUsageVisualization extends React.Component {

  static propTypes = {
    componentUsage: React.PropTypes.instanceOf(ComponentUsage).isRequired,
    componentImplementation: React.PropTypes.instanceOf(ComponentImplementation).isRequired,
    geometry: React.PropTypes.object.isRequired,
    registerDrag: React.PropTypes.func.isRequired,
    clientToPoint: React.PropTypes.func.isRequired
  }

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {
    const {geometry} = this.props

    return <g
        onMouseDown={e=>this._dragStart(e)}
        onTouchStart={e=>this._dragStart(e)}
      >
      <rect
        className={styles.usageFrame}
        x={geometry.boundary.x}
        y={geometry.boundary.y}
        width={geometry.boundary.width}
        height={geometry.boundary.height}
        />

      <text
        className={styles.centeredLabel}
        x={geometry.center.x}
        y={geometry.center.y}
        onClick={e=>this._editText(e)}
      >
        {this.props.componentUsage.name}
      </text>

      {this.props.componentUsage.refComponentDefinition.refsInterfaceUsage.map(interfaceUsage=>{
        return <InterfaceUsageVisualization
          key={interfaceUsage.businessObject.uuid}
          geometry={geometry.items[interfaceUsage.businessObject.uuid]}
          interfaceUsage={interfaceUsage}
          componentImplementation={this.props.componentImplementation}
          registerDrag={this.props.registerDrag}
          boundary={geometry.boundary}
          passive
        />
      })}
    </g>
  }

  _editText(e) {
    if (this._dragInProcess) {
      return
    }

    this.context.uiState.openModal(Modals.TEXT_MODAL, {value: this.props.componentUsage.name}, e=>{
      if (e.confirmed) {
        this.props.componentUsage.name = e.value
      }
    })

    e.stopPropagation()
  }

  _dragStart(e) {
    this._dragInProcess = false

    const startPoint = this.props.clientToPoint(e.clientX, e.clientY)

    const dx = startPoint.x-this.props.componentUsage.x
    const dy = startPoint.y-this.props.componentUsage.y

    this.props.registerDrag(point=>{
      this._dragInProcess = true

      this.props.componentUsage.x = point.x-dx
      this.props.componentUsage.y = point.y-dy
    })
  }
}
