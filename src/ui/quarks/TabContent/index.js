import React from 'react'
import {observer} from "mobx-react"
import styles from './style.less'
import {UiState} from '~/src/business/UiState'

@observer
export class TabContent extends React.Component {
  static propTypes = {
    for: React.PropTypes.string.isRequired
  }

  static contextTypes = {
    tabsName: React.PropTypes.string.isRequired,
    defaultTab: React.PropTypes.string.isRequired,
    uiState: React.PropTypes.instanceOf(UiState).isRequired
  }

  render() {
    const selectedTab = this.context.uiState.getSelectedTab(this.context.tabsName, this.context.defaultTab)

    const stateClassName = this.props.for==selectedTab ? "" : styles.hidden

    return <div className={[styles.main, stateClassName].join(" ")}>
      {this.props.children}
    </div>
  }
}
