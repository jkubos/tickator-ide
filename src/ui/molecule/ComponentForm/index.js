import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import classNames from 'classnames'

import styles from './style.less'

import {ComponentFrame} from './ComponentFrame'

import {UiState} from '~/src/business/UiState'
import {BusinessSpace} from '~/src/business/BusinessSpace'
import {Modals} from '~/src/business/Modals'

import {Tools} from '~/src/util/Tools'

import {ComponentDefinition} from '~/src/tickator/definition/ComponentDefinition'
import {InterfaceDefinition} from '~/src/tickator/definition/InterfaceDefinition'

import {ImageButton} from '~/src/ui/quark/ImageButton'

import {EditableText} from '~/src/ui/atom/EditableText'


@observer
export class ComponentForm extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired,
    space: React.PropTypes.instanceOf(BusinessSpace).isRequired
  }

  render() {
    let problems = [];

    this._obj = this.context.space.get(this.context.uiState.selectedParams.uuid).owner;

    return <div className={styles.main}>
      <div className={styles.header}>
        <EditableText object={this._obj} property={'name'} default='???'/>
        <br/>
        <ImageButton glyph="fa-plus" label="Add interface/component" huge={false} onClick={e=>this._add()}/>
      </div>

      <ComponentFrame componentDefinition={this._obj} />

      {problems.length>0 && <div className={styles.problems}>
        <h3>Problems:</h3>
        <ul>
          {problems.map((problem, i)=><li key={i}>{problem.problem} [{problem.businessType}:{problem.name}]</li>)}
        </ul>
      </div>}

    </div>
  }

  _add() {
    let options = [
      {label: 'Component', value: 'component'},
      {label: 'Interface', value: 'interface'}
    ]

    this.context.uiState.openModal(Modals.CHOICE_MODAL, {options}, e=>{
      if (e.confirmed) {
        if (e.value=='interface') {
          this._addInterface()
        } else {
          alert(`Not implemented for type ${e.value}`)
        }
      }
    })
  }

  _addInterface() {
    this.context.uiState.openModal(Modals.SELECT_OBJECT_MODAL, {type: InterfaceDefinition}, e=>{
      if (e.confirmed) {
        console.log(e)
      }
    })
  }
}
