import React from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import classNames from 'classnames'

import styles from './style.less'

import {UiState} from '~/src/business/UiState'
import {BusinessObject} from '~/src/business/BusinessObject'
import {Modals} from '~/src/business/Modals'

@observer
export class TypesList extends React.Component {

  static propTypes = {
    obj: React.PropTypes.object.isRequired
  }

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {
    let problems = [];

    this.props.obj.refsType.forEach(obj=>{
      obj.businessObject.observe()
      problems = problems.concat(obj.businessObject.problems())
    })

    return <div className={styles.main}>
          {this.props.obj.refsType.map(type=>{
            return <span
              className={classNames(styles.type, {[styles.error]: !type.nameIsValid})}
              key={type.businessObject.uuid}
              onClick={e=>this._openTypeMenu(e, type)}>
              &lt;{type.name}&gt;
            </span>
          })}

    </div>
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
