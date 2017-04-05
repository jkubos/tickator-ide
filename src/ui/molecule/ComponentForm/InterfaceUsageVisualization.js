import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import classNames from 'classnames'

import styles from './style.less'

import {UiState} from '~/src/business/UiState'
import {Modals} from '~/src/business/Modals'

import {Rectangle} from '~/src/util/geometry/Rectangle'

import {InterfaceUsage} from '~/src/tickator/definition/InterfaceUsage'

@observer
export class InterfaceUsageVisualization extends React.Component {

  static propTypes = {
    interfaceUsage: React.PropTypes.instanceOf(InterfaceUsage).isRequired,
    geometry: React.PropTypes.object.isRequired,
    boundary: React.PropTypes.instanceOf(Rectangle).isRequired,
    registerDrag: React.PropTypes.func.isRequired
  }

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {

    const title = `'${this.props.interfaceUsage.name}' of type '${this.props.interfaceUsage.refInterfaceDefinition.name}'`

    return <g className={styles.interfaceArea} onMouseDown={e=>this._dragStart(e)}>
      <title>{title}</title>

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
        className={styles.interfaceText}
        x={this.props.geometry.labelPosition.x}
        y={this.props.geometry.labelPosition.y}
        alignmentBaseline='middle'
        textAnchor='end'
        onClick={e=>this._editText(e)}
      >
        {this.props.interfaceUsage.name}
      </text>
    </g>
  }

  _editText() {
    this.context.uiState.openModal(Modals.TEXT_MODAL, {value: this.props.interfaceUsage.name}, e=>{
      if (e.confirmed) {
        this.props.interfaceUsage.name = e.value
      }
    })
  }

  _dragStart(e) {
    this.props.registerDrag(point=>{
      const position = this.props.boundary.findNearestPosition(point)

      this.props.interfaceUsage.side = position.side
      this.props.interfaceUsage.sideRatio = position.ratio
    })
  }
}
