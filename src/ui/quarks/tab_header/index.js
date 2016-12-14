import React from 'react'
import styles from './style.less'
import UiStore from '../../pages/ide/ui_store'

export default class TabHeader extends React.Component {

  static contextTypes = {
    selectedTab: React.PropTypes.string.isRequired,
    uiStore: React.PropTypes.instanceOf(UiStore).isRequired
  }

  render() {
    const stateClassName = this.props.name==this.context.selectedTab ? styles.enabled : styles.disabled

    return <div className={[styles.main, stateClassName].join(' ')} onClick={e=>this.context.uiStore.selectBottomTab(this.props.name)}>
      {this.props.title}
    </div>
  }
}
