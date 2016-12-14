import React from 'react'
import styles from './style.less'

export default class TabContent extends React.Component {
  static contextTypes = {
    selectedTab: React.PropTypes.string.isRequired
  }

  render() {
    const stateClassName = this.props.for==this.context.selectedTab ? "" : styles.hidden

    return <div className={[styles.main, stateClassName].join(" ")}>
      {this.props.children}
    </div>
  }
}
