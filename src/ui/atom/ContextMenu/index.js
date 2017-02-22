import React from 'react'
import {observer} from 'mobx-react'
import styles from './style.less'
import {UiState} from '~/src/business/UiState'
import {Modals} from '~/src/business/Modals'

import {ImageButton} from '~/src/ui/quark/ImageButton'

@observer
export class ContextMenu extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {
    if (this.context.uiState.openedModal!=Modals.CONTEXT_MENU) {
      return null;
    }

    return <div className={styles.main} onClick={e=>this._onCancel(e)}>
      <div className={styles.content}>
        {this.context.uiState.openedModalParams.buttons.map(button=>{
          return <ImageButton
            key={button.command}
            glyph={button.glyph}
            label={button.label}
            huge={true}
            onClick={e=>this._onConfirm(e, button.command)} />
        })}
      </div>
    </div>
  }

  _onConfirm(e, command) {
    this.context.uiState.closeModal({confirmed: true, command: command})
    e.stopPropagation()
  }

  _onCancel(e) {
    this.context.uiState.closeModal({confirmed: false})
    e.stopPropagation()
  }
}
