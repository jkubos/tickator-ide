import React from 'react'
import {observer} from "mobx-react"
import styles from './style.less'
import {UiState} from '~/src/business/UiState'

@observer
export class TabHeader extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired
  }

  static contextTypes = {
    tabsName: React.PropTypes.string.isRequired,
    defaultTab: React.PropTypes.string.isRequired,
    uiState: React.PropTypes.instanceOf(UiState).isRequired,
    onChange: React.PropTypes.func
  }

  render() {
    const selectedTab = this.context.uiState.getSelectedTab(this.context.tabsName, this.context.defaultTab)

    const stateClassName = this.props.name==selectedTab ? styles.enabled : styles.disabled

    return <div
      className={[styles.main, stateClassName].join(' ')}
      onClick={e=>this.onClick(e)}>
      {this.props.title}
    </div>
  }

  onClick(e) {
    this.context.uiState.setSelectedTab(this.context.tabsName, this.props.name)

    if (this.context.onChange) {
      this.context.onChange(this.props.name)
    }
  }
}
