import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import classNames from 'classnames'

import styles from './style.less'

import {UiState} from '~/src/business/UiState'
import {Modals} from '~/src/business/Modals'

import {Tools} from '~/src/util/Tools'

import {InterfaceDefinition} from '~/src/tickator/definition/InterfaceDefinition'

// import {DataTypes} from '~/src/tickator/definition/DataTypes'

var DataTypes = ["axx"]

import {Point} from '~/src/util/geometry/Point'
import {Vector} from '~/src/util/geometry/Vector'

import {ImageButton} from '~/src/ui/quark/ImageButton'

import {EditableText} from '~/src/ui/atom/EditableText'

import {Pins} from './Pins'

const WIDTH = 800
const MIN_HEIGHT = 300

@observer
export class InterfaceForm extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired,
    test: React.PropTypes.instanceOf(InterfaceDefinition).isRequired
  }

  @observable _data = {
    name: "new interface",
    definitionSideName: "side 1",
    otherSideName: "side 2",
    types: [
    ],
    pins: [
    ]
  }

  render() {
    return <div className={styles.main}>
      <div className={styles.header}>
        <EditableText object={this.context.test} property={'name'} default='???'/>
      </div>

      <div className={styles.subheader}>
        <EditableText object={this.context.test} property={'definitionSideName'} default='???'/>
        <span>
          {this.context.test.refsType.map(type=>{
            return <span
              className={styles.type}
              key={type.businessObject.uuid}
              onClick={e=>this._openTypeMenu(e, type)}>
              &lt;{type.name}&gt;
            </span>
          })}
        </span>
        <EditableText object={this.context.test} property={'otherSideName'} default='???'/>
      </div>

      <div className={styles.pins}>
        <Pins pins={this._data.pins} types={this._data.types}/>

        <div>
          <ImageButton glyph="fa-plus" label="Add pin" huge={true} onClick={e=>this._addPin()}/>
          <ImageButton glyph="fa-plus" label="Add type" huge={true} onClick={e=>this._addType()} />
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

  _addType() {
    this.context.test.addType()
  }

  _openTypeMenu(e, type) {
    const buttons = {
      buttons: [
        {glyph: "fa-i-cursor", label: "Rename", command: "rename"},
        {glyph: "fa-trash", label: "Delete", command: "delete"}
      ]
    }

    this.context.uiState.openModal(Modals.CONTEXT_MENU, buttons, e=>{
      if (e.confirmed) {
        if (e.command==="delete") {
          type.delete()
        } else if (e.command==="rename") {
          this.context.uiState.openModal(Modals.TEXT_MODAL, {value: type.name}, e=>{
            if (e.confirmed) {
              type.name = e.value
              console.log(type.name);
            }
          })
        }
      }
    })

    e.stopPropagation()
  }
}
