import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import classNames from 'classnames'

import {Validate} from '~/src/util/Validate'

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

  state = {}

  componentWillMount() {
    this.prepare(this.state)
  }

  componentWillUpdate(nextProps, nextState) {
    this.prepare(nextState)
  }

  prepare(state) {
    this._obj = this.context.space.get(this.context.uiState.selectedParams.uuid).owner

    Validate.notNull(this._obj)

    this._impl = this._obj.refsImplementation.find(impl=>impl.businessObject.uuid==state.implUuid)

    if (this._impl==null) {
      this._impl = this._obj.refsImplementation[0]
    }

    Validate.notNull(this._impl)
  }

  render() {
    let problems = [];

    [this._obj, ...this._obj.refsInterfaceUsage].forEach(obj=>{
      obj.businessObject.observe()
      problems = problems.concat(obj.businessObject.problems())
    })

    return <div className={styles.main}>
      <div className={styles.header}>
        <EditableText object={this._obj} property={'name'} default='???'/>
        {this._obj.refsImplementation.length>1 && <span>
          {' : '}
          <EditableText object={this._impl} property={'name'} default='???'/>
          {' '}
          <ImageButton
            glyph='fa fa-caret-down'
            onClick={e=>this._selectImplementation()}
            huge />
          <i className=""/>
        </span>}
        {'   '}
        <ContextMenu>
          <ContextMenuItem
            glyph={this._obj.favorite?"fa fa-heart-o":"fa fa-heart"}
            label={this._obj.favorite?"Make plain":"Favoritize"}
            onClick={e=>this._toggleFavorite()}
          />
          <ContextMenuItem
            glyph="fa-plus"
            label="Add implementation"
            onClick={e=>this._addImplementation()}
          />

        {this._obj.refsImplementation.length>=2 && <ContextMenuItem
            glyph="fa-minus"
            label="Delete implementation"
            onClick={e=>this._deleteImplementation()}
          />}

          <ContextMenuItem
            glyph="fa-plus"
            label="Add type"
            onClick={e=>this._addType()}
          />
        </ContextMenu>
      </div>

      <TypesList obj={this._impl}/>

      <ComponentFrame componentDefinition={this._obj} componentImplementation={this._impl} />

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

  _addImplementation() {
    this._obj.addImplementation()
  }

  _deleteImplementation() {
    this._impl.delete()
  }

  _addType() {
    this._impl.addType()
  }

  _selectImplementation() {
    let options = [];

    options = this._obj.refsImplementation.map(impl=>({
      label: impl.name,
      value: {uuid: impl.businessObject.uuid}
    }))

    this.context.uiState.openModal(Modals.CHOICE_MODAL, {options}, e=>{
      if (e.confirmed) {
        this.setState({implUuid: e.value.uuid})
      }
    })
  }
}
