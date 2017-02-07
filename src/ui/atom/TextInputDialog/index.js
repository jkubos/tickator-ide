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

  static propTypes = {
    onApproved: React.PropTypes.func.isRequired
  }

  render() {
    if (this.context.uiState.openedModal!=Modals.TEXT_MODAL) {
      return null;
    }

    return <div className={styles.main} onClick={e=>this.context.uiState.closeModal()}>
      <div className={styles.content}>
        <ImageButton glyph="fa-times" huge={true} onClick={e=>this.context.uiState.closeModal()} />
        &nbsp;&nbsp;
        <input autoFocus className={styles.input} onKeyPress={e=>{if(e.key=='Enter')this.context.uiState.closeModal()}}/>
        &nbsp;&nbsp;
        <ImageButton glyph="fa-check" huge={true} onClick={e=>this.context.uiState.closeModal()} />
      </div>
    </div>
  }


}
