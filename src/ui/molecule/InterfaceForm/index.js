import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import classNames from 'classnames'

import styles from './style.less'

import {UiState} from '~/src/business/UiState'
import {Modals} from '~/src/business/Modals'

import {Tools} from '~/src/util/Tools'

import {InterfaceDefinition} from '~/src/tickator/definition/InterfaceDefinition'

import {Point} from '~/src/util/geometry/Point'
import {Vector} from '~/src/util/geometry/Vector'

import {ImageButton} from '~/src/ui/quark/ImageButton'

import {EditableText} from '~/src/ui/atom/EditableText'

import {Wires} from './Wires'

@observer
export class InterfaceForm extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired,
    test: React.PropTypes.instanceOf(InterfaceDefinition).isRequired
  }

  render() {
    let problems = [];

    [this.context.test, ...this.context.test.wires, ...this.context.test.refsType].forEach(obj=>{
      console.log(obj);
      obj.businessObject.observe()
      problems = problems.concat(obj.businessObject.problems())
    })

    return <div className={styles.main}>
      <div className={styles.header}>
        <EditableText object={this.context.test} property={'name'} default='???'/>
      </div>

      <div className={styles.subheader}>
        <EditableText object={this.context.test} property={'definitionSideName'} default='???'/>
        <span>
          {this.context.test.refsType.map(type=>{
            return <span
              className={classNames(styles.type, {[styles.error]: !type.nameIsValid})}
              key={type.businessObject.uuid}
              onClick={e=>this._openTypeMenu(e, type)}>
              &lt;{type.name}&gt;
            </span>
          })}
        </span>
        <EditableText object={this.context.test} property={'otherSideName'} default='???'/>
      </div>

      <div className={styles.pins}>

        <Wires wires={this.context.test.wires} />

        <div>
          <ImageButton glyph="fa-plus" label="Add wire" huge={true} onClick={e=>this._addWire()}/>
          <ImageButton glyph="fa-plus" label="Add type" huge={true} onClick={e=>this._addType()} />
        </div>
      </div>

      {problems.length>0 && <div className={styles.problems}>
        <h3>Problems:</h3>
        <ul>
          {problems.map((problem, i)=><li key={i}>{problem.problem} [{problem.businessType}:{problem.name}]</li>)}
        </ul>
      </div>}

    </div>
  }

  _addWire() {
    this.context.test.addWire()
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
            }
          })
        }
      }
    })

    e.stopPropagation()
  }
}
