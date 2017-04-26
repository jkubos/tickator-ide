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

@observer
export class ComponentUsageVisualization extends React.Component {

  static propTypes = {
    componentUsage: React.PropTypes.instanceOf(ComponentUsage).isRequired,
    componentImplementation: React.PropTypes.instanceOf(ComponentImplementation).isRequired,
    geometry: React.PropTypes.object.isRequired,
    registerDrag: React.PropTypes.func.isRequired
  }

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {

    return <g
        onMouseDown={e=>this._dragStart(e)}
        onTouchStart={e=>this._dragStart(e)}
      >
      <rect
        className={styles.usageFrame}
        x={this.props.componentUsage.x-50}
        y={this.props.componentUsage.y-50}
        width={100}
        height={100}
        />

      <text
        className={styles.centeredLabel}
        x={this.props.componentUsage.x}
        y={this.props.componentUsage.y}
        onClick={e=>this._editText(e)}
      >
        {this.props.componentUsage.name}
      </text>
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

    this.props.registerDrag(point=>{
      this._dragInProcess = true

      this.props.componentUsage.x = point.x
      this.props.componentUsage.y = point.y
    })
  }
}
