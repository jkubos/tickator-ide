import React from 'react'
import styles from './style.less'
import CommandsDispatcher from '~/src/business/commands_dispatcher'
import UiState from '~/src/business/ui_state'
import Engine from '~/src/business/engine'

import MainToolbar from '~/src/ui/molecules/main_toolbar'

export default class TickatorIDE extends React.Component {

  render() {
    return <div className={styles.main}>

      <div className={styles.toolBar}>
        <MainToolbar/>
      </div>

      <div className={styles.contentBar}>

        <div className={styles.treeBar}>
        </div>

        <div className={styles.mainContentBar}>
        </div>

      </div>

      <div className={styles.bottomBar}>
      </div>

    </div>
  }

  getChildContext() {
    return {
      uiState: this.props.uiState,
      commandsDispatcher: this.props.commandsDispatcher,
      engine: this.props.engine
    }
  }
}

TickatorIDE.propTypes = {
  uiState: React.PropTypes.instanceOf(UiState).isRequired,
  commandsDispatcher: React.PropTypes.instanceOf(CommandsDispatcher).isRequired,
  engine: React.PropTypes.instanceOf(Engine).isRequired
}

TickatorIDE.childContextTypes = {
  uiState: React.PropTypes.instanceOf(UiState).isRequired,
  commandsDispatcher: React.PropTypes.instanceOf(CommandsDispatcher).isRequired,
  engine: React.PropTypes.instanceOf(Engine).isRequired
}
