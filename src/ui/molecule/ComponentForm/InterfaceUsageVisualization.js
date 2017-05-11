import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import classNames from 'classnames'

import styles from './style.less'

import {UiState} from '~/src/business/UiState'
import {Modals} from '~/src/business/Modals'

import {Rectangle} from '~/src/util/geometry/Rectangle'

import {InterfaceUsage} from '~/src/tickator/definition/InterfaceUsage'
import {ComponentImplementation} from '~/src/tickator/definition/ComponentImplementation'

@observer
export class InterfaceUsageVisualization extends React.Component {

  static propTypes = {
    interfaceUsage: React.PropTypes.instanceOf(InterfaceUsage).isRequired,
    componentImplementation: React.PropTypes.instanceOf(ComponentImplementation).isRequired,
    geometry: React.PropTypes.object.isRequired,
    boundary: React.PropTypes.instanceOf(Rectangle).isRequired,
    registerDrag: React.PropTypes.func.isRequired,
    reportDropTarget: React.PropTypes.func.isRequired,
    passive: React.PropTypes.bool
  }

  static defaultProps = {
    passive: false
  }

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {

    return <g
      className={styles.interfaceArea}
      onMouseDown={e=>this._dragStart(e)}
      onTouchStart={e=>this._dragStart(e)}
      onClick={e=>this._openMenu(e)}
      onMouseMove={e=>this._reportDropTarget(e)}
      onMouseLeave={e=>this._cleanDropTarget(e)}
    >
      <circle
        className={styles.interfaceHeadOuter}
        cx={this.props.geometry.headPoint.x}
        cy={this.props.geometry.headPoint.y}
        r={this.props.geometry.radius*2}
      />

      <circle
        className={styles.interfaceHead}
        cx={this.props.geometry.headPoint.x}
        cy={this.props.geometry.headPoint.y}
        r={this.props.geometry.radius}
      />

      <line
        className={styles.interfaceLine}
        x1={this.props.geometry.basePoint.x}
        y1={this.props.geometry.basePoint.y}
        x2={this.props.geometry.headTouchPoint.x}
        y2={this.props.geometry.headTouchPoint.y}
      />

      <text
        className={this.props.passive ? styles.interfaceSmallText : styles.interfaceText}
        alignmentBaseline='middle'
        textAnchor='middle'
        onClick={e=>this._editText(e)}
        transform={`
          translate(${this.props.geometry.labelPosition.x},${this.props.geometry.labelPosition.y})
          rotate(${this.props.geometry.labelRotation})
        `}
      >
        {this.props.interfaceUsage.name}
      </text>
    </g>
  }

  _editText(e) {
    if (this.props.passive) {
      return
    }

    this.context.uiState.openModal(Modals.TEXT_MODAL, {value: this.props.interfaceUsage.name}, e=>{
      if (e.confirmed) {
        this.props.interfaceUsage.name = e.value
      }
    })

    e.stopPropagation()
  }

  _dragStart(e) {
    if (this.props.passive) {
      return
    }

    this._dragInProcess = false

    this.props.registerDrag(point=>{
      const position = this.props.boundary.findNearestPosition(point)

      this._dragInProcess = true

      this.props.interfaceUsage.side = position.side
      this.props.interfaceUsage.sideRatio = position.ratio
    })
  }

  _openMenu(e) {
    if (this.props.passive) {
      return
    }

    if (this._dragInProcess) {
      return
    }

    this.context.uiState.openModal(Modals.INTERFACE_USAGE_DIALOG, {
      interfaceUsage: this.props.interfaceUsage,
      componentImplementation: this.props.componentImplementation
    }, e=>{
    })

    e.stopPropagation()
  }

  _reportDropTarget(e) {
    if (e.button===0) {
      this.props.reportDropTarget(this.props.interfaceUsage.businessObject.uuid, true)
    }
  }

  _cleanDropTarget(e) {
    this.props.reportDropTarget(this.props.interfaceUsage.businessObject.uuid, false)
  }
}
