import React from 'react'
import {observer} from 'mobx-react'
import styles from './style.less'
import {UiState} from '~/src/business/UiState'
import {Modals} from '~/src/business/Modals'

@observer
export class SelectionInputDialog extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {
    if (this.context.uiState.openedModal!=Modals.CHOICE_MODAL) {
      return null;
    }

    return <div className={styles.main} onClick={e=>this._onCancel(e)}>
      <div className={styles.content}>
        {this.context.uiState.openedModalParams.options.map(o=><div
          onClick={e=>this._onConfirm(e, o)}
          className={styles.option}>{o}</div>)}
      </div>
    </div>
  }

  _onConfirm(e, value) {
    this.context.uiState.closeModal({confirmed: true, value: value})
    e.stopPropagation()
  }

  _onCancel(e) {
    this.context.uiState.closeModal({confirmed: false})
    e.stopPropagation()
  }
}
