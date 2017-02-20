import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import styles from './style.less'
import {UiState} from '~/src/business/UiState'
import {Modals} from '~/src/business/Modals'

import {Tools} from '~/src/util/Tools'

import {DataTypes} from '~/src/tickator/definition/DataTypes'

import {Point} from '~/src/util/geometry/Point'
import {Vector} from '~/src/util/geometry/Vector'

import {ImageButton} from '~/src/ui/quark/ImageButton'

import {Pins} from './Pins'
import {TypesList} from './TypesList'

const WIDTH = 800
const MIN_HEIGHT = 300

@observer
export class InterfaceForm extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  @observable _data = {
    name: "binary operation",
    definitionSideName: "operation",
    otherSideName: "request",
    types: [
      // {name: "T", uuid: "1232164654"},
      // {name: "U", uuid: "1456546654654"},
      // {name: "W", uuid: "154111415"}
    ],
    pins: [
      // {name: "a", type: "T", direction: 'in', uuid: "59999999"},
      // {name: "b", type: "U", direction: 'in', uuid: "17889663"},
      // {name: "res", type: "INTEGER", direction: 'out', uuid: "123154"}
    ]
  }

  render() {
    return <div className={styles.main}>
      <div className={styles.header}>
        <span onClick={e=>this._editLabel('name')}>{this._data.name}</span>
      </div>

      <div className={styles.subheader}>
        <span onClick={e=>this._editLabel('definitionSideName')}>{this._data.definitionSideName}</span>
        <TypesList types={this._data.types}/>
        <span onClick={e=>this._editLabel('otherSideName')}>{this._data.otherSideName}</span>
      </div>

      <div className={styles.pins}>
        <Pins pins={this._data.pins} types={this._data.types}/>

        <div>
          <ImageButton glyph="fa-plus" label="Add pin" huge={true} onClick={e=>this._addPin()}/>
        </div>
      </div>

    </div>
  }

  _editLabel(field) {
    this.context.uiState.openModal(Modals.TEXT_MODAL, {value: this._data[field]}, e=>{
      if (e.confirmed) {
        this._data[field] = e.value
      }
    })
  }

  _addPin() {
    this._data.pins.push({
      name: "new",
      type: DataTypes.ANY,
      direction: 'in',
      uuid: Tools.generateUUID()
    })
  }
}
