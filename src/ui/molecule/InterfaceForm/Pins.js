import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import styles from './style.less'
import {UiState} from '~/src/business/UiState'
import {Modals} from '~/src/business/Modals'

import {DataTypes} from '~/src/tickator/definition/DataTypes'

import {Vector} from '~/src/util/geometry/Vector'
import {Point} from '~/src/util/geometry/Point'

import {Button} from '~/src/ui/quark/Button'
import {ImageButton} from '~/src/ui/quark/ImageButton'

@observer
export class Pins extends React.Component {

  _WIDTH = 600
  _PIN_BOX_HEIGHT = 50
  _ARROW_HALF_LENGTH = 10

  static propTypes = {
    pins: React.PropTypes.object.isRequired,
    types: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  }

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {
    return <svg
        style={{display: 'inline', userSelect: 'none'}}
        width={this._WIDTH}
        height={this._PIN_BOX_HEIGHT*this.props.pins.length}
      >
        {this.props.pins.map((pin, i)=>this._renderPin(pin, i))}
      </svg>
  }

  _renderPin(pin, index) {
    const y = (index+1)*this._PIN_BOX_HEIGHT-20
    const arrowDirection = new Vector(pin.direction=='in'?-1:1, 0)

    return <g key={pin.uuid}>
      <text
        x={this._WIDTH/2-5}
        y={y-5}
        textAnchor="end"
        alignmentBaseline="baseline"
        fill="white"
        onClick={e=>this._editType(index)}
        >{pin.type}</text>
      <text
        x={this._WIDTH/2+5}
        y={y-5}
        textAnchor="start"
        alignmentBaseline="baseline"
        fill="white"
        onClick={e=>this._editLabel(index)}
        >{pin.name}</text>
      <line x1={0} y1={y} x2={this._WIDTH} y2={y} stroke="white" strokeWidth={2} />
      {this._renderArrow(new Point(50, y), arrowDirection)}
      {this._renderArrow(new Point(this._WIDTH-50, y), arrowDirection)}
    </g>
  }

  _renderArrow(point, dir) {
    const p1 = point.added(dir.unit().multiplied(this._ARROW_HALF_LENGTH))

    const baseEnd = point.added(dir.unit().multiplied(-1*this._ARROW_HALF_LENGTH))

    const p2 = baseEnd.added(dir.unit().perpendAntiClockwise().multiplied(this._ARROW_HALF_LENGTH))
    const p3 = baseEnd.added(dir.unit().perpendClockwise().multiplied(this._ARROW_HALF_LENGTH))

    return <polygon
      points={[p1, p2, p3].map(p=>p.toCoord()).join(' ')}
      stroke="white"
      strokeWidth="1"
      fill="white" />
  }

  _editLabel(index) {
    this.context.uiState.openModal(Modals.TEXT_MODAL, {value: this.props.pins[index].name}, e=>{
      if (e.confirmed) {
        this.props.pins[index].name = e.value
      }
    })
  }

  _editType(index) {
    this.context.uiState.openModal(Modals.CHOICE_MODAL, {
      value: this.props.pins[index].type,
      options: []
        .concat(this.props.types.map(t=>t.name))
        .concat(Object.keys(DataTypes))
    }, e=>{
      if (e.confirmed) {
        this.props.pins[index].type = e.value
      }
    })
  }
}
