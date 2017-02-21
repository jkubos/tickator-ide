import React from 'react'
import {observer} from 'mobx-react'
import styles from './style.less'
import {UiState} from '~/src/business/UiState'
import {Modals} from '~/src/business/Modals'

import {ImageButton} from '~/src/ui/quark/ImageButton'

@observer
export class TextInputDialog extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {
    if (this.context.uiState.openedModal!=Modals.TEXT_MODAL) {
      return null;
    }

    return <div className={styles.main} onClick={e=>this._onCancel(e)}>
      <div className={styles.content}>
        <ImageButton glyph="fa-times" huge={true} onClick={e=>this._onCancel(e)} />
        &nbsp;&nbsp;
        <input
          ref="input"
          autoFocus
          className={styles.input}
          defaultValue={this.context.uiState.openedModalParams.value}
          onClick={e=>e.stopPropagation()}
          onKeyPress={e=>this._onKeyPress(e)}
          onKeyDown={e=>this._onKeyDown(e)}
          onFocus={e=>this._onFocus(e)}
        />
        &nbsp;&nbsp;
        <ImageButton glyph="fa-check" huge={true} onClick={e=>this._onConfirm(e)} />
      </div>
    </div>
  }

  _onFocus(e) {
    e.target.select()
  }

  _onConfirm(e) {
    this.context.uiState.closeModal({confirmed: true, value: this.refs.input.value})
    e.stopPropagation()
  }

  _onCancel(e) {
    this.context.uiState.closeModal({confirmed: false})
    e.stopPropagation()
  }

  _onKeyPress(e) {
    if(e.key=='Enter') {
      this._onConfirm(e)
    }
  }

  _onKeyDown(e) {
    if (e.key=='Escape') {
      this._onCancel(e)
    }
  }
}
