import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import styles from './style.less'
import {UiState} from '~/src/business/UiState'
import {Modals} from '~/src/business/Modals'

import {Tools} from '~/src/util/Tools'

import {WireDefinition} from '~/src/tickator/definition/WireDefinition'

import {DataTypes} from '~/src/tickator/DataTypes'

import {Vector} from '~/src/util/geometry/Vector'
import {Point} from '~/src/util/geometry/Point'

import {LongClickDetector} from '~/src/util/LongClickDetector'

import {Button} from '~/src/ui/quark/Button'

@observer
export class Wires extends React.Component {

  _WIDTH = 600
  _PIN_BOX_HEIGHT = 70
  _ARROW_HALF_LENGTH = 15

  static propTypes = {
    wires: React.PropTypes.arrayOf(React.PropTypes.instanceOf(WireDefinition)).isRequired
  }

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {
    return <svg
        style={{display: 'inline', userSelect: 'none'}}
        width={this._WIDTH}
        height={this._PIN_BOX_HEIGHT*this.props.wires.length}
      >
        {this.props.wires.map((wire, i)=>this._renderWire(wire, i))}
      </svg>
  }

  _renderWire(wire, index) {
    const y = (index+1)*this._PIN_BOX_HEIGHT-20
    const arrowDirection = new Vector(wire.direction=='in'?-1:1, 0)

    let typeLabel = '?'

    if (wire.basicType) {
      typeLabel = DataTypes[wire.basicType]
    } else if (wire.refType) {
      typeLabel = wire.refType.name
    }

    return <g key={wire.businessObject.uuid}>
      <text
        x={this._WIDTH/2-5}
        y={y-25}
        textAnchor="end"
        alignmentBaseline="baseline"
        fill={wire.hasValidType() ? 'white' : 'red' }
        onClick={e=>this._editType(wire)}
        >{typeLabel}</text>

      <text
        x={this._WIDTH/2+5}
        y={y-25}
        textAnchor="start"
        alignmentBaseline="baseline"
        fill={wire.nameIsValid ? 'white' : 'red'}
        onClick={e=>this._editLabel(wire)}
        >{wire.name || '???'}</text>

      <line
        x1={0}
        y1={y}
        x2={this._WIDTH}
        y2={y}
        stroke="#333"
        strokeWidth={18}
        onClick={e=>this._openMenu(wire)}
      />

      <line
        x1={0}
        y1={y}
        x2={this._WIDTH}
        y2={y}
        stroke="white"
        strokeWidth={4}
        onClick={e=>this._openMenu(wire)}
      />

    {this._renderArrow(new Point(50, y), arrowDirection, wire)}
      {this._renderArrow(new Point(this._WIDTH-50, y), arrowDirection, wire)}
    </g>
  }

  _renderArrow(point, dir, wire) {
    const p1 = point.added(dir.unit().multiplied(this._ARROW_HALF_LENGTH))

    const baseEnd = point.added(dir.unit().multiplied(-1*this._ARROW_HALF_LENGTH))

    const p2 = baseEnd.added(dir.unit().perpendAntiClockwise().multiplied(this._ARROW_HALF_LENGTH))
    const p3 = baseEnd.added(dir.unit().perpendClockwise().multiplied(this._ARROW_HALF_LENGTH))

    return <polygon
      points={[p1, p2, p3].map(p=>p.toCoord()).join(' ')}
      stroke="white"
      strokeWidth="1"
      fill="white"
      onClick={e=>this._changeDirection(wire)}
      />
  }

  _changeDirection(wire) {
    if (wire.direction=='in') {
      wire.direction = 'out'
    } else {
      wire.direction = 'in'
    }
  }

  _editLabel(wire) {
    this.context.uiState.openModal(Modals.TEXT_MODAL, {value: wire.name}, e=>{
      if (e.confirmed) {
        wire.name = e.value
      }
    })
  }

  _editType(wire) {
    let options = [];

    options = options.concat(wire.refInterfaceDefinition.refsType.map(t=>{
        return {
          label: t.name,
          value: {type: t}
        }
    }))

    if (options.length>0) {
      options = options.concat({separator: true})
    }

    options = options.concat(Object.keys(DataTypes).map(t=>{
      return {
        label: DataTypes[t],
        value: {basicType: t}
      }
    }))

    this.context.uiState.openModal(Modals.CHOICE_MODAL, {options}, e=>{
      if (e.confirmed) {
        if (e.value.type) {
          wire.refType = e.value.type
        } else {
          wire.basicType = e.value.basicType
        }
      }
    })
  }

  _openMenu(wire) {
    const buttons = {
      buttons: [
        {glyph: "fa-trash", label: "Delete", command: "delete"},
        {glyph: "fa-clone", label: "Clone", command: "clone"}
      ]
    }

    this.context.uiState.openModal(Modals.CONTEXT_MENU, buttons, e=>{
      if (e.confirmed) {
        if (e.command==="delete") {
          wire.delete()
        } else if (e.command==="clone") {
          wire.clone()
        }
      }
    })
  }
}
