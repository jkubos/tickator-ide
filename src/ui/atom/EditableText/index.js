import React from 'react'
import {observer} from 'mobx-react'

import styles from './style.less'

import {UiState} from '~/src/business/UiState'
import {Modals} from '~/src/business/Modals'

@observer
export class EditableText extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  static propTypes = {
    object: React.PropTypes.object.isRequired,
    property: React.PropTypes.string.isRequired,
    default: React.PropTypes.string.isRequired
  }

  static defaultProps = {
    default: ''
  }

  render() {
    const cls = this.props.object[this.props.property+'IsValid'] ? '' : styles.error

    return <span
      className={cls}
      onClick={e=>this._onClick(e)}
    >
      {this.props.object[this.props.property] || this.props.default}
    </span>
  }

  _onClick(e) {
    const value = this.props.object[this.props.property] || ""

    this.context.uiState.openModal(Modals.TEXT_MODAL, {value}, e=>{
      if (e.confirmed) {
        this.props.object[this.props.property] = e.value
      }
    })
  }
}
