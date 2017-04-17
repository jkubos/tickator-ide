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
import {ContextMenu} from '~/src/ui/quark/ContextMenu'
import {ContextMenuItem} from '~/src/ui/quark/ContextMenuItem'

import {EditableText} from '~/src/ui/atom/EditableText'
import {TypesList} from '~/src/ui/atom/TypesList'

@observer
export class ComponentForm extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired,
    space: React.PropTypes.instanceOf(BusinessSpace).isRequired
  }

  render() {
    let problems = []

    this._obj = this.context.space.get(this.context.uiState.selectedParams.uuid).owner

    return <div className={styles.main}>
      <div className={styles.header}>
        <EditableText object={this._obj} property={'name'} default='???'/>
        {' '}
        <ContextMenu>
          <ContextMenuItem
            glyph={this._obj.favorite?"fa fa-heart-o":"fa fa-heart"}
            label={this._obj.favorite?"Make plain":"Favoritize"}
            onClick={e=>this._toggleFavorite()}
          />
          <ContextMenuItem
            glyph="fa-plus"
            label="Add type"
            onClick={e=>this._addType()}
          />
        </ContextMenu>
      </div>

      <TypesList obj={this._obj}/>

      <ComponentFrame componentDefinition={this._obj} />

      {problems.length>0 && <div className={styles.problems}>
        <h3>Problems:</h3>
        <ul>
          {problems.map((problem, i)=><li key={i}>{problem.problem} [{problem.businessType}:{problem.name}]</li>)}
        </ul>
      </div>}

    </div>
  }

  _toggleFavorite() {
    this._obj.favorite = this._obj.favorite ? false : true
  }

  _addType() {
    this._obj.addType()
  }
}
