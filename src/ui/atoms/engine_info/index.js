import React from 'react'
import {observer} from 'mobx-react'
import styles from './style.less'
import {UiState} from '~/src/business/UiState'

@observer
export class EngineInfo extends React.Component {

  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {
    if (!this.context.uiState.currentContextStore) {
      return <span/>
    }

    const engine = this.context.uiState.currentContextStore.getEngine()

    return <div className={styles.main}>
      Current tick: {engine.currentTick}
    </div>
  }

}
