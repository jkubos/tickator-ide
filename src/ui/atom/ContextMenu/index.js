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

  constructor() {
    super()
    this.state = {subindex: undefined}
  }

  render() {
    if (this.context.uiState.openedModal!=Modals.CONTEXT_MENU) {
      return null;
    }

    let buttons = this.context.uiState.openedModalParams.buttons

    if (this.state.subindex!==undefined) {
      buttons = buttons[this.state.subindex].items
    }

    const renderLabel = this.context.uiState.openedModalParams.renderLabel

    return <div className={styles.main} onClick={e=>this._onCancel(e)}>
      <div className={styles.content}>
        {buttons.map((button, index)=>{
          return <ImageButton
            key={index}
            glyph={button.glyph}
            label={button.label}
            huge={true}
            onClick={e=>this._onConfirm(e, button, index)} />
        })}
      </div>
    </div>
  }

  _onConfirm(e, button, index) {
    if (button.items) {
        this.setState({subindex: index})
    } else {
        this.setState({subindex: undefined})
        this.context.uiState.closeModal({confirmed: true, command: button.command, params: button.params})
    }

    e.stopPropagation()
  }

  _onCancel(e) {
    this.context.uiState.closeModal({confirmed: false})
    e.stopPropagation()
  }
}
