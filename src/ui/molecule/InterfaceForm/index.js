import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import classNames from 'classnames'

import styles from './style.less'

import {UiState} from '~/src/business/UiState'
import {BusinessSpace} from '~/src/business/BusinessSpace'
import {Modals} from '~/src/business/Modals'

import {Tools} from '~/src/util/Tools'

import {InterfaceDefinition} from '~/src/tickator/definition/InterfaceDefinition'

import {Point} from '~/src/util/geometry/Point'
import {Vector} from '~/src/util/geometry/Vector'

import {ContextMenu} from '~/src/ui/quark/ContextMenu'
import {ContextMenuItem} from '~/src/ui/quark/ContextMenuItem'

import {EditableText} from '~/src/ui/atom/EditableText'
import {TypesList} from '~/src/ui/atom/TypesList'

import {Wires} from './Wires'

@observer
export class InterfaceForm extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired,
    space: React.PropTypes.instanceOf(BusinessSpace).isRequired
  }

  render() {
    let problems = [];

    this._obj = this.context.space.get(this.context.uiState.selectedParams.uuid).owner;

    [this._obj, ...this._obj.refsWire, ...this._obj.refsType].forEach(obj=>{
      obj.businessObject.observe()
      problems = problems.concat(obj.businessObject.problems())
    })

    return <div className={styles.main}>
      <div className={styles.header}>
        <EditableText object={this._obj} property={'name'} default='???'/>
        <ContextMenu>
          <ContextMenuItem
            glyph="fa-plus"
            label="Add wire"
            onClick={e=>this._addWire()}
          />
          <ContextMenuItem
            glyph="fa-plus"
            label="Add type"
            onClick={e=>this._addType()}
          />
        </ContextMenu>
      </div>

      <div className={styles.subheader}>
        <EditableText object={this._obj} property={'definitionSideName'} default='???'/>
        <span>
          <TypesList obj={this._obj}/>
        </span>
        <EditableText object={this._obj} property={'otherSideName'} default='???'/>
      </div>

      <div className={styles.pins}>
        <Wires wires={this._obj.refsWire} />
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
    this._obj.addWire()
  }

  _addType() {
    this._obj.addType()
  }
}
