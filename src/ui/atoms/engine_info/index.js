import React from 'react'
import styles from './style.less'
import UiState from '~/src/business/ui_state'

export default class EngineInfo extends React.Component {
  static contextTypes = {
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {
    const currentTick = this.context.uiState.get('engine', 'currentTick')

    return <div className={styles.main}>
      Current tick: {currentTick}
    </div>
  }

}
